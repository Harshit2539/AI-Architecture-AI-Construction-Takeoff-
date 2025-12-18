import cv2
import numpy as np

# ⚠️ This MUST be calibrated per drawing scale
PIXEL_TO_METER = 0.01  
# PIXEL_TO_METER = 0.0254 / 300  for 300 dpi pdf based

def mask_area(mask: np.ndarray) -> float:
    """
    Computes real-world area from a binary segmentation mask.
    """
    pixel_count = np.count_nonzero(mask)
    return pixel_count * (PIXEL_TO_METER ** 2)
