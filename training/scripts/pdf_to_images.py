from pdf2image import convert_from_path
from pathlib import Path
import os, random, shutil

SRC_PDF_DIR = Path("pdfs")
OUT_DIR = Path("data/images")
VAL_RATIO = 0.15

OUT_DIR.mkdir(parents=True, exist_ok=True)

all_imgs = []
for pdf in SRC_PDF_DIR.glob("*.pdf"):
    pages = convert_from_path(pdf, dpi=300)
    for i, page in enumerate(pages):
        img_name = f"{pdf.stem}_p{i+1}.png"
        out_path = OUT_DIR / img_name
        page.save(out_path, "PNG")
        all_imgs.append(out_path)

random.shuffle(all_imgs)
n_val = int(len(all_imgs) * VAL_RATIO)
val_imgs = all_imgs[:n_val]
train_imgs = all_imgs[n_val:]

(Path("data/images/train")).mkdir(parents=True, exist_ok=True)
(Path("data/images/val")).mkdir(parents=True, exist_ok=True)

for img in train_imgs:
    shutil.move(str(img), f"data/images/train/{img.name}")

for img in val_imgs:
    shutil.move(str(img), f"data/images/val/{img.name}")

print(f"✅ Done: {len(train_imgs)} train, {len(val_imgs)} val images.")
