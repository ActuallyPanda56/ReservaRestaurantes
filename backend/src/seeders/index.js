const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const users = require('./userSeeder');
const restaurants = require('./restaurantSeeder');
const reviews = require('./reviewSeeder');
const bookings = require('./bookingSeeder');
const schedules = require('./scheduleSeeder');

async function seedDatabase() {
  console.log("Connecting to database...");
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curd",
  });

  console.log("Database connected");
  console.log("Inserting data...");

  // Insert users
  for (const user of users) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const sql = `INSERT INTO User (id, name, last_name, email, phone_number, identification, birth_date, password, profile_picture, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.query(
      sql,
      [
        user.id,
        user.name,
        user.last_name,
        user.email,
        user.phone_number,
        user.identification,
        user.birth_date,
        hashedPassword,
        user.profile_picture,
        user.address,
      ]
    );
  }
  console.log("Users inserted");

  // Populate user_ids in restaurants
  const [userIds] = await db.query(`SELECT id FROM User`);
  restaurants.forEach((restaurant, index) => {
    restaurant.user_id = userIds[index % userIds.length].id;
  });

  // Insert restaurants
  for (const restaurant of restaurants) {
    const sql = `INSERT INTO Restaurant (id, user_id, name, description, short_description, banner, pictures, menu_picture, menu_info, type, address, phone_number, rating, capacity, age_restricted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.query(
      sql,
      [
        restaurant.id,
        restaurant.user_id,
        restaurant.name,
        restaurant.description,
        restaurant.short_description,
        restaurant.banner,
        restaurant.pictures,
        restaurant.menu_picture,
        restaurant.menu_info,
        restaurant.type,
        restaurant.address,
        restaurant.phone_number,
        restaurant.rating,
        restaurant.capacity,
        restaurant.age_restricted,
      ]
    );
  }
  console.log("Restaurants inserted");

  // Populate user_ids and restaurant_ids in reviews
  const [restaurantIds] = await db.query(`SELECT id FROM Restaurant`);
  reviews.forEach((review, index) => {
    review.user_id = userIds[index % userIds.length].id;
    review.restaurant_id = restaurantIds[index % restaurantIds.length].id;
  });

  // Insert reviews
  for (const review of reviews) {
    const sql = `INSERT INTO Review (id, user_id, restaurant_id, rating, title, description) VALUES (?, ?, ?, ?, ?, ?)`;
    await db.query(
      sql,
      [
        review.id,
        review.user_id,
        review.restaurant_id,
        review.rating,
        review.title,
        review.description,
      ]
    );
  }
  console.log("Reviews inserted");

  // Populate user_ids and restaurant_ids in bookings
  bookings.forEach((booking, index) => {
    booking.user_id = userIds[index % userIds.length].id;
    booking.restaurant_id = restaurantIds[index % restaurantIds.length].id;
  });

  // Insert bookings
  for (const booking of bookings) {
    const sql = `INSERT INTO Booking (id, user_id, restaurant_id, bearer_name, status, adults, children, price, date, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.query(
      sql,
      [
        booking.id,
        booking.user_id,
        booking.restaurant_id,
        booking.bearer_name,
        booking.status,
        booking.adults,
        booking.children,
        booking.price,
        booking.date,
        booking.start_time,
        booking.end_time,
      ]
    );
  }
  console.log("Bookings inserted");

  // Populate restaurant_ids in schedules
  schedules.forEach((schedule, index) => {
    schedule.restaurant_id = restaurantIds[index % restaurantIds.length].id;
  });

  // Insert schedules
  for (const schedule of schedules) {
    const sql = `INSERT INTO Schedule (id, restaurant_id, day, start_time, end_time) VALUES (?, ?, ?, ?, ?)`;
    await db.query(
      sql,
      [
        schedule.id,
        schedule.restaurant_id,
        schedule.day,
        schedule.start_time,
        schedule.end_time,
      ]
    );
  }
  console.log("Schedules inserted");

  await db.end();
  console.log("Database connection closed.");
  process.exit();
}

seedDatabase();
