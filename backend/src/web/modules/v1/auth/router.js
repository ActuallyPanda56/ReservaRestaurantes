const express = require("express");
const router = express.Router();
const { register, login, refreshSession } = require("./controller/auth.js");
const { checkEmail, resetPassword } = require("./controller/resetPassword.js");

const { verifyJWT } = require("../../../../middleware/verifyJWT.js");

// Rutas para autenticación y restablecimiento de contraseña
router.post("/login", login);
router.post("/register", register);
router.post("/check-email", checkEmail);
router.post("/reset-password", resetPassword);
router.post("/refresh-session", verifyJWT, refreshSession);

module.exports = router;
