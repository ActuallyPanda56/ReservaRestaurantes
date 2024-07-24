const db = require("@web/index.js");
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// Register restaurant function
const createRestaurant = (req, res) => {
  console.log(req.body)
  const { userId, name, description, shortDescription, banner, pictures, menuInfo, menuPicture, type, address, capacity, ageRestricted } = req.body;

  // Verificar que se proporcionen todos los campos necesarios
  if (!userId || !name || !type || !address || !capacity || ageRestricted === undefined) {
    return res.status(400).json({ message: 'Por favor, proporcione todos los campos requeridos' });
  }

  const id = uuidv4(); // Generar un ID único para el restaurante

  // Insertar restaurante en la base de datos
  const sql = "INSERT INTO restaurant (id, user_id, name, description, short_description, banner, pictures, menu_picture, menu_info, type, address, rating, capacity, age_restricted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, userId, name, description, shortDescription ,banner, JSON.stringify(pictures), menuPicture, JSON.stringify(menuInfo), type, address, 0, JSON.stringify(capacity), ageRestricted], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: 'Error en el servidor' });
    } else {
      console.log("Número de registros insertados: " + result.affectedRows);

      return res.json({ message: "Restaurante registrado exitosamente"});
    }
  });
}

// Get all restaurants (excluding soft deleted ones)
const getRestaurants = (req, res) => {
  const sql = "SELECT * FROM restaurant WHERE deleted_at IS NULL";

  db.query(sql, (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      return res.status(200).json(data);
    }
  });
}

// Get restaurant by ID (excluding soft deleted ones)
const getRestaurantById = (req, res) => {
  const { id } = req.params;

  const restaurantSql = `
    SELECT * FROM restaurant 
    WHERE id = ? AND deleted_at IS NULL`;

  const scheduleSql = `
    SELECT id, day, start_time, end_time 
    FROM schedule 
    WHERE restaurant_id = ?`;

  const reviewSql = `
    SELECT id, user_id, rating, title, description, created_at 
    FROM review 
    WHERE restaurant_id = ?`;

  db.query(restaurantSql, [id], (error, restaurantData) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      if (restaurantData.length > 0) {
        const restaurant = restaurantData[0];

        db.query(scheduleSql, [id], (error, scheduleData) => {
          if (error) {
            console.error("Error executing query:", error);
            return res.status(500).json("Internal Server Error");
          } else {
            restaurant.schedule = scheduleData;

            db.query(reviewSql, [id], (error, reviewData) => {
              if (error) {
                console.error("Error executing query:", error);
                return res.status(500).json("Internal Server Error");
              } else {
                restaurant.reviews = reviewData;
                return res.status(200).json(restaurant);
              }
            });
          }
        });
      } else {
        return res.status(404).json("Restaurante no encontrado");
      }
    }
  });
};

// Update restaurant by ID
const updateRestaurant = (req, res) => {
  const { id } = req.params;
  const { name, description, banner, pictures, menu, type, address, capacity, ageRestricted } = req.body;

  // Create an array to hold the SQL SET clauses and the corresponding values
  const fieldsToUpdate = [];
  const values = [];

  if (name) {
    fieldsToUpdate.push("name = ?");
    values.push(name);
  }
  if (description) {
    fieldsToUpdate.push("description = ?");
    values.push(description);
  }
  if (banner) {
    fieldsToUpdate.push("banner = ?");
    values.push(banner);
  }
  if (pictures) {
    fieldsToUpdate.push("pictures = ?");
    values.push(JSON.stringify(pictures));
  }
  if (menu) {
    fieldsToUpdate.push("menu = ?");
    values.push(JSON.stringify(menu));
  }
  if (type) {
    fieldsToUpdate.push("type = ?");
    values.push(type);
  }
  if (address) {
    fieldsToUpdate.push("address = ?");
    values.push(address);
  }
  if (capacity) {
    fieldsToUpdate.push("capacity = ?");
    values.push(JSON.stringify(capacity));
  }
  if (ageRestricted !== undefined) {
    fieldsToUpdate.push("age_restricted = ?");
    values.push(ageRestricted);
  }

  // Check if there are fields to update
  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  // Add the updated_at field
  fieldsToUpdate.push("updated_at = CURRENT_TIMESTAMP");

  // Add the ID to the values array
  values.push(id);

  // Construct the SQL query
  const sql = `
    UPDATE restaurant SET
      ${fieldsToUpdate.join(", ")}
    WHERE id = ? AND deleted_at IS NULL
  `;

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error updating restaurant:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: "Restaurante actualizado exitosamente" });
      } else {
        return res.status(404).json("Restaurante no encontrado o ya eliminado");
      }
    }
  });
}

// Soft delete restaurant by ID
const deleteRestaurant = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE restaurant SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL";
  
  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      if (result.affectedRows > 0) {
        return res.status(200).json("Restaurante eliminado exitosamente");
      } else {
        return res.status(404).json("Restaurante no encontrado o ya eliminado");
      }
    }
  });
}

module.exports = { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
