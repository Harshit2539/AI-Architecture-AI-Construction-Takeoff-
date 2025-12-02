from ultralytics import YOLO

def validate_model():
    model_path = 'runs/train/floorplan-seg/weights/best.pt'
    model = YOLO(model_path)
    results = model.val(data='data.yaml')
    print('Validation complete:', results)

if __name__ == '__main__':
    validate_model()
