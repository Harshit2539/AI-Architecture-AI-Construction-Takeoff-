from ultralytics import YOLO
import os

def train_model():
    model = YOLO("yolov8s-seg.pt")

    model.train(
        data="data.yaml",
        epochs=100,
        imgsz=640,
        batch=8,
        name="floorplan-seg",
        project="runs/train",
        device='cpu'  
    )

    print("✅ Training complete. Check runs/train/floorplan-seg/weights/best.pt")

if __name__ == "__main__":
    train_model()
