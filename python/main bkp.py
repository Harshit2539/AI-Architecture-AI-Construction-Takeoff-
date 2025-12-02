# scale extraction
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import fitz
import tempfile
import os
import re
from pdf2image import convert_from_path
import easyocr
import numpy as np
from PIL import Image
import traceback
import cv2
import pandas as pd
from datetime import datetime
from typing import Optional
from ultralytics import YOLO

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client["construction"]

try:
    from ultralytics import YOLO
    YOLO_AVAILABLE = True
except Exception:
    YOLO_AVAILABLE = False

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "yolov8s-seg.pt")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"❌ YOLO model weights not found at {MODEL_PATH}. "
        f"Please place yolov8s-seg.pt in the same folder as main.py"
    )

print(f"🔍 Loading YOLO model from: {MODEL_PATH}")
model = YOLO(MODEL_PATH)
print("✅ YOLO model successfully loaded.")

app = FastAPI(title="AI Measurement + BOQ Integration API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reader = easyocr.Reader(["en"], gpu=False)

@app.post("/upload-master-boq/")
async def upload_master_boq(file: UploadFile = File(...)):
    try:
        df = pd.read_excel(file.file)
        records = df.to_dict(orient="records")

        for r in records:
            r["uploaded_at"] = datetime.utcnow()
            r["version"] = "Q1_2025"

        db.boq_master.insert_many(records)
        return {"status": "success", "inserted": len(records)}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/upload-project-boq/")
async def upload_project_boq(
    file: UploadFile = File(...),
    project_id: str = Form(...),
):
    try:
        df = pd.read_excel(file.file)
        records = df.to_dict(orient="records")

        for r in records:
            r["project_id"] = project_id
            r["uploaded_at"] = datetime.utcnow()

        db.project_boqs.insert_many(records)
        return {"status": "success", "project_id": project_id, "inserted": len(records)}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/extract-scale/")
async def extract_scale(file: UploadFile = File(...)):
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        text = ""
        scale = None

        with fitz.open(tmp_path) as doc:
            for page in doc:
                text += page.get_text("text")

        match = re.search(r"(?:scale\s*[@:]?\s*|@?\s*[A-Z0-9]+\s*)?(\d+\s*[:/]\s*\d+)", text, re.IGNORECASE)
        if match:
            scale = match.group(1).replace(" ", "")

        if not scale:
            pages = convert_from_path(tmp_path, first_page=1, last_page=3)
            for page_img in pages:
                w, h = page_img.size
                page_img = page_img.resize((w // 2, h // 2), Image.Resampling.LANCZOS)
                ocr_result = reader.readtext(np.array(page_img))
                for _, text_detected, _ in ocr_result:
                    match = re.search(r"(?:scale\s*[@:]?\s*|@?\s*[A-Z0-9]+\s*)?(\d+\s*[:/]\s*\d+)", text_detected, re.IGNORECASE)
                    if match:
                        scale = match.group(1).replace(" ", "")
                        break
                if scale:
                    break

        if scale:
            scale = scale.replace("4:", "1:").replace("I:", "1:").replace("O:", "0:")

        return {"status": "success", "scale": scale} if scale else {"status": "not_found"}
    except Exception as e:
        return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)

def parse_scale_factor(scale_str: Optional[str]) -> float:
    if not scale_str:
        return 1.0
    try:
        left, right = scale_str.replace(" ", "").split(":")
        d = float(left)
        r = float(right)
        return r / d if d != 0 else 1.0
    except Exception:
        return 1.0

@app.post("/ml-analyze-areas/")
async def ml_analyze_areas(
    file: UploadFile = File(...),
    scale: str = Form("1:100"),
    dpi: int = Form(300),
    max_pages: int = Form(5),
    conf: float = Form(0.15),
    project_id: str = Form("TEMP_PROJECT"),
):
    tmp_path = None
    try:
        if not YOLO_AVAILABLE:
            return {"status": "error", "message": "Ultralytics YOLO not installed."}

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        pages = convert_from_path(tmp_path, dpi=dpi)
        scale_factor = parse_scale_factor(scale)
        response_pages = []
        os.makedirs("debug_outputs", exist_ok=True)

        COLORS = {
            0: (255, 0, 0),  # Walls
            1: (0, 255, 0),  # Openings
            2: (0, 0, 255),  # Furniture
            3: (255, 255, 0),  # Structure
            4: (255, 0, 255),  # Text
        }

        for pi, pil_img in enumerate(pages[:max_pages]):
            img_np = np.array(pil_img.convert("RGB"))
            img_np = cv2.convertScaleAbs(img_np, alpha=1.6, beta=25)
            h, w = img_np.shape[:2]

            results = model.predict(source=img_np, conf=conf, verbose=False, save=False)
            result = results[0]
            masks = getattr(result.masks, "data", None)
            classes = getattr(result, "boxes", None)

            page_regions = []
            overlay = img_np.copy()

            if masks is not None:
                for i, raw_mask in enumerate(masks):
                    mask_np = raw_mask.cpu().numpy() if hasattr(raw_mask, "cpu") else np.array(raw_mask)
                    bin_mask = (mask_np > 0.5).astype(np.uint8) * 255

                    contours, _ = cv2.findContours(bin_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                    class_id = int(classes.cls[i]) if classes is not None and hasattr(classes, "cls") else 0
                    color = COLORS.get(class_id, (128, 128, 128))

                    for cnt in contours:
                        area_px = cv2.contourArea(cnt)
                        if area_px < 100:
                            continue
                        inch_area = float(area_px) / (dpi * dpi)
                        real_area = inch_area * (scale_factor**2)

                        page_regions.append({
                            "pixel_area": float(area_px),
                            "real_area": float(real_area),
                            "class_id": class_id,
                            "page": pi + 1,
                        })
                        cv2.drawContours(overlay, [cnt], -1, color, 2)

            debug_path = f"debug_outputs/page_{pi+1}_overlay.jpg"
            cv2.imwrite(debug_path, overlay)
            response_pages.append({"page": pi + 1, "regions": page_regions})

        takeoff_doc = {
            "project_id": project_id,
            "analyzed_at": datetime.utcnow(),
            "scale": scale,
            "dpi": dpi,
            "pages": response_pages,
        }
        db.takeoff_results.insert_one(takeoff_doc)

        return {"status": "success", "stored_in_db": True, "project_id": project_id, "pages": len(response_pages)}
    except Exception as e:
        return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

# # BoQ storage

# from fastapi import FastAPI, File, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# import pandas as pd
# import os
# import tempfile
# import traceback
# import fitz
# import re
# from pdf2image import convert_from_path
# import easyocr
# import numpy as np
# from PIL import Image
# from datetime import datetime
# from typing import Optional

# try:
#     from ultralytics import YOLO
#     YOLO_AVAILABLE = True
# except Exception:
#     YOLO_AVAILABLE = False

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(BASE_DIR, "yolov8s-seg.pt")

# MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
# client = MongoClient(MONGO_URI)
# db = client["construction"]

# # Collections:
# # - db.boq_master
# # - db.project_boqs
# # - db.takeoff_results


# model = None
# if YOLO_AVAILABLE:
#     if os.path.exists(MODEL_PATH):
#         try:
#             model = YOLO(MODEL_PATH)
#             print("✅ YOLO model loaded.")
#         except Exception as e:
#             print("⚠️ Failed to load YOLO model:", e)
#             model = None
#     else:
#         print(f"⚠️ YOLO weights not found at {MODEL_PATH}. ml-analyze will error if used.")
#         model = None

# app = FastAPI(title="BOQ + Takeoff Integration API")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# try:
#     reader = easyocr.Reader(["en"], gpu=False)
# except Exception as e:
#     print("⚠️ easyocr initialization failed:", e)
#     reader = None


# def safe_val(v):
#     if v is None:
#         return None
#     try:
#         if isinstance(v, float) and pd.isna(v):
#             return None
#     except Exception:
#         pass
#     if isinstance(v, str) and v.strip() == "":
#         return None
#     return v

# def parse_scale_factor(scale_str: Optional[str]) -> float:
#     if not scale_str:
#         return 1.0
#     try:
#         left, right = scale_str.replace(" ", "").split(":")
#         d = float(left)
#         r = float(right)
#         return r / d if d != 0 else 1.0
#     except Exception:
#         return 1.0

# @app.post("/upload/master-boq/")
# async def upload_master_boq(file: UploadFile = File(...)):
#     tmp_path = None
#     try:
#         # Save temp Excel file
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
#             tmp.write(await file.read())
#             tmp_path = tmp.name

#         xls = pd.read_excel(tmp_path, sheet_name=None, engine="openpyxl")

#         master_docs = []
#         for sheet_name, df in xls.items():
#             if not sheet_name.lower().startswith("class"):
#                 continue

#             df.columns = [str(c).strip() for c in df.columns]
#             df = df.fillna("")

#             # Pull class details
#             class_ref = None
#             class_description = None
#             for i in range(min(3, len(df))):
#                 for col in df.columns:
#                     cell = str(df.at[i, col]).strip().lower()
#                     if "class" in cell and "ref" in cell:
#                         class_ref = str(df.at[i + 1, col]).strip() if i + 1 < len(df) else None
#                     if "class" in cell and "des" in cell:
#                         class_description = str(df.at[i + 1, col]).strip() if i + 1 < len(df) else None

#             # Identify divisions
#             divisions = []
#             current_div_ref, current_div_desc = None, None
#             current_subs = []

#             for _, row in df.iterrows():
#                 div_ref = str(row.get("2DIV_Ref") or row.get("Unnamed: 4") or "").strip()
#                 div_desc = str(row.get("2DIV_Des") or row.get("Unnamed: 5") or "").strip()
#                 sub_ref = str(row.get("3DIV_Ref") or row.get("Unnamed: 7") or "").strip()
#                 sub_desc = str(row.get("3DIV_Des") or row.get("Unnamed: 8") or "").strip()

#                 # New division
#                 if div_desc:
#                     if current_div_desc:
#                         divisions.append({
#                             "div_ref": current_div_ref,
#                             "div_description": current_div_desc,
#                             "subdivisions": current_subs
#                         })
#                     current_div_ref = div_ref or None
#                     current_div_desc = div_desc
#                     current_subs = []

#                 # Subdivision
#                 if sub_desc:
#                     current_subs.append({
#                         "sub_ref": sub_ref or None,
#                         "sub_description": sub_desc
#                     })

#             if current_div_desc:
#                 divisions.append({
#                     "div_ref": current_div_ref,
#                     "div_description": current_div_desc,
#                     "subdivisions": current_subs
#                 })

#             if class_ref and divisions:
#                 master_docs.append({
#                     "class_ref": class_ref,
#                     "class_description": class_description,
#                     "divisions": divisions,
#                     "uploaded_at": datetime.utcnow()
#                 })

#         if not master_docs:
#             return {"status": "error", "message": "No valid class/division data found in workbook"}

#         db.boq_master.delete_many({})
#         db.boq_master.insert_many(master_docs)

#         return {"status": "success", "inserted_classes": len(master_docs)}

#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
#     finally:
#         if tmp_path and os.path.exists(tmp_path):
#             os.remove(tmp_path)

# @app.post("/upload/project-boq/")
# async def upload_project_boq(file: UploadFile = File(...), project_id: str = Form(...), uploaded_by: str = Form(None)):
#     tmp_path = None
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1] or ".xlsx") as tmp:
#             tmp.write(await file.read())
#             tmp_path = tmp.name
#         ext = os.path.splitext(tmp_path)[1].lower()
#         if ext in [".xls", ".xlsx"]:
#             df = pd.read_excel(tmp_path, engine="openpyxl")
#         else:
#             df = pd.read_csv(tmp_path)

#         records = []
#         for _, row in df.iterrows():
#             item = {
#                 "project_id": project_id,
#                 "uploaded_by": uploaded_by,
#                 "item_description": safe_val(row.get("Item_Description") or row.get("Description") or row.get("Item Description")),
#                 "unit": safe_val(row.get("Unit")),
#                 "quantity": float(row.get("Quantity")) if safe_val(row.get("Quantity")) is not None else 0.0,
#                 "rate": float(row.get("Rate")) if safe_val(row.get("Rate")) is not None else 0.0,
#                 "amount": float(row.get("Amount")) if safe_val(row.get("Amount")) is not None else None,
#                 "mapped_class": None,
#                 "uploaded_at": datetime.utcnow()
#             }
#             if item["amount"] is None:
#                 item["amount"] = item["quantity"] * item["rate"]
#             records.append(item)

#         if records:
#             db.project_boqs.insert_many(records)

#         return {"status": "success", "project_id": project_id, "inserted": len(records)}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
#     finally:
#         if tmp_path and os.path.exists(tmp_path):
#             os.remove(tmp_path)

# @app.post("/upload/takeoff/")
# async def upload_takeoff(file: UploadFile = File(...), project_id: str = Form(...), analyzed_by: str = Form("system")):
#     tmp_path = None
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1] or ".xlsx") as tmp:
#             tmp.write(await file.read())
#             tmp_path = tmp.name

