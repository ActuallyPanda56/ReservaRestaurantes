const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("@web/index.js");
const { serialize } = require('cookie');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// Define a secret key for signing the JWT
const SECRET_KEY = 'your_secret_key'; // Replace with a secure secret key
const expirationTime = 60 * 60 * 24 * 7; 

// Login function
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
              // User authenticated, generate a JWT
              const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + expirationTime,
                id: user.id,
                name: user.name,
                lastName: user.last_name,
              }, SECRET_KEY);
      
              const serialized = serialize('userToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: expirationTime * 1000,
                path: '/'
              })
              res.setHeader('Set-Cookie', serialized)
              return res.status(200).json({ message: "Usuario reconocido",
                token: token,
              });
            } else {
              return res.status(401).json("Contraseña incorrecta");
            }
          }
        });
      } else {
        return res.json("Usuario no encontrado");
      }
    }
  });
}

// Register function
const register = (req, res) => {
  const { email, name, lastName, phoneNumber, password } = req.body;

  // Verificar que se proporcionen todos los campos necesarios
  if (!name || !phoneNumber || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Por favor, proporcione todos los campos requeridos' });
  }

  // Generar hash de la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    // Insertar usuario con contraseña encriptada en la base de datos
    const sql = "INSERT INTO user (name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, lastName, email, phoneNumber, hashedPassword], (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ message: 'Error en el servidor' });
      } else {
        console.log("Número de registros insertados: " + result.affectedRows);
        // Generate a JWT for the newly registered user
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + expirationTime,
          id: result.insertId,
          name: name,
          lastName: lastName,
        }, SECRET_KEY);

        const serialized = serialize('userToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          maxAge: expirationTime * 1000,
          path: '/'
        })
        res.setHeader('Set-Cookie', serialized)

        return res.json({ message: "Usuario registrado exitosamente"});
      }
    });
  });
}

// Register restaurant function
const registerRestaurant = (req, res) => {
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

module.exports = { login, register, registerRestaurant };
