const MasterBOQ = require("../models/MasterBOQ");
const BOQProject = require("../models/BOQProject");

const { sendFileToPython } = require("../utils/callPython");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR = "./uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

export const uploadMasterBOQ = async (req, res) => {
  try {
    const filePath = path.join(UPLOAD_DIR, req.file.filename);
    const result = await sendFileToPython("/upload/master-boq/", filePath);

    if (result.status !== "success") {
      throw new Error(result.message || "Python parse failed");
    }

    // 🔥 If Python returned structured data, insert into Mongo
    if (Array.isArray(result.classes) && result.classes.length > 0) {
      await MasterBOQ.insertMany(result.classes);
      console.log(`✅ Inserted ${result.classes.length} records into MongoDB`);
    } else {
      console.warn("⚠️ No class data returned from Python.");
    }

    res.json({
      success: true,
      message: "Master BOQ uploaded successfully and saved to DB",
      details: {
        inserted_classes: result.classes?.length || 0,
      },
    });
  } catch (err) {
    console.error("❌ uploadMasterBOQ error:", err);
    res.status(500).json({ message: "Error uploading Master BOQ" });
  }
};


export const uploadProjectBOQ = async (req, res) => {
  try {
    const { project_name, uploaded_by } = req.body;
    const filePath = path.join(UPLOAD_DIR, req.file.filename);

    const result = await sendFileToPython("/upload/project-boq/", filePath, {
      project_name,
      uploaded_by,
    });

    res.json({ message: "Project BOQ uploaded successfully", details: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading Project BOQ" });
  }
};

export const getUploads = async (req, res) => {
  try {
    const master = await MasterBOQ.findOne({}, "uploaded_at").sort({ uploaded_at: -1 });
    const projects = await BOQProject.find({}, "project_name uploaded_by uploaded_at");

    const data = [];

    if (master)
      data.push({
        type: "master",
        filename: "Master BOQ",
        uploaded_by: "Admin",
        uploaded_at: master.uploaded_at,
      });

    projects.forEach((p) =>
      data.push({
        type: "project",
        filename: p.project_name,
        uploaded_by: p.uploaded_by,
        uploaded_at: p.uploaded_at,
      })
    );

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
};
