// routes/boqRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

const MasterBOQ = require("../models/MasterBOQ");
const BOQProject = require("../models/BOQProject");

// === UPLOAD DIR ===
const UPLOAD_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET uploads summary (for frontend)
router.get("/uploads", async (req, res) => {
  try {
    const master = await MasterBOQ.findOne({}, "uploaded_at").sort({ uploaded_at: -1 });
    const projects = await BOQProject.find({}, "project_name uploaded_by uploaded_at").sort({ uploaded_at: -1 });

    const data = [];
    if (master) {
      data.push({
        type: "master",
        filename: "Master BOQ",
        uploaded_by: "System",
        uploaded_at: master.uploaded_at,
      });
    }

    projects.forEach((p) =>
      data.push({
        type: "project",
        filename: p.project_name,
        uploaded_by: p.uploaded_by || "-",
        uploaded_at: p.uploaded_at,
      })
    );

    return res.json(data);
  } catch (err) {
    console.error("Error fetching uploads:", err);
    return res.status(500).json({ message: "Failed to fetch uploads" });
  }
});

// Upload Master BOQ - parse excel for simple classes (expect columns: class_ref, class_description)
router.post("/upload-master", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const filePath = path.join(UPLOAD_DIR, req.file.filename);

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    // Expect rows like: class_ref, class_description, div_ref, div_description, sub_ref, sub_description
    const inserted = [];
    for (const r of rows) {
      const cls = {
        class_ref: r.class_ref || r["Class Ref"] || r["Class"] || "",
        class_description: r.class_description || r["Class Description"] || r["Description"] || "",
        divisions: [],
      };
      // if division/subdivision info present, parse and push
      if (r.div_ref || r.div_description || r.sub_ref || r.sub_description) {
        const div = {
          div_ref: r.div_ref || r["Div Ref"] || "",
          div_description: r.div_description || r["Div Description"] || "",
          subdivisions: [],
        };
        if (r.sub_ref || r.sub_description) {
          div.subdivisions.push({
            sub_ref: r.sub_ref || r["Sub Ref"] || "",
            sub_description: r.sub_description || r["Sub Description"] || "",
          });
        }
        cls.divisions.push(div);
      }
      const newCls = new MasterBOQ(cls);
      await newCls.save();
      inserted.push(newCls);
    }

    return res.status(200).json({ status: "success", inserted_count: inserted.length, inserted });
  } catch (err) {
    console.error("upload-master error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

// Upload Project BOQ - parse excel and store items
router.post("/upload-project/:projectName", upload.single("file"), async (req, res) => {
  try {
    const projectName = req.params.projectName || req.body.project_name;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = path.join(UPLOAD_DIR, req.file.filename);
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    // Map Excel columns to item model fields:
    // Accept headers: Item No, Room Name, Category, Description, Unit, Quantity, Rate, Amount
    const items = rows.map((r, idx) => {
      const qty = Number(r.Quantity || r.quantity || r.Qty || 0) || 0;
      const rate = Number(r.Rate || r.rate || 0) || 0;
      const amount = Number(r.Amount || r.amount || (qty * rate)) || qty * rate;

      return {
        item_no: Number(r["Item No"] || r.item_no || r.ItemNo || (idx + 1)),
        room_name: r["Room Name"] || r.room_name || r.room || "",
        class_ref: r["Category"] || r.category || "",
        item_description: r["Description"] || r.description || "",
        unit: r["Unit"] || r.unit || "",
        quantity: qty,
        rate: rate,
        amount: amount,
      };
    });

    const project = new BOQProject({
      project_name: projectName,
      uploaded_by: req.body.uploaded_by || req.user?.name || "Unknown",
      items,
    });
    await project.save();

    return res.status(201).json({ status: "success", project_id: project._id, items_count: items.length });
  } catch (err) {
    console.error("upload-project error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;
