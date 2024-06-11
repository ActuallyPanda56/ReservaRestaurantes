// User table schema
const user = `CREATE TABLE User (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  identification VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255),
  address VARCHAR(255) NOT NULL
);`;

// Restaurant table schema
const restaurant = `CREATE TABLE Restaurant (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  banner VARCHAR(255),
  pictures JSON,
  menu JSON,
  type VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  rating INT(11),
  capacity INT(11) NOT NULL,
  age_restricted BOOLEAN NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id)
);`

// Review table schema
const review = `CREATE TABLE Review (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  restaurant_id VARCHAR(36) NOT NULL,
  rating INT(11) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id)
);`

// Booking table schema
const booking = `CREATE TABLE Booking (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  restaurant_id VARCHAR(36) NOT NULL,
  status VARCHAR(255) NOT NULL,
  adults INT(11) NOT NULL,
  children INT(11) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id)
);`

// Schedule table schema
const schedule = `CREATE TABLE Schedule (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  restaurant_id VARCHAR(36) NOT NULL,
  day VARCHAR(255) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id)
);`

module.exports = {
  user,
  restaurant,
  review,
  booking,
  schedule
}