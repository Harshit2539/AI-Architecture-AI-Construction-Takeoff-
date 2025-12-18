from shapely.geometry import Polygon

def is_valid_polygon(points, w, h):
    if len(points) < 3:
        return False

    for x, y in points:
        if x < 0 or y < 0 or x > w or y > h:
            return False

    poly = Polygon(points)

    if not poly.is_valid:
        return False

    if poly.area < 50:   # pixel threshold – tune this
        return False

    return True
