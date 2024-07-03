const bcrypt = require('bcrypt');
const db = require("@web/index.js");

// Función para verificar si un correo electrónico está registrado
const checkEmail = (req, res) => {
  const { email } = req.body;

  const sql = "SELECT id FROM User WHERE email = ?";
  db.query(sql, [email], (error, data) => {
    if (error) {
      console.error("Error ejecutando la consulta:", error);
      return res.status(500).json({ message: 'Error en el servidor' });
    } else {
      if (data.length === 0) {
        return res.status(401).json({ exists: false }); // El correo electrónico no está registrado
      } else {
        return res.status(200).json({  }); // El correo electrónico está registrado
      }
    }
  });
};

// Función para restablecer la contraseña
const resetPassword = (req, res) => {
  const { token, password, confirmPassword } = req.body;

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  // Implementar lógica para restablecer la contraseña
  // Ejemplo:
  // - Actualizar la contraseña en la base de datos
  // - Generar y almacenar un nuevo token si es necesario

  res.json({ message: 'Contraseña restablecida exitosamente' });
};

module.exports = { checkEmail, resetPassword };