#         ext = os.path.splitext(tmp_path)[1].lower()
#         if ext in [".xls", ".xlsx"]:
#             df = pd.read_excel(tmp_path, engine="openpyxl")
#         else:
#             df = pd.read_csv(tmp_path)

#         results = []
#         for _, row in df.iterrows():
#             results.append({
#                 "object_type": safe_val(row.get("Object_Type") or row.get("object") or row.get("type")),
#                 "measured_qty": float(row.get("Measured_Qty") or row.get("Measured_Qty") or 0.0),
#                 "unit": safe_val(row.get("Unit")),
#                 "matched_boq_class": safe_val(row.get("Matched_Class")),
#             })

#         doc = {
#             "project_id": project_id,
#             "analyzed_by": analyzed_by,
#             "results": results,
#             "analyzed_at": datetime.utcnow()
#         }
#         db.takeoff_results.insert_one(doc)
#         return {"status": "success", "stored": len(results)}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
#     finally:
#         if tmp_path and os.path.exists(tmp_path):
#             os.remove(tmp_path)

# @app.get("/fusion/{project_id}")
# def fusion(project_id: str):
#     try:
#         master = list(db.boq_master.find({}))
#         project_items = list(db.project_boqs.find({"project_id": project_id}))
#         takeoff = db.takeoff_results.find_one({"project_id": project_id})

