from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from PIL import Image
import glob

def images_to_pdf(img_folder, out_pdf):
    c = canvas.Canvas(out_pdf, pagesize=A4)

    for img in sorted(glob.glob(f"{img_folder}/*.png")):
        im = Image.open(img)
        c.drawImage(img, 0, 0, width=A4[0], height=A4[1])
        c.showPage()

    c.save()
