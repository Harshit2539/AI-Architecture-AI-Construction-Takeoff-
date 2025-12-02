from ultralytics import YOLO
import sys

def run_test(img_path=None):
    model_path = 'runs/train/floorplan-seg/weights/best.pt'
    model = YOLO(model_path)
    source = img_path if img_path else 'data/images/val'
    print(f'🔍 Running inference on: {source}')
    results = model.predict(source=source, conf=0.2, save=True)
    print('✅ Predictions saved to runs/predict/')

if __name__ == '__main__':
    img = sys.argv[1] if len(sys.argv) > 1 else None
    run_test(img)
