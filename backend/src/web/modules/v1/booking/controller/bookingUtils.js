const db = require("@web/index.js");

// get bookings by user id
const getBookingsByUserId = (req, res) => {
    const { userId } = req.params;

    const sql = "SELECT * FROM booking WHERE user_id = ?";
    db.query(sql, [userId], (error, data) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).json({ message: 'Internal Server Error' });
        } else {
            return res.status(200).json({ bookings: data });
        }
    });
};

// get bookings by restaurant id
const getBookingsByRestaurantId = (req, res) => {
    const { restaurantId } = req.params;

    const sql = "SELECT * FROM booking WHERE restaurant_id = ?";
    db.query(sql, [restaurantId], (error, data) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).json({ message: 'Internal Server Error' });
        } else {
            return res.status(200).json({ bookings: data });
        }
    });
};

module.exports = { getBookingsByUserId, getBookingsByRestaurantId }