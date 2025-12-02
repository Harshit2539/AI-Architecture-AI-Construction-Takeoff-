const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController'); 
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/', userController.createUser); 
router.get('/', userController.getUsers);  
router.get('/:id', userController.getUserById); 
router.put('/:id', userController.updateUser); 
router.delete('/:id', userController.deleteUser); 


   
module.exports = router;
