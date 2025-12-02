from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import fitz  
import tempfile
import os
import re
from pdf2image import convert_from_path
import easyocr
import numpy as np 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reader = easyocr.Reader(['en'], gpu=False)

@app.post("/extract-scale/")
async def extract_scale(file: UploadFile = File(...)):
    tmp_path = None
    try:
       
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        scale = None

      
        text = ""
        with fitz.open(tmp_path) as doc:
            for page in doc:
                text += page.get_text("text")
        
        match = re.search(r"(?:scale\s*[@:]?\s*|@?\s*[A-Z0-9]+\s*)?(\d+\s*[:/]\s*\d+)", text, re.IGNORECASE)
        if match:
            scale = match.group(1).replace(" ", "")

        if not scale:
            pages = convert_from_path(tmp_path)
            pages = convert_from_path(tmp_path, first_page=1, last_page=3)

            for page_img in pages:
                ocr_result = reader.readtext(np.array(page_img))
                for _, text_detected, _ in ocr_result:
                    match = re.search(r"(?:scale\s*[@:]?\s*|@?\s*[A-Z0-9]+\s*)?(\d+\s*[:/]\s*\d+)", text_detected, re.IGNORECASE)
                    if match:
                        scale = match.group(1).replace(" ", "")
                        break
                if scale:
                    break

       
        if scale:
            scale = scale.replace("4:", "1:")  
            scale = scale.replace("I:", "1:") 
            scale = scale.replace("O:", "0:")  

        if scale:
            return {"status": "success", "scale": scale}
        else:
            return {"status": "not_found", "message": "Scale not found in document"}

    except Exception as e:
        return {"status": "error", "message": str(e)}

    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)
