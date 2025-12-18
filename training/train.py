from ultralytics import YOLO
import os

def train_model():
    model = YOLO("yolov8s-seg.pt")
# segmentation model -> yolov8s-seg.pt and yolov8s.pt <- detaction model
    model.train(
        data="data.yaml",
        epochs=100,
        imgsz=640,
        batch=8,
        name="floorplan-seg",
        project="runs/train",
        device='cpu',
        # change 0 if gpu
        cls=1.5
    )

    print("✅ Training complete. Check runs/train/floorplan-seg/weights/best.pt")

if __name__ == "__main__":
    train_model()
