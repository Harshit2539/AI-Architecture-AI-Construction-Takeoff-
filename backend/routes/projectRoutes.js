const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require("../middleware/upload");

router.post('/store', authMiddleware,upload.single("file"), projectController.createProject); 
router.get('/', authMiddleware, projectController.getProjectsByUser);
router.get('/:id', authMiddleware, projectController.getProjectById);
module.exports = router;