#         if not project_items:
#             return {"error": "No project BOQ found for project_id", "project_id": project_id}

#         fused = []
#         for item in project_items:
#             matched = None
#             if item.get("mapped_class"):
#                 mapped_class_ref = item["mapped_class"].get("class_ref")
#             else:
#                 mapped_class_ref = None
#                 desc = (item.get("item_description") or "").lower() if item.get("item_description") else ""
#                 for m in master:
#                     cr = (m.get("class_ref") or "").lower()
#                     if cr and cr in desc:
#                         mapped_class_ref = m.get("class_ref")
#                         break

#             measured_qty = None
#             if takeoff and takeoff.get("results"):
#                 if mapped_class_ref:
#                     measured = next((r for r in takeoff["results"] if r.get("matched_boq_class") == mapped_class_ref), None)
#                     if measured:
#                         measured_qty = measured.get("measured_qty")
#                 if measured_qty is None:
#                     desc = (item.get("item_description") or "").lower()
#                     measured = next((r for r in takeoff["results"] if r.get("object_type") and r.get("object_type").lower() in desc), None)
#                     if measured:
#                         measured_qty = measured.get("measured_qty")

#             boq_qty = item.get("quantity", 0)
#             rate = item.get("rate", 0)
#             measured_qty_val = measured_qty if measured_qty is not None else boq_qty
#             variance_pct = None
#             if boq_qty and isinstance(boq_qty, (int, float)) and boq_qty != 0:
#                 variance_pct = ((measured_qty_val - boq_qty) / boq_qty) * 100

