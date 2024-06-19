// Register restaurant function
const createRestaurant = (req, res) => {
  const { userId, name, description, banner, pictures, menu, type, address, capacity, ageRestricted } = req.body;

  // Verificar que se proporcionen todos los campos necesarios
  if (!userId || !name || !description || !type || !address || !capacity || ageRestricted === undefined) {
    return res.status(400).json({ message: 'Por favor, proporcione todos los campos requeridos' });
  }

  const id = uuidv4(); // Generar un ID único para el restaurante

  // Insertar restaurante en la base de datos
  const sql = "INSERT INTO restaurant (id, user_id, name, description, banner, pictures, menu, type, address, rating, capacity, age_restricted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, userId, name, description, banner, JSON.stringify(pictures), JSON.stringify(menu), type, address, 0, capacity, ageRestricted], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: 'Error en el servidor' });
    } else {
      console.log("Número de registros insertados: " + result.affectedRows);
      // Generate a JWT for the newly registered restaurant
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + expirationTime,
        id: id,
        name: name,
        type: type,
      }, SECRET_KEY);

      const serialized = serialize('restaurantToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: expirationTime * 1000,
        path: '/'
      })
      res.setHeader('Set-Cookie', serialized)

      return res.json({ message: "Restaurante registrado exitosamente"});
    }
  });
}

module.exports = {createRestaurant}