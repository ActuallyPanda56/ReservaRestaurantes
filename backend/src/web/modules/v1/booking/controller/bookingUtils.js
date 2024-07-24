const db = require("@web/index.js");

// get bookings by user id
const getBookingsByUserId = (req, res) => {
  const { userId } = req.params;

  const sql = `
        SELECT b.*, r.name AS restaurant_name, r.address AS restaurant_address
        FROM booking b
        JOIN restaurant r ON b.restaurant_id = r.id
        WHERE b.user_id = ? AND b.deleted_at IS NULL`;

  db.query(sql, [userId], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      return res.status(200).json({ bookings: data });
    }
  });
};

// get bookings by restaurant id
const getBookingsByRestaurantId = (req, res) => {
  const { restaurantId } = req.params;

  const sql = `
        SELECT b.*, u.name AS user_name, u.email AS user_email
        FROM booking b
        JOIN user u ON b.user_id = u.id
        WHERE b.restaurant_id = ? AND b.deleted_at IS NULL`;

  db.query(sql, [restaurantId], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      return res.status(200).json({ bookings: data });
    }
  });
};

module.exports = { getBookingsByUserId, getBookingsByRestaurantId };
