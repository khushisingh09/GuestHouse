// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, forgotPassword,fetchUser } = require('../controllers/authControllers');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.get('/user', fetchUser);
module.exports = router;
