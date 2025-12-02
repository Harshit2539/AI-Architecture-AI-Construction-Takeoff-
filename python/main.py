# # main.py
# import os, re, json, tempfile, traceback, hashlib, logging
# from datetime import datetime

# import fitz
# import numpy as np
# import cv2
# from PIL import Image
# from pdf2image import convert_from_path
# from shapely.geometry import Polygon, Point
# from ultralytics import YOLO

# from fastapi import FastAPI, File, UploadFile, Form, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO)

# app = FastAPI(title="Floorplan Analyzer API")

# # CORS - allow local dev
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
# CACHE_DIR = os.path.join(BASE_DIR, "ml_cache")
# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs(CACHE_DIR, exist_ok=True)

# MODEL_PATH = os.path.join(BASE_DIR, "best.pt")  # update if needed

# # load YOLO model (silent fallback)
# try:
#     model = YOLO(MODEL_PATH)
#     logger.info(f"✅ YOLO model loaded: {MODEL_PATH}")
# except Exception as e:
#     model = None
#     logger.warning(f"❌ Could not load YOLO model: {e}")

# PROJECT_ID = "TEMP_PROJECT"

# def _safe_pdf_name(name: str) -> str:
#     base = os.path.basename(name)
#     if not base:
#         base = hashlib.md5(name.encode()).hexdigest() + ".pdf"
#     return re.sub(r"[^0-9a-zA-Z_.-]", "_", base)

# def _cache_path(pdf_name: str, page_num: int) -> str:
#     safe = _safe_pdf_name(pdf_name)
#     return os.path.join(CACHE_DIR, f"{safe}_page{page_num}.json")

# class ClickData(BaseModel):
#     x: float
#     y: float
#     pageNum: int
#     pdfPath: str

# # ---------------------------
# # Upload PDF (stores file)
# # ---------------------------
# @app.post("/upload-pdf/")
# async def upload_pdf(file: UploadFile = File(...)):
#     try:
#         safe = _safe_pdf_name(file.filename)
#         dest = os.path.join(UPLOAD_DIR, safe)
#         with open(dest, "wb") as f:
#             f.write(await file.read())
#         return {"status": "success", "pdf": safe}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}

# # ---------------------------
# # ML analyze (explicit call)
# # Accepts multipart/form-data with 'file' (pdf), scale(optional), dpi(optional)
# # ---------------------------
# @app.post("/ml-analyze-areas/")
# async def ml_analyze_areas(file: UploadFile = File(...), scale: str = Form("1:100"), dpi: int = Form(300)):
#     if model is None:
#         return {"status": "error", "message": "YOLO model not loaded on server."}

#     tmp_path = None
#     try:
#         # Save uploaded PDF to temp
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#             tmp.write(await file.read())
#             tmp_path = tmp.name

#         pdf_doc = fitz.open(tmp_path)
#         pages = convert_from_path(tmp_path, dpi=dpi)

#         response_pages = []
#         pdf_filename = _safe_pdf_name(file.filename)

#         for pi, pil_img in enumerate(pages):
#             page_num = pi + 1
#             img_np = np.array(pil_img.convert("RGB"))
#             img_h, img_w = img_np.shape[:2]

#             page = pdf_doc[pi]
#             page_pdf_w = page.rect.width
#             page_pdf_h = page.rect.height

#             # run model on image
#             results = model.predict(source=img_np, conf=0.25, verbose=False)
#             result = results[0]

#             page_regions = []
#             annotated_img = img_np.copy()

#             if hasattr(result, "masks") and result.masks:
#                 orig_h, orig_w = result.orig_shape
#                 scale_x = img_w / orig_w
#                 scale_y = img_h / orig_h

#                 for mask in result.masks.data:
#                     mask_np = (mask.cpu().numpy() > 0.5).astype(np.uint8) * 255
#                     contours, _ = cv2.findContours(mask_np, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#                     for c in contours:
#                         c = np.squeeze(c)
#                         if c.ndim != 2 or c.shape[0] < 3:
#                             continue

#                         # scale to image rendered size
#                         c = c.astype(float)
#                         c[:, 0] *= scale_x
#                         c[:, 1] *= scale_y

#                         # approx polygon
#                         epsilon = 1.5
#                         approx = cv2.approxPolyDP(c.astype(np.float32), epsilon, True)
#                         approx = np.squeeze(approx) if approx is not None and len(approx) >= 3 else c

