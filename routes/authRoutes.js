const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.put('/:id', authController.updateUser);

router.delete('/:id', authController.deleteUser);

module.exports = router;
