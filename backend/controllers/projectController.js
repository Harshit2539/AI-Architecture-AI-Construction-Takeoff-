const Project = require("../models/Project");
const path = require("path");
const convertapi = require('convertapi')('VR3hbvZKD6abpvTFVSrv6JaChb7Iy6K8');
const fs = require("fs");

exports.createProject = async (req, res) => {
  try {
    const { project_name, share_with_company, scale} = req.body;
    const user_id = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "PDF/DWG/image file is required" });
    }


    
    let finalPdfPath = `/uploaded/${req.file.filename}`; 

    // Check if the uploaded file is a DWG
    const dwgMimeTypes = [
      "application/acad",
      "application/x-acad",
      "application/autocad_dwg",
      "application/dwg",
      "application/x-dwg",
      "image/vnd.dwg",
      "image/x-dwg",
      "application/octet-stream"
    ];

    if (dwgMimeTypes.includes(req.file.mimetype)) {
      const dwgFilePath = path.join(__dirname, "../uploads", req.file.filename);
      const pdfFileName = req.file.filename.replace(path.extname(req.file.filename), ".pdf");
      // const pdfFilePath = path.join(__dirname, "../uploads", pdfFileName);

      // Convert DWG to PDF
      const result = await convertapi.convert('pdf', { File: dwgFilePath }, 'dwg');
      await result.saveFiles(path.join(__dirname, "../uploads"));

      finalPdfPath = `/uploaded/${pdfFileName}`;

      // Optionally, remove original DWG file
      fs.unlinkSync(dwgFilePath);
    }

    

    const newProject = new Project({
      project_name,
      share_with_company,
      scale,
      pdf_path: finalPdfPath,
      user_id,
    });

    await newProject.save();

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

exports.getProjectsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.find({ user_id: userId }).sort({ created_at: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