#                         pts_int = np.int32(approx)
#                         cv2.drawContours(annotated_img, [pts_int], -1, (0,255,255), 2)

#                         px_area = cv2.contourArea(pts_int)

#                         # normalized coords (nx, ny) with ny=0 at top
#                         norm = approx.copy()
#                         norm[:,0] /= float(img_w)
#                         norm[:,1] /= float(img_h)
#                         centroid = norm.mean(axis=0).tolist()

#                         page_regions.append({
#                             "polygon": norm.tolist(),
#                             "pixel_area": int(px_area),
#                             # bare conversion; you can replace with scale->m² later
#                             "real_area": float(px_area / (dpi * dpi)),
#                             "centroid": centroid
#                         })

#             # write cache per page
#             cache = {
#                 "page": page_num,
#                 "img_w": img_w,
#                 "img_h": img_h,
#                 "page_pdf_w": page_pdf_w,
#                 "page_pdf_h": page_pdf_h,
#                 "dpi": dpi,
#                 "regions": page_regions
#             }
#             with open(_cache_path(pdf_filename, page_num), "w", encoding="utf-8") as fh:
#                 json.dump(cache, fh, ensure_ascii=False, indent=2)

#             response_pages.append({
#                 "page": page_num,
#                 "img_w": img_w,
#                 "img_h": img_h,
#                 "regions": page_regions
#             })

#         pdf_doc.close()
#         return {"status": "success", "project_id": PROJECT_ID, "scale": scale, "dpi": dpi, "pages": response_pages}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}
#     finally:
#         try:
#             if tmp_path and os.path.exists(tmp_path):
#                 os.remove(tmp_path)
#         except:
#             pass

# # ---------------------------
# # Helper: run ML on an uploaded file (used when missing)
# # ---------------------------
# def run_ml_for_uploaded(safe_filename: str, dpi:int=300):
#     """
#     Run ML on file stored in uploads/ and save caches.
#     This is synchronous and used as fallback if client didn't call ml-analyze-areas explicitly.
#     """
#     full_path = os.path.join(UPLOAD_DIR, safe_filename)
#     if not os.path.exists(full_path):
#         logger.error("File not found for ML run: %s", full_path)
#         return False

#     try:
#         pdf_doc = fitz.open(full_path)
#         pages = convert_from_path(full_path, dpi=dpi)

#         for pi, pil_img in enumerate(pages):
#             page_num = pi + 1
#             img_np = np.array(pil_img.convert("RGB"))
#             img_h, img_w = img_np.shape[:2]
#             page = pdf_doc[pi]
#             page_pdf_w = page.rect.width
#             page_pdf_h = page.rect.height

#             # run YOLO if available
#             if model is None:
#                 regions = []
#             else:
#                 yres = model.predict(source=img_np, conf=0.25, verbose=False)[0]
#                 regions = []
#                 if hasattr(yres, "masks") and yres.masks:
#                     orig_h, orig_w = yres.orig_shape
#                     sx = img_w / orig_w
#                     sy = img_h / orig_h
#                     for mask in yres.masks.data:
#                         mask_np = (mask.cpu().numpy() > 0.5).astype(np.uint8) * 255
#                         cnts, _ = cv2.findContours(mask_np, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#                         for c in cnts:
#                             c = np.squeeze(c)
#                             if c.ndim != 2 or len(c) < 3:
#                                 continue
#                             c = c.astype(float)
#                             c[:,0] *= sx
#                             c[:,1] *= sy
#                             approx = cv2.approxPolyDP(c.astype(np.float32), 1.5, True)
#                             approx = np.squeeze(approx) if approx is not None and len(approx)>=3 else c
#                             px_area = cv2.contourArea(np.int32(approx))
#                             norm = approx.copy()
#                             norm[:,0] /= float(img_w)
#                             norm[:,1] /= float(img_h)
#                             centroid = norm.mean(axis=0).tolist()
#                             regions.append({
#                                 "polygon": norm.tolist(),
#                                 "pixel_area": int(px_area),
#                                 "real_area": float(px_area/(dpi*dpi)),
#                                 "centroid": centroid
#                             })
#             cache = {
#                 "page": page_num,
#                 "img_w": img_w,
#                 "img_h": img_h,
#                 "page_pdf_w": page_pdf_w,
#                 "page_pdf_h": page_pdf_h,
#                 "dpi": dpi,
#                 "regions": regions
#             }
#             with open(_cache_path(safe_filename, page_num), "w", encoding="utf-8") as fh:
#                 json.dump(cache, fh, indent=2)

