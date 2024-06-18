const bcrypt = require('bcrypt');
const db = require("@web/index.js");

//  Login function
const login = (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";

  db.query(sql, [req.body.email], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      if (data.length > 0) {
        const user = data[0];
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return res.status(500).json("Internal Server Error");
          } else {
            if (result) {
              return res.json("Usuario reconocido");
            } else {
              return res.json("Contraseña incorrecta");
            }
          }
        });
      } else {
        return res.json("Usuario no encontrado");
      }
    }
  });
}

const register = (req, res) => {
  const { name, last_name, email, password } = req.body;

  // Verificar que se proporcionen todos los campos necesarios
  if (!name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'Por favor, proporcione todos los campos requeridos' });
  }

  // Generar hash de la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    // Insertar usuario con contraseña encriptada en la base de datos
    const sql = "INSERT INTO user (name, last_name, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, last_name, email, hashedPassword], (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ message: 'Error en el servidor' });
      } else {
        console.log("Número de registros insertados: " + result.affectedRows);
        return res.json({ message: "Usuario registrado exitosamente" });
      }
    });
  });
}

module.exports = {login, register}