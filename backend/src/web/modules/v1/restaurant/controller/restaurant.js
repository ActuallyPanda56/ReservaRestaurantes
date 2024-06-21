const jwt = require('jsonwebtoken');
const db = require("@web/index.js");
const { serialize } = require('cookie');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// Register restaurant function
const createRestaurant = (req, res) => {
  console.log(req.body)
  const { userId, name, description, banner, pictures, menu, type, address, capacity, ageRestricted } = req.body;

  // Verificar que se proporcionen todos los campos necesarios
  if (!userId || !name || !type || !address || !capacity || ageRestricted === undefined) {
    return res.status(400).json({ message: 'Por favor, proporcione todos los campos requeridos' });
  }

  const id = uuidv4(); // Generar un ID único para el restaurante

  // Insertar restaurante en la base de datos
  const sql = "INSERT INTO restaurant (id, user_id, name, description, banner, pictures, menu, type, address, rating, capacity, age_restricted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, userId, name, description, banner, JSON.stringify(pictures), JSON.stringify(menu), type, address, 0, JSON.stringify(capacity), ageRestricted], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: 'Error en el servidor' });
    } else {
      console.log("Número de registros insertados: " + result.affectedRows);

      return res.json({ message: "Restaurante registrado exitosamente"});
    }
  });
}

module.exports = {createRestaurant}