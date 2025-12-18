import json
import random
import shutil
from pathlib import Path
from pdf2image import convert_from_path
from polygon_validator import is_valid_polygon
from PIL import Image

# ---------------- CONFIG ----------------
CLASSES = ["door", "window", "zone"]
VAL_RATIO = 0.15
TEST_RATIO = 0.10

ROOT = Path(".")
PDF_DIR = ROOT / "pdfs"
IMG_DIR = ROOT / "data/images"
LBL_DIR = ROOT / "data/labels"

# ----------------------------------------

def ensure_dirs():
    for split in ["train", "val", "test"]:
        (IMG_DIR / split).mkdir(parents=True, exist_ok=True)
        (LBL_DIR / split).mkdir(parents=True, exist_ok=True)

def pdf_to_images():
    images = []
    for pdf in PDF_DIR.glob("*.pdf"):
        pages = convert_from_path(pdf, dpi=300)
        for i, page in enumerate(pages):
            img_name = f"{pdf.stem}_p{i+1}.png"
            out = IMG_DIR / img_name
            page.save(out, "PNG")
            images.append(out)
    return images

def split_data(images):
    random.shuffle(images)
    n = len(images)
    n_test = int(n * TEST_RATIO)
    n_val = int(n * VAL_RATIO)

    test = images[:n_test]
    val = images[n_test:n_test + n_val]
    train = images[n_test + n_val:]

    return train, val, test

def move_files(files, split):
    for img in files:
        json_file = img.with_suffix(".json")

        shutil.move(str(img), IMG_DIR / split / img.name)
        if json_file.exists():
            shutil.move(str(json_file), IMG_DIR / split / json_file.name)

def convert_labelme(split):
    img_path = IMG_DIR / split
    lbl_path = LBL_DIR / split

    for img in img_path.glob("*.png"):
        json_path = img.with_suffix(".json")
        if not json_path.exists():
            continue

        data = json.load(open(json_path))
        w, h = Image.open(img).size
        lines = []

        for shape in data["shapes"]:
            if shape["label"] not in CLASSES:
                continue

            if not is_valid_polygon(shape["points"], w, h):
                continue

            cls = CLASSES.index(shape["label"])
            coords = []
            for x, y in shape["points"]:
                coords.append(f"{x/w:.6f}")
                coords.append(f"{y/h:.6f}")

            lines.append(f"{cls} " + " ".join(coords))

        if lines:
            with open(lbl_path / f"{img.stem}.txt", "w") as f:
                f.write("\n".join(lines))

def main():
    ensure_dirs()
    images = pdf_to_images()
    train, val, test = split_data(images)

    move_files(train, "train")
    move_files(val, "val")
    move_files(test, "test")

    for split in ["train", "val", "test"]:
        convert_labelme(split)

    print("✅ Data pipeline completed successfully.")

if __name__ == "__main__":
    main()
