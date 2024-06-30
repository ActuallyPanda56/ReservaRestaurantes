const express = require('express');
const router = express.Router();
const { login, register } = require('./controller/auth');
const { updateUser } = require('./controller/updateUser');
const { forgotPassword, resetPassword, checkEmail } = require('./controller/password');

// Rutas para autenticación y registro
router.post('/login', login);
router.post('/register', register);
router.post('/updateUser', updateUser);

// Rutas para recuperación y restablecimiento de contraseña
router.post('/forgot-password', forgotPassword); // Función para solicitar restablecimiento de contraseña
router.post('/reset-password', resetPassword); // Función para cambiar la contraseña después de validar el token de restablecimiento
router.post('/check-email', checkEmail); // Función para cambiar la contraseña después de validar el token de restablecimiento

module.exports = router;
