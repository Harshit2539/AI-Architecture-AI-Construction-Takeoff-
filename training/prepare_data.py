# from pdf2image import convert_from_path
# from pathlib import Path
# import os, random, shutil, json
# from PIL import Image

# # ------------ CONFIG ------------
# SRC_PDF_DIR = Path("pdfs")  # where raw pdfs live
# IMG_OUT_DIR = Path("data/images")
# VAL_RATIO = 0.15
# CLASSES = ["room", "wall", "doors", "windows", "area", "length", "volume"]
# # --------------------------------

# # Step 1: Convert PDFs to PNGs
# print("📄 Converting PDFs to images...")
# IMG_OUT_DIR.mkdir(parents=True, exist_ok=True)
# all_imgs = []

# for pdf in SRC_PDF_DIR.glob("*.pdf"):
#     pages = convert_from_path(pdf, dpi=300)
#     for i, page in enumerate(pages):
#         img_name = f"{pdf.stem}_p{i+1}.png"
#         out_path = IMG_OUT_DIR / img_name
#         page.save(out_path, "PNG")
#         all_imgs.append(out_path)

# random.shuffle(all_imgs)
# n_val = int(len(all_imgs) * VAL_RATIO)
# val_imgs = all_imgs[:n_val]
# train_imgs = all_imgs[n_val:]

# for split in ["train", "val"]:
#     (IMG_OUT_DIR / split).mkdir(parents=True, exist_ok=True)

# for img in train_imgs:
#     shutil.move(str(img), f"data/images/train/{img.name}")

# for img in val_imgs:
#     shutil.move(str(img), f"data/images/val/{img.name}")

# print(f"✅ Split complete: {len(train_imgs)} train, {len(val_imgs)} val")

# # Step 2: Convert LabelMe JSON → YOLO format
# print("🧠 Converting LabelMe annotations → YOLO format...")

# for split in ["train", "val"]:
#     img_dir = Path(f"data/images/{split}")
#     label_dir = Path(f"data/labels/{split}")
#     label_dir.mkdir(parents=True, exist_ok=True)

#     for img_path in img_dir.glob("*.png"):
#         json_path = img_path.with_suffix(".json")
#         if not json_path.exists():
#             continue

#         data = json.load(open(json_path))
#         w, h = Image.open(img_path).size
#         lines = []

#         for shape in data["shapes"]:
#             label = shape["label"]
#             if label not in CLASSES:
#                 continue
#             cls_id = CLASSES.index(label)
#             pts = shape["points"]
#             norm = []
#             for (x, y) in pts:
#                 norm.append(str(x / w))
#                 norm.append(str(y / h))
#             lines.append(f"{cls_id} " + " ".join(norm))

#         txt_path = label_dir / f"{img_path.stem}.txt"
#         with open(txt_path, "w") as f:
#             f.write("\n".join(lines))

# print("✅ JSON → YOLO label conversion done.")


import json
from pathlib import Path
from PIL import Image

# Define your classes
CLASSES = ["room", "wall", "door", "window", "area", "length", "volume"]

# Define paths
DATA_DIR = Path("data")
SPLITS = ["train", "val"]

# Make sure label directories exist
for split in SPLITS:
    (DATA_DIR / "labels" / split).mkdir(parents=True, exist_ok=True)

print("🧠 Converting LabelMe JSON annotations → YOLOv8 segmentation format...")

for split in SPLITS:
    img_dir = DATA_DIR / "images" / split
    label_dir = DATA_DIR / "labels" / split
    count = 0

    # Process all image types
    for ext in ["*.jpg", "*.jpeg", "*.png"]:
        for img_path in img_dir.glob(ext):
            json_path = img_path.with_suffix(".json")
            if not json_path.exists():
                print(f"⚠️ No JSON found for {img_path.name}")
                continue

            try:
                data = json.load(open(json_path, "r"))
                w, h = Image.open(img_path).size
                lines = []

                for shape in data.get("shapes", []):
                    label = shape.get("label")
                    if label not in CLASSES:
                        continue

                    cls_id = CLASSES.index(label)
                    pts = shape.get("points", [])
                    norm = []
                    for (x, y) in pts:
                        norm.append(str(x / w))
                        norm.append(str(y / h))
                    lines.append(f"{cls_id} " + " ".join(norm))

                if lines:
                    txt_path = label_dir / f"{img_path.stem}.txt"
                    with open(txt_path, "w") as f:
                        f.write("\n".join(lines))
                    count += 1

            except Exception as e:
                print(f"❌ Error processing {img_path.name}: {e}")

    print(f"✅ {split}: Converted {count} annotations → YOLO format.")

print("🎯 All done! Check your data/labels/{train,val} folders.")