#             fused.append({
#                 "project_item_id": str(item.get("_id")),
#                 "item_description": item.get("item_description"),
#                 "unit": item.get("unit"),
#                 "boq_qty": boq_qty,
#                 "measured_qty": measured_qty_val,
#                 "variance_pct": round(variance_pct, 2) if variance_pct is not None else None,
#                 "rate": rate,
#                 "calculated_cost": rate * measured_qty_val if rate is not None else None,
#                 "mapped_class": mapped_class_ref
#             })

#         return {"status": "success", "project_id": project_id, "fusion_results": fused}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}

# @app.post("/extract-scale-pdf/")
# async def extract_scale_pdf(file: UploadFile = File(...)):
#     tmp_path = None
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#             tmp.write(await file.read())
#             tmp_path = tmp.name

#         text = ""
#         scale = None
#         with fitz.open(tmp_path) as doc:
#             for page in doc:
#                 text += page.get_text("text")

#         match = re.search(r"(?:scale\s*[@:]?\s*|@?\s*[A-Z0-9]+\s*)?(\d+\s*[:/]\s*\d+)", text, re.IGNORECASE)
#         if match:
#             scale = match.group(1).replace(" ", "")

#         if not scale and reader is not None:
#             pages = convert_from_path(tmp_path, first_page=1, last_page=3)
#             for page_img in pages:
#                 w, h = page_img.size
#                 page_img = page_img.resize((w // 2, h // 2), Image.Resampling.LANCZOS)
#                 ocr_result = reader.readtext(np.array(page_img))
#                 for _, txt, _ in ocr_result:
#                     match = re.search(r"(?:scale\s*[@:]?\s*|@?\s*[A-Z0-9]+\s*)?(\d+\s*[:/]\s*\d+)", txt, re.IGNORECASE)
#                     if match:
#                         scale = match.group(1).replace(" ", "")
#                         break
#                 if scale:
#                     break

