const users = require("./userSeeder");
const restaurants = require("./restaurantSeeder");
const reviews = require("./reviewSeeder");

const mysql = require("mysql");
const bcrypt = require('bcrypt');

async function seedDatabase() {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curd",
  });

  await db.connect();

  // Insertar usuarios
  for (const user of users) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const sql = `INSERT INTO User (id, name, last_name, email, phone_number, identification, birth_date, password, profile_picture, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        user.id,
        user.name,
        user.last_name,
        user.email,
        user.phone_number,
        user.identification,
        user.birth_date,
        hashedPassword,  // Almacenamos la contraseña hasheada
        user.profile_picture,
        user.address,
      ],
      (error) => {
        if (error) {
          console.log("Error inserting user:", error);
        }
      }
    );
  }
  console.log("Users inserted");

  // Insertar restaurantes
  for (const restaurant of restaurants) {
    const sql = `INSERT INTO Restaurant (id, user_id, name, description, banner, pictures, menu, type, address, rating, capacity, age_restricted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        restaurant.id,
        restaurant.user_id,
        restaurant.name,
        restaurant.description,
        restaurant.banner,
        restaurant.pictures,
        restaurant.menu,
        restaurant.type,
        restaurant.address,
        restaurant.rating,
        restaurant.capacity,
        restaurant.age_restricted,
      ],
      (error) => {
        if (error) {
          console.log("Error inserting restaurant:", error);
        }
      }
    );
  }
  console.log("Restaurants inserted");

  // Insertar reseñas
  for (const review of reviews) {
    const sql = `INSERT INTO Review (id, user_id, restaurant_id, rating, title, description) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        review.id,
        review.user_id,
        review.restaurant_id,
        review.rating,
        review.title,
        review.description,
      ],
      (error) => {
        if (error) {
          console.log("Error inserting review:", error);
        }
      }
    );
  }
  console.log("Reviews inserted");

  db.end(() => {
    console.log("Database connection closed.");
    process.exit(); // Terminate Node.js process
  });
}

seedDatabase();