#         pdf_doc.close()
#         return True
#     except Exception as e:
#         logger.exception("run_ml_for_uploaded failed: %s", e)
#         return False

# # ---------------------------
# # match-click: frontend sends PDF coords (points). We convert to normalized and lookup regions.
# # ---------------------------
# @app.post("/match-click/")
# def match_click(data: ClickData):
#     try:
#         safe = _safe_pdf_name(data.pdfPath)
#         cache_file = _cache_path(safe, data.pageNum)
#         if not os.path.exists(cache_file):
#             # try auto-run if file exists in uploads
#             if run_ml_for_uploaded(safe):
#                 logger.info("Auto ML run produced cache for %s", safe)
#             else:
#                 return {"status": "error", "message": "No ML cache found. Run /ml-analyze-areas or upload first."}

#         with open(cache_file, "r", encoding="utf-8") as fh:
#             cached = json.load(fh)

#         # page_pdf_w/h are PDF points (fitz)
#         page_pdf_w = float(cached.get("page_pdf_w", 1.0))
#         page_pdf_h = float(cached.get("page_pdf_h", 1.0))

#         # convert PDF points -> normalized coordinates (nx, ny) ny=0 top
#         nx = float(data.x) / page_pdf_w
#         ny = 1.0 - (float(data.y) / page_pdf_h)

#         p = Point(nx, ny)

#         best_region = None
#         best_dist = float("inf")

#         for r in cached.get("regions", []):
#             poly_pts = r.get("polygon", [])
#             if not poly_pts or len(poly_pts) < 3:
#                 continue
#             poly = Polygon(poly_pts)
#             if poly.is_valid and poly.contains(p):
#                 return {"status": "success", "match_type": "contains", "region": r}
#             # centroid fallback
#             cx, cy = r.get("centroid", [None, None])
#             if cx is None:
#                 centroid = poly.centroid
#                 cx, cy = centroid.x, centroid.y
#             d = p.distance(Point(cx, cy))
#             if d < best_dist:
#                 best_dist = d
#                 best_region = r

#         if best_region:
#             return {"status": "success", "match_type": "nearest_centroid", "region": best_region, "distance": best_dist}
#         else:
#             return {"status": "not_found"}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}

# # ---------------------------
# # analyze_area: returns region.real_area if click hits a region
# # ---------------------------
# @app.post("/analyze_area")
# def analyze_area(data: ClickData):
#     try:
#         safe = _safe_pdf_name(data.pdfPath)
#         cache_file = _cache_path(safe, data.pageNum)
#         if not os.path.exists(cache_file):
#             if not run_ml_for_uploaded(safe):
#                 return {"status": "error", "message": "ML cache missing; run ml-analyze-areas or upload first."}

#         with open(cache_file, "r", encoding="utf-8") as fh:
#             cached = json.load(fh)

#         page_pdf_w = float(cached.get("page_pdf_w", 1.0))
#         page_pdf_h = float(cached.get("page_pdf_h", 1.0))

#         nx = float(data.x) / page_pdf_w
#         ny = 1.0 - (float(data.y) / page_pdf_h)
#         p = Point(nx, ny)

#         for r in cached.get("regions", []):
#             poly = Polygon(r.get("polygon", []))
#             if poly.contains(p):
#                 return {"status": "success", "area": r.get("real_area"), "units":"m²", "region": r}
#         return {"status": "not_found"}
#     except Exception as e:
#         return {"status": "error", "message": str(e), "trace": traceback.format_exc()}

# @app.get("/")
# def root():
#     return {"status": "running", "model_loaded": model is not None}

# # Run with: uvicorn main:app --reload --port 8000


# main.py
import os, re, json, tempfile, traceback, hashlib, logging
from datetime import datetime

import fitz
import numpy as np
import cv2
from pdf2image import convert_from_path
from shapely.geometry import Polygon, Point
from ultralytics import YOLO

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