#         if scale:
#             scale = scale.replace("4:", "1:").replace("I:", "1:").replace("O:", "0:")
#             return {"status": "success", "scale": scale}
#         else:
#             return {"status": "not_found", "message": "Scale not found"}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
#     finally:
#         if tmp_path and os.path.exists(tmp_path):
#             os.remove(tmp_path)

# @app.post("/ml-analyze-areas/")
# async def ml_analyze_areas(
#     file: UploadFile = File(...),
#     scale: str = Form("1:100"),
#     dpi: int = Form(300),
#     max_pages: int = Form(5),
#     conf: float = Form(0.15),
#     project_id: str = Form("TEMP_PROJECT"),
# ):
#     if model is None:
#         return {"status": "error", "message": "YOLO model not available on server."}

#     tmp_path = None
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#             tmp.write(await file.read())
#             tmp_path = tmp.name

#         pages = convert_from_path(tmp_path, dpi=dpi)
#         scale_factor = parse_scale_factor(scale)
#         response_pages = []

#         for pi, pil_img in enumerate(pages[:max_pages]):
#             img_np = np.array(pil_img.convert("RGB"))
#             results = model.predict(source=img_np, conf=conf, verbose=False, save=False)
#             result = results[0]
#             masks = getattr(result.masks, "data", None)
#             boxes = getattr(result, "boxes", None)

#             page_regions = []
#             if masks is not None:
#                 for i, raw_mask in enumerate(masks):
#                     mask_np = raw_mask.cpu().numpy() if hasattr(raw_mask, "cpu") else np.array(raw_mask)
#                     bin_mask = (mask_np > 0.5).astype(np.uint8) * 255
#                     px_area = int((mask_np > 0.5).sum())
#                     inch_area = float(px_area) / (dpi * dpi)
#                     real_area = inch_area * (scale_factor ** 2)
#                     class_id = int(boxes.cls[i]) if boxes is not None and hasattr(boxes, "cls") else 0

