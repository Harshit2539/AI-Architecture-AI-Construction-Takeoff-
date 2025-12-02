// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { sendFileToPython } = require("../utils/callPython");
// const MasterBOQ = require("../models/MasterBOQ");
// const BOQProject = require("../models/BOQProject");

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // ensure upload dir exists
// if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// // ✅ Upload Master BOQ → Python Parser
// router.post("/upload-master", upload.single("file"), async (req, res) => {
//   try {
//     const filePath = path.join("uploads", req.file.filename);

    
//     const result = await sendFileToPython("/upload/master-boq/", filePath);

//     if (!result || result.status !== "success")
//       throw new Error("Python parse failed or returned invalid response");

//     res.status(200).json({
//       success: true,
//       message: "Master BOQ uploaded successfully via Python",
//       details: result,
//     });
//   } catch (err) {
//     console.error("❌ Master BOQ upload failed:", err.message);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // Project upload route
// router.post("/upload-project/:projectName", upload.single("file"), async (req, res) => {
//   try {
//     const filePath = path.join("uploads", req.file.filename);
//     const projectName = req.params.projectName;

//     const result = await sendFileToPython("/upload/project-boq/", filePath, {
//       project_id: projectName, // ✅ changed key name
//       uploaded_by: "frontend_user",
//     });

//     if (!result || result.status !== "success") {
//       console.error("❌ Python Error:", result);
//       throw new Error(result.message || "Python project parse failed");
//     }

//     res.status(200).json({
//       success: true,
//       message: "Project BOQ uploaded successfully via Python",
//       details: result,
//     });
//   } catch (err) {
//     console.error("❌ Project BOQ upload failed:", err.message);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// // ✅ Fetch uploaded BOQs
// router.get("/uploads", async (req, res) => {
//   try {
//     const master = await MasterBOQ.findOne({}, "uploaded_at").sort({ uploaded_at: -1 });
//     const projects = await BOQProject.find({}, "project_name uploaded_by uploaded_at");

//     const uploads = [];

//     if (master) {
//       uploads.push({
//         type: "master",
//         filename: "Master BOQ",
//         uploaded_by: "Admin",
//         uploaded_at: master.uploaded_at,
//       });
//     }

//     projects.forEach((p) => {
//       uploads.push({
//         type: "project",
//         filename: p.project_name,
//         uploaded_by: p.uploaded_by,
//         uploaded_at: p.uploaded_at,
//       });
//     });

//     res.json(uploads);
//   } catch (err) {
//     console.error("❌ Fetch uploads failed:", err.message);
//     res.status(500).json({ message: "Failed to fetch uploads" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { sendFileToPython } = require("../utils/callPython");

const MasterBOQ = require("../models/MasterBOQ");
const BOQProject = require("../models/BOQProject");

// === SETUP UPLOAD DIRECTORY ===
const UPLOAD_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// === MULTER CONFIGURATION ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// === ROUTES ===

// 📥 GET UPLOAD HISTORY
router.get("/uploads", async (req, res) => {
  try {
    const masterUploads = await MasterBOQ.find({}, { uploaded_at: 1 }).sort({ uploaded_at: -1 }).limit(1);
    const projectUploads = await BOQProject.find({}, { project_name: 1, uploaded_by: 1, uploaded_at: 1 })
      .sort({ uploaded_at: -1 });

    const uploads = [];
    if (masterUploads.length > 0) {
      uploads.push({
        type: "master",
        filename: "Master BOQ.xlsx",
        uploaded_by: "System",
        uploaded_at: masterUploads[0].uploaded_at,
      });
    }

    projectUploads.forEach((proj) => {
      uploads.push({
        type: "project",
        filename: proj.project_name,
        uploaded_by: proj.uploaded_by || "-",
        uploaded_at: proj.uploaded_at,
      });
    });

    res.json(uploads);
  } catch (err) {
    console.error("Error fetching uploads:", err);
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
});

// ✅ Master BOQ Upload
router.post("/upload-master", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file;
    const filePath = path.join(UPLOAD_DIR, `${Date.now()}-${file.name}`);
    await file.mv(filePath); // move uploaded file to uploads dir

    console.log("📄 Received Master BOQ:", filePath);

    // Send to Python API
    const result = await sendFileToPython("/upload/master-boq/", filePath);

    if (result.status !== "success") {
      console.error("⚠️ Python failed:", result);
      return res.status(422).json({ message: "Python parsing failed", details: result });
    }

    // Save a reference entry in Mongo
    const master = new MasterBOQ({
      class_ref: "A",
      class_description: "Master BOQ Upload",
      divisions: [],
      uploaded_at: new Date(),
    });
    await master.save();

    res.json({
      success: true,
      message: "Master BOQ uploaded successfully",
      details: result,
    });
  } catch (err) {
    console.error("❌ Upload master error:", err);
    res.status(500).json({ message: "Upload master failed", error: err.message });
  }
});

// 📤 UPLOAD PROJECT BOQ
router.post("/upload-project/:projectName", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = path.join(UPLOAD_DIR, req.file.filename);
    const projectName = req.params.projectName;

    console.log("📄 Received Project BOQ:", filePath);

    const pythonRes = await axios.post(`http://127.0.0.1:8000/upload/project-boq/${projectName}`, { path: filePath });

    const project = new BOQProject({
      project_name: projectName,
      uploaded_by: req.user?.name || "Unknown",
      items: [],
    });
    await project.save();

    res.json({
      success: true,
      message: "Project BOQ uploaded successfully via Python",
      details: pythonRes.data,
    });
  } catch (err) {
    console.error("Upload project error:", err.message);
    res.status(500).json({ message: "Upload project failed" });
  }
});

module.exports = router;
