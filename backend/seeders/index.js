const users = require("./userSeeder");
const restaurants = require("./restaurantSeeder");
const reviews = require("./reviewSeeder");

const mysql = require("mysql");

function seedDatabase() {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curd",
  });

/*   // Extract all user IDs from the reviews
  const reviewUserIds = reviews.map((review) => review.user_id);

  // Extract all user IDs from the users
  const userIds = users.map((user) => user.id);

  // Extract all restaurant IDs from the reviews
  const reviewRestaurantIds = reviews.map((review) => review.restaurant_id);

  // Extract all restaurant IDs from the restaurants
  const restaurantIds = restaurants.map((restaurant) => restaurant.id);

  // Find user IDs in reviews that don't exist in users
  const nonExistentUserIds = reviewUserIds.filter(
    (userId) => !userIds.includes(userId)
  );

  if (nonExistentUserIds.length > 0) {
    console.log("Non-existent user IDs:", nonExistentUserIds);
    process.exit();
  } */

  users.map((user) => {
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
        user.password,
        user.profile_picture,
        user.address,
      ],
      (error) => {
        if (error) {
          console.log("Error inserting user:", error);
        }
      }
    );
  });
  console.log("Users inserted");

  restaurants.map((restaurant) => {
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
  });
  console.log("Restaurants inserted");

  reviews.map((review) => {
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
  });
  console.log("Reviews inserted");

  db.end(() => {
    console.log("Database connection closed.");
    process.exit(); // Terminate Node.js process
  });
}

seedDatabase();