#                     page_regions.append({
#                         "pixel_area": px_area,
#                         "real_area": float(real_area),
#                         "class_id": class_id
#                     })

#             response_pages.append({"page": pi + 1, "regions": page_regions})

#         takeoff_doc = {
#             "project_id": project_id,
#             "analyzed_at": datetime.utcnow(),
#             "scale": scale,
#             "dpi": dpi,
#             "pages": response_pages
#         }
#         db.takeoff_results.insert_one(takeoff_doc)

#         return {"status": "success", "project_id": project_id, "pages_analyzed": len(response_pages)}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
#     finally:
#         if tmp_path and os.path.exists(tmp_path):
#             os.remove(tmp_path)

# @app.get("/uploads")
# def list_uploads():
#     try:
#         masters = list(db.boq_master.find({}, {"class_ref": 1, "class_description": 1, "uploaded_at": 1}))
#         projects = list(db.project_boqs.find({}, {"project_id": 1, "item_description": 1, "uploaded_at": 1}))
#         out = []
#         if masters:
#             out.append({"type": "master", "filename": "Master BOQ", "uploaded_at": masters[0].get("uploaded_at")})
#         for p in projects:
#             out.append({"type": "project", "filename": p.get("project_id"), "uploaded_at": p.get("uploaded_at")})
#         return out
#     except Exception as e:
#         return {"status": "error", "message": str(e)}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)










# # analysis data from model
# from fastapi import FastAPI, File, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# from datetime import datetime
# from pdf2image import convert_from_path
# from ultralytics import YOLO
# from PIL import Image
# import numpy as np
# import cv2
# from pdf2image import convert_from_path
# import tempfile, os, traceback, re, fitz, pandas as pd

# # === Configuration ===
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(BASE_DIR, "best.pt")  # Trained model
# MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
# client = MongoClient(MONGO_URI)
# db = client["construction"]

# # === Initialize Model ===
# try:
#     model = YOLO(MODEL_PATH)
#     print(f"✅ Loaded trained YOLO model from {MODEL_PATH}")
# except Exception as e:
#     print(f"❌ Failed to load YOLO model: {e}")
#     model = None

# # === Initialize FastAPI ===
# app = FastAPI(title="Floorplan Analyzer API")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # === Utilities ===
# def parse_scale_factor(scale_str: str) -> float:
#     try:
#         if not scale_str: return 1.0
#         left, right = scale_str.replace(" ", "").split(":")
#         return float(right) / float(left)
#     except Exception:
#         return 1.0

# # === Routes ===
# @app.post("/ml-room-click/")
# async def ml_room_click(
#     pdf_url: str = Form(...),
#     page: int = Form(...),
#     x: float = Form(...),
#     y: float = Form(...),
#     scale: str = Form("1:100"),
#     dpi: int = Form(300),
# ):
#     try:
#         import requests, tempfile

#         # Download the PDF
#         r = requests.get(pdf_url)
#         tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
#         tmp.write(r.content)
#         tmp.close()

#         # Convert specific page
#         pages = convert_from_path(tmp.name, dpi=dpi)
#         pil_img = pages[page - 1]

#         img = np.array(pil_img)
#         h, w = img.shape[:2]

#         # Normalize click coords
#         nx = x / w
#         ny = 1 - (y / h)  # PDF origin bottom-left

#         # Run YOLO segmentation
#         results = model(img, conf=0.25, task="segment")

#         chosen_poly = None
        
#         for r in results:
#             masks = r.masks.xy  # list of polygons
#             for poly in masks:
#                 poly_np = np.array(poly)
#                 # Convert poly to normalized
#                 n_poly = np.column_stack([poly_np[:,0]/w, 1 - (poly_np[:,1]/h)])

