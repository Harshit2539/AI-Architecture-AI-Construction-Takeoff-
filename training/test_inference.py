
# predict the detected region

from ultralytics import YOLO
import sys

def run_test(img_path=None):
    model_path = 'runs/train/floorplan-seg/weights/best.pt'
    model = YOLO(model_path)
    source = img_path if img_path else 'data/images/test'
    print(f'🔍 Running inference on: {source}')
    results = model.predict(source=source, conf=0.25, save=True)
    print('✅ Predictions saved to runs/predict/')
    print("\n📐 AREA MEASUREMENTS (sq.m)\n" + "-" * 30)
    for r in results:
       if r.masks is None:
        continue

    for i, mask in enumerate(r.masks.data):
        area = mask_area(mask.cpu().numpy())
        cls_id = int(r.boxes.cls[i])
        cls_name = r.names[cls_id]

        print(f"{cls_name:<10} : {area:.2f} m²")

if __name__ == '__main__':
    img = sys.argv[1] if len(sys.argv) > 1 else "data/images/test"
    run_test(img)
