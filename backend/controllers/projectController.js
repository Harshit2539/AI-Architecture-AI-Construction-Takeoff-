const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { project_name, share_with_company, scale} = req.body;
    const user_id = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "PDF or image file is required" });
    }

    const newProject = new Project({
      project_name,
      share_with_company,
      scale,
      pdf_path: `/uploaded/${req.file.filename}`,
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
