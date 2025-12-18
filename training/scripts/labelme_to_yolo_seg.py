import json
from pathlib import Path
from PIL import Image

CLASSES = ['door', 'window', 'zone']

for split in ["train", "val"]:
    img_dir = Path(f"data/images/{split}")
    for img_path in img_dir.glob("*.png"):
        json_path = img_path.with_suffix(".json")
        if not json_path.exists():
            continue

        data = json.load(open(json_path))
        w, h = Image.open(img_path).size
        lines = []

        for shape in data["shapes"]:
            label = shape["label"]
            if label not in CLASSES:
                continue
            cls_id = CLASSES.index(label)
            pts = shape["points"]
            norm = []
            for (x, y) in pts:
                norm.append(str(x / w))
                norm.append(str(y / h))
            lines.append(f"{cls_id} " + " ".join(norm))

        txt_path = img_path.with_suffix(".txt")
        with open(txt_path, "w") as f:
            f.write("\n".join(lines))

print("✅ Converted all LabelMe JSONs → YOLOv8 format.")
