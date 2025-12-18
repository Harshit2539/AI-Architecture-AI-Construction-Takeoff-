const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const fileFilter = (req, file, cb) => {
  // const allowedTypes = ["application/pdf"];
    const allowedTypes = [
    // PDF
    "application/pdf",

    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",

    // DWG (multiple possible MIME types)
    "application/acad",
    "application/x-acad",
    "application/autocad_dwg",
    "application/dwg",
    "application/x-dwg",
    "image/vnd.dwg",
    "image/x-dwg",

    // Many DWG uploads appear as generic binary
    "application/octet-stream"
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    // return cb(new Error("Only PDFs are allowed"), false);
    return cb(new Error("Only PDF, Images, or DWG files are allowed"), false);

  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
