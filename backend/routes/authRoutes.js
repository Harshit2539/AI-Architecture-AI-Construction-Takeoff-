const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login); 
// router.post('/admin-verify', authController.adminVerify);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/reset-password-verify/:token', authController.verifyResetToken);



module.exports = router;
