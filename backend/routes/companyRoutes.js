const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const companyController = require('../controllers/companyController');
const Company = require('../models/Company');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/my-company', authMiddleware, async (req, res) => {
  try {
    let company;
    if (mongoose.Types.ObjectId.isValid(req.user.companyId)) {
      company = await Company.findById(req.user.companyId);
    } else {
      company = await Company.findOne({ name: req.user.companyId });
    }
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/', companyController.getCompanies); 
router.get("/:id", companyController.getCompanyById);
router.post('/', companyController.createCompany); 

module.exports = router;
