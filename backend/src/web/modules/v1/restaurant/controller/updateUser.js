// updateUser.js

const bcrypt = require('bcrypt');
const db = require("@web/index.js");

// Actualizar datos del usuario
const updateUser = (req, res) => {
  const { id, name, lastName, email, phoneNumber, identification, birthDate, address, password } = req.body;

  // Generar hash de la nueva contraseña si se ha proporcionado
  let updatePasswordPromise = Promise.resolve(null);
  if (password) {
    updatePasswordPromise = bcrypt.hash(password, 10);
  }

  updatePasswordPromise.then((hashedPassword) => {
    const sql = `
      UPDATE User 
      SET name = ?, last_name = ?, email = ?, phone_number = ?, identification = ?, birth_date = ?, address = ?, password = COALESCE(?, password)
      WHERE id = ?
    `;
    const values = [name, lastName, email, phoneNumber, identification, birthDate, address, hashedPassword, id];

    db.query(sql, values, (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        return res.status(200).json({ message: 'User updated successfully' });
      }
    });
  }).catch(error => {
    console.error("Error hashing password:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  });
};

module.exports = { updateUser };
