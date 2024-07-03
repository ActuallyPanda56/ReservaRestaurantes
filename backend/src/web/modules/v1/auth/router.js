const express = require('express');
const router = express.Router();
const { register, login } = require('./controller/auth.js');
const { checkEmail, resetPassword } = require('./controller/resetPassword.js');

// Rutas para autenticación y restablecimiento de contraseña
router.post('/login', login);
router.post('/register', register);
router.post('/check-email', checkEmail);
router.post('/reset-password', resetPassword);

module.exports = router;
