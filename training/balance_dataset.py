import shutil
import random
from pathlib import Path

LABELS = Path("data/labels/train")
IMAGES = Path("data/images/train")

TARGET_MULTIPLIER = {
    0: 3,  # door
    1: 4,  # window
    2: 1   # zone
}

for lbl in LABELS.glob("*.txt"):
    txt = lbl.read_text()
    classes = set(line.split()[0] for line in txt.splitlines())

    for cls in classes:
        cls = int(cls)
        for i in range(TARGET_MULTIPLIER[cls] - 1):
            new_img = IMAGES / f"{lbl.stem}_dup{cls}_{i}.png"
            new_lbl = LABELS / f"{lbl.stem}_dup{cls}_{i}.txt"

            shutil.copy(IMAGES / f"{lbl.stem}.png", new_img)
            shutil.copy(lbl, new_lbl)
