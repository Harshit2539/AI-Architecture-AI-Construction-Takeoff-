const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const teamController = require('../controllers/teamController');

router.post('/', authMiddleware, teamController.createTeam);
router.get('/', authMiddleware, teamController.getTeams);
router.put('/:id', authMiddleware, teamController.updateTeam);
router.delete('/:id', authMiddleware, teamController.deleteTeam);
router.post('/add-user', authMiddleware, teamController.addUserToTeam);
module.exports = router;
