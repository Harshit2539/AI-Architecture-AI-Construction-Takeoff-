const Company = require('../models/Company');
exports.getCompanies = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Company name is required" });

    const companies = await Company.find({ name: { $regex: name, $options: 'i' } });
    res.json(companies);
  } catch (err) {
    console.error("Get companies error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.createCompany = async (req, res) => {
  try {
    const { name, maxUsers } = req.body;
    if (!name || !maxUsers) return res.status(400).json({ message: "Name and maxUsers are required" });
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) return res.status(400).json({ message: "Company already exists" });
    const company = new Company({
      name,
      maxUsers,
      users: [],
      status: "Active",
    });
    await company.save();
    res.status(201).json({ message: "Company created successfully", company });
  } catch (err) {
    console.error("Create company error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Company updated', company: updatedCompany });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteCompany = async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.json({ message: 'Company deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const populateUsers = req.query.populateUsers === "true";

    const company = await Company.findById(id)
      .populate(populateUsers ? "users" : "")
      .exec();

    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    console.error("Error fetching company:", err);
    res.status(500).json({ message: err.message });
  }
};