app = FastAPI(title="Floorplan Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
CACHE_DIR = os.path.join(BASE_DIR, "ml_cache")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(CACHE_DIR, exist_ok=True)

MODEL_PATH = os.path.join(BASE_DIR, "best.pt")
PROJECT_ID = "TEMP_PROJECT"

try:
    model = YOLO(MODEL_PATH)
    logger.info("Model loaded OK")
except Exception as e:
    logger.warning("YOLO model not loaded: %s", e)
    model = None

ML_RESULTS_STORE = {}


def _safe_pdf_name(name: str):
    base = os.path.basename(name)
    return re.sub(r"[^0-9a-zA-Z_.-]", "_", base)


def _cache_path(pdf_name: str, page_num: int):
    safe = _safe_pdf_name(pdf_name)
    return os.path.join(CACHE_DIR, f"{safe}_page{page_num}.json")


class ClickData(BaseModel):
    x: float
    y: float
    pageNum: int
    pdfPath: str


# -------------------------------------------------------------------
# AREA MULTIPLIERS (YOUR EXACT CUSTOM RULE)
# -------------------------------------------------------------------
def get_scale_multiplier(scale: str):
    scale = (scale or "").strip()
    if scale == "1:100":
        return 0.10
    if scale == "1:75":
        return 0.75
    try:
        denom = float(scale.split(":")[1])
        return (1.0 / denom) ** 2
    except Exception:
        return 0.10


# -------------------------------------------------------------------
# ML ANALYZE (stores final real_area in cache)
# -------------------------------------------------------------------
@app.post("/ml-analyze-areas/")
async def ml_analyze_areas(
    file: UploadFile = File(...),
    scale: str = Form("1:100"),
    dpi: int = Form(300)
):
    if model is None:
        return {"status": "error", "message": "model not loaded"}

    scale_multiplier = get_scale_multiplier(scale)

    tmp_path = None
    pdf_doc = None
    try:
        # save upload to temp
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        # open pdf and render pages
        pdf_doc = fitz.open(tmp_path)
        pages = convert_from_path(tmp_path, dpi=dpi)

        safe_pdf = _safe_pdf_name(file.filename or tmp_path)

        ML_RESULTS_STORE[PROJECT_ID] = {"scale": scale, "dpi": dpi, "pages": {}}

        out_pages = []

        for i, pil_img in enumerate(pages):
            page_num = i + 1
            img_np = np.array(pil_img.convert("RGB"))
            img_h, img_w = img_np.shape[:2]

            page = pdf_doc[i]
            pdf_w = page.rect.width
            pdf_h = page.rect.height

            # run model prediction
            res = model.predict(img_np, conf=0.25, verbose=False)[0]

            regions = []
            if hasattr(res, "masks") and res.masks:
                orig_h, orig_w = res.orig_shape
                sx = img_w / orig_w
                sy = img_h / orig_h

                for mask in res.masks.data:
                    mask_np = (mask.cpu().numpy() > 0.5).astype(np.uint8) * 255
                    contours, _ = cv2.findContours(mask_np, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                    for cnt in contours:
                        cnt = np.squeeze(cnt)
                        if cnt.ndim != 2 or len(cnt) < 3:
                            continue

                        cnt = cnt.astype(float)
                        cnt[:, 0] *= sx
                        cnt[:, 1] *= sy

                        approx = cv2.approxPolyDP(cnt.astype(np.float32), 1.5, True)
                        approx = np.squeeze(approx) if approx is not None and len(approx) >= 3 else cnt

                        pts_int = np.int32(approx)
                        px_area = float(cv2.contourArea(pts_int))

                        # normalize w.r.t rendered image (y measured from top)
                        norm = approx.copy()
                        norm[:, 0] /= float(img_w)
                        norm[:, 1] /= float(img_h)
                        centroid = norm.mean(axis=0).tolist()

                        # pixel area -> mm^2 (using dpi)
                        mm2 = px_area * (25.4 / dpi) ** 2
                        # final real area in m^2 using your multiplier
                        real_area = mm2 * scale_multiplier / 1_000_000.0

                        regions.append({
                            "polygon": norm.tolist(),       # normalized to image dims; y from top
                            "pixel_area": px_area,
                            "mm2": mm2,
                            "real_area_m2": real_area,
                            "centroid": centroid
                        })

            cached = {
                "page": page_num,
                "img_w": img_w,
                "img_h": img_h,
                "page_pdf_w": pdf_w,
                "page_pdf_h": pdf_h,
                "dpi": dpi,
                "regions": regions
            }

            with open(_cache_path(safe_pdf, page_num), "w", encoding="utf-8") as fh:
                json.dump(cached, fh, indent=2)

            ML_RESULTS_STORE[PROJECT_ID]["pages"][page_num] = cached
            out_pages.append({"page": page_num, "regions": regions})

        return {"status": "success", "scale": scale, "dpi": dpi, "pages": out_pages}

    except Exception as ex:
        logger.exception("ml error")
        return {"status": "error", "message": str(ex), "trace": traceback.format_exc()}

    finally:
        # ensure pdf_doc closed before deleting tmp file
        try:
            if pdf_doc is not None:
                try:
                    pdf_doc.close()
                except:
                    pass
        except:
            pass

        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except Exception:
                logger.warning("Could not delete temp file (likely still locked): %s", tmp_path)


# -------------------------------------------------------------------
# MATCH CLICK
# -------------------------------------------------------------------
@app.post("/match-click/")
def match_click(data: ClickData):
    try:
        safe_pdf = _safe_pdf_name(data.pdfPath)
        cache_file = _cache_path(safe_pdf, data.pageNum)

        if not os.path.exists(cache_file):
            return {"status": "error", "message": "ML not run"}

        cached = json.load(open(cache_file, "r", encoding="utf-8"))

        pdf_w = float(cached.get("page_pdf_w", 1.0))
        pdf_h = float(cached.get("page_pdf_h", 1.0))
        img_w = float(cached.get("img_w", pdf_w))
        img_h = float(cached.get("img_h", pdf_h))

        # Interpret provided coords (data.x/y) as PDF points.
        # Convert PDF points -> rendered image coords:
        rendered_x = float(data.x) * (img_w / pdf_w)
        rendered_y = float(data.y) * (img_h / pdf_h)

        # normalize for polygons (y measured from top)
        nx = rendered_x / img_w
        ny = rendered_y / img_h

        p = Point(nx, ny)

        best = None
        best_d = float("inf")

        for r in cached.get("regions", []):
            pts = r.get("polygon", [])
            if not pts or len(pts) < 3:
                continue
            poly = Polygon(pts)
            try:
                if poly.is_valid and poly.contains(p):
                    return {"status": "success", "region": r}
            except Exception:
                # continue trying nearest-centroid
                pass

            cx, cy = r.get("centroid", [None, None])
            if cx is None:
                centroid = poly.centroid
                cx, cy = centroid.x, centroid.y
            d = p.distance(Point(cx, cy))
            if d < best_d:
                best_d = d
                best = r

        if best:
            return {"status": "success", "region": best, "distance": best_d}
        return {"status": "not_found"}

    except Exception as ex:
        logger.exception("match-click error")
        return {"status": "error", "message": str(ex), "trace": traceback.format_exc()}


# -------------------------------------------------------------------
# ANALYZE AREA
# -------------------------------------------------------------------
@app.post("/analyze_area")
def analyze_area(data: ClickData):
    try:
        safe_pdf = _safe_pdf_name(data.pdfPath)
        cache_file = _cache_path(safe_pdf, data.pageNum)

        if not os.path.exists(cache_file):
            return {"status": "error", "message": "ML not run"}

        cached = json.load(open(cache_file, "r", encoding="utf-8"))

        pdf_w = float(cached.get("page_pdf_w", 1.0))
        pdf_h = float(cached.get("page_pdf_h", 1.0))
        img_w = float(cached.get("img_w", pdf_w))
        img_h = float(cached.get("img_h", pdf_h))

        # Convert incoming PDF coords -> rendered image coordinates
        rendered_x = float(data.x) * (img_w / pdf_w)
        rendered_y = float(data.y) * (img_h / pdf_h)

        nx = rendered_x / img_w
        ny = rendered_y / img_h

        p = Point(nx, ny)

        for r in cached.get("regions", []):
            poly = Polygon(r.get("polygon", []))
            try:
                if poly.is_valid and poly.contains(p):
                    return {
                        "status": "success",
                        "area_m2": r.get("real_area_m2"),
                        "area_mm2": r.get("mm2"),
                        "region": r
                    }
            except Exception:
                pass

        return {"status": "not_found"}

    except Exception as ex:
        logger.exception("analyze_area error")
        return {"status": "error", "message": str(ex), "trace": traceback.format_exc()}


@app.get("/")
def root():
    return {"status": "running", "model_loaded": model is not None}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
