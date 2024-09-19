const express = require('express');
const { registerUser, loginUser, secretController } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register' , registerUser);
router.post('/login' , loginUser);

router.get('/secret', protect,secretController);

module.exports = router;