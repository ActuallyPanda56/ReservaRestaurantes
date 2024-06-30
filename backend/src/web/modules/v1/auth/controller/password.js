const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("@web/index.js");
const { serialize } = require('cookie');
const { v4: uuidv4 } = require('uuid');

const SECRET_KEY = 'your_secret_key'; // Reemplazar con una clave segura
const expirationTime = 60 * 60 * 24 * 7; // Tiempo de expiración del token en segundos (7 días)


// Función para solicitar restablecimiento de contraseña
const forgotPassword = (req, res) => {
  const { email } = req.body;

  const sql = "SELECT id FROM User WHERE email = ?";
  db.query(sql, [email], (error, data) => {
    if (error) {
      console.error("Error ejecutando la consulta:", error);
      return res.status(500).json({ message: 'Error en el servidor' });
    } else {
      if (data.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Generar un token de restablecimiento y enviarlo al frontend
      const resetToken = uuidv4();
      return res.json({ message: 'Usuario encontrado. Use este token para restablecer la contraseña', resetToken });
    }
  });
};

// Función para cambiar la contraseña después de validar el token de restablecimiento
const resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  try {
    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkTokenSql = "SELECT * FROM User WHERE reset_token = ?";
    db.query(checkTokenSql, [token], (err, data) => {
      if (err) {
        console.error("Error al verificar token de restablecimiento:", err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      if (data.length === 0) {
        return res.status(404).json({ message: 'Token inválido o expirado' });
      }

      const user = data[0];

      const updatePasswordSql = "UPDATE User SET password = ?, reset_token = NULL WHERE id = ?";
      db.query(updatePasswordSql, [hashedPassword, user.id], (error, result) => {
        if (error) {
          console.error("Error al actualizar la contraseña:", error);
          return res.status(500).json({ message: 'Error en el servidor' });
        }

        return res.json({ message: 'Contraseña actualizada exitosamente' });
      });
    });
  } catch (error) {
    console.error("Error al cifrar la contraseña:", error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
const checkEmail = (req, res) => {
    const { email } = req.body;
  
    const sql = "SELECT id FROM User WHERE email = ?";
    db.query(sql, [email], (error, data) => {
      if (error) {
        console.error("Error ejecutando la consulta:", error);
        return res.status(500).json({ message: 'Error en el servidor' });
      } else {
        if (data.length === 0) {
          return res.json({ exists: false }); // El correo electrónico no está registrado
        } else {
          return res.json({ exists: true }); // El correo electrónico está registrado
        }
      }
    });
}

module.exports = { forgotPassword, resetPassword, checkEmail };