#                 # Point-in-polygon test
#                 if cv2.pointPolygonTest(poly_np.astype(np.float32),
#                                         (x, y), False) >= 0:
#                     chosen_poly = n_poly.tolist()
#                     break
#             if chosen_poly: break

#         if not chosen_poly:
#             return {"status": "error", "message": "No room found at clicked point"}

#         # Area in pixel units
#         pts = np.array(chosen_poly)
#         xs = pts[:,0] * w
#         ys = (1 - pts[:,1]) * h
#         pixel_area = cv2.contourArea(np.column_stack([xs, ys]).astype(np.float32))

#         # convert using scale
#         factor = parse_scale_factor(scale)
#         real_area = pixel_area * (factor ** 2)

#         return {
#             "status": "success",
#             "polygon": chosen_poly,
#             "real_area": real_area,
#             "page_width": w,
#             "page_height": h,
#         }

#     except Exception as e:
#         return {
#             "status": "error",
#             "message": str(e),
#             "trace": traceback.format_exc()
#         }


# @app.post("/ml-analyze-areas/")
# async def ml_analyze_areas(file: UploadFile = File(...), scale: str = Form("1:100"), dpi: int = Form(300)):
#     if model is None:
#         return {"status": "error", "message": "YOLO model not loaded."}

#     tmp_path = None
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#             tmp.write(await file.read())
#             tmp_path = tmp.name

#         # Convert first page of PDF to image
#         pages = convert_from_path(tmp_path, dpi=dpi)
#         output_dir = os.path.join(BASE_DIR, "output_annotated")
#         os.makedirs(output_dir, exist_ok=True)

#         response_pages = []
#         for pi, pil_img in enumerate(pages[:1]):  # just first page
#             img_np = np.array(pil_img.convert("RGB"))
#             img_h, img_w = img_np.shape[:2]
#             results = model.predict(source=img_np, conf=0.25, verbose=False)
#             result = results[0]

#             annotated_img = img_np.copy()
#             page_regions = []

#             if hasattr(result, "masks") and result.masks:
#                 for i, mask in enumerate(result.masks.data):
#                     cls_id = int(result.boxes.cls[i]) if hasattr(result.boxes, "cls") else 0
#                     cls_name = model.names.get(cls_id, f"class_{cls_id}")

#                     # Get the contour from mask
#                     mask_np = (mask.cpu().numpy() > 0.5).astype(np.uint8)
#                     contours, _ = cv2.findContours(mask_np, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#                     for contour in contours:
#                         # Scale contour if YOLO output resolution ≠ actual image resolution
#                         scale_x = img_w / result.orig_shape[1]
#                         scale_y = img_h / result.orig_shape[0]
#                         contour = np.int32(contour * [scale_x, scale_y])

#                         # Draw filled mask overlay
#                         color = (0, 255, 255)
#                         cv2.drawContours(annotated_img, [contour], -1, color, 2)

#                         # Compute area (for reference)
#                         px_area = cv2.contourArea(contour)
#                         page_regions.append({
#                             "class_id": cls_id,
#                             "class_name": cls_name,
#                             "pixel_area": int(px_area),
#                             "real_area": float(px_area / (dpi * dpi))*1000,
#                         })

#             annotated_path = os.path.join(output_dir, f"page_{pi+1}_annotated.jpg")
#             cv2.imwrite(annotated_path, annotated_img)

#             response_pages.append({
#                 "page": pi + 1,
#                 "img_w": img_w,
#                 "img_h": img_h,
#                 "regions": page_regions,
#                 "annotated_path": annotated_path,
#             })

#         return {
#             "status": "success",
#             "project_id": "TEMP_PROJECT",
#             "scale": scale,
#             "dpi": dpi,
#             "pages": response_pages
#         }

#     except Exception as e:
#         import traceback
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
#     finally:
#         if tmp_path and os.path.exists(tmp_path):
#             os.remove(tmp_path)


# @app.get("/")
# def root():
#     return {"status": "running", "model_loaded": model is not None}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
