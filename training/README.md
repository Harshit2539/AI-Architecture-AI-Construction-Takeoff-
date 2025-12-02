YOLOv8 Segmentation Training Package for Architectural Blueprints
==================================================================

Contents:
- data/ (placeholder for images and labels)
- data.yaml (dataset config for YOLO)
- requirements.txt (python deps)
- train.py (train script)
- validate.py (validation script)
- test_inference.py (quick inference test)
- scripts/pdf_to_images.py (export PDFs to images)
- scripts/labelme_to_yolo_seg.py (convert LabelMe json -> YOLO seg txt)

Instructions (quick):
1. Place your annotated dataset into data/images/train, data/images/val, data/images/test
   and corresponding LabelMe-converted .txt files into data/labels/{train,val,test}.
2. Create a python venv and install requirements.txt
   python -m venv venv
   source venv/bin/activate   # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
3. (Optional GPU) Ensure PyTorch + CUDA installed before ultralytics if training on GPU.
   See https://pytorch.org for correct torch install command for your CUDA version.
4. Run training:
   python train.py
5. After training, copy runs/train/floorplan-seg/weights/best.pt to your backend-python folder
   and update MODEL_PATH in your FastAPI app.
6. Use validate.py and test_inference.py to verify performance.

Notes:
- This package uses labels you provided: room, wall, doors, windows, area, length, volume
- If you need tiling for very large images, add a preprocessing step to split into tiles.
