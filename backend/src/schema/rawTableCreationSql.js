// User table schema
const user = `CREATE TABLE User (
  id VARCHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone_number VARCHAR(255) NOT NULL,
  identification VARCHAR(255),
  birth_date DATE,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(1048575),
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);`;

// Restaurant table schema
const restaurant = `CREATE TABLE Restaurant (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(4096),
  short_description VARCHAR(255),
  banner VARCHAR(1048575),
  pictures JSON,
  menu_picture VARCHAR(1048575),
  menu_info JSON,
  type VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_number JSON,
  rating INT(11),
  capacity JSON NOT NULL,
  age_restricted BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
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
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
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
};
