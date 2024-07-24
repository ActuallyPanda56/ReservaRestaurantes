const db = require("@web/index.js");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs

// Create booking
const createBooking = (req, res) => {
  const {
    userId,
    restaurantId,
    adults,
    children,
    date,
    startTime,
    endTime,
    bearerName,
  } = req.body;
  const price = 0; // Price is not implemented in this example

  // Check if all required fields are provided
  if (
    !userId ||
    !restaurantId ||
    !adults ||
    children == undefined ||
    children == null ||
    !date ||
    !startTime ||
    !endTime ||
    !bearerName
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const id = uuidv4(); // Generate unique booking ID

  // Check if restaurant has enough capacity
  const restaurantSql = "SELECT capacity FROM restaurant WHERE id = ?";
  db.query(restaurantSql, [restaurantId], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      if (data.length > 0) {
        const capacity = JSON.parse(data[0].capacity);
        const totalPeople = adults + children;

        let smallestTableCapacity = Infinity;
        let selectedTableIndex = -1;

        // Find the smallest table that can accommodate the total number of people
        for (let i = 0; i < capacity.length; i++) {
          if (
            capacity[i].tableCapacity >= totalPeople &&
            capacity[i].tableCount > 0
          ) {
            if (capacity[i].tableCapacity < smallestTableCapacity) {
              smallestTableCapacity = capacity[i].tableCapacity;
              selectedTableIndex = i;
            }
          }
        }

        if (selectedTableIndex === -1) {
          return res
            .status(406)
            .json({ message: "Not enough capacity available" });
        }

        // Subtract one from the table count of the selected table
        capacity[selectedTableIndex].tableCount -= 1;

        // Update restaurant capacity
        const updateCapacitySql =
          "UPDATE restaurant SET capacity = ? WHERE id = ?";
        db.query(
          updateCapacitySql,
          [JSON.stringify(capacity), restaurantId],
          (updateError) => {
            if (updateError) {
              console.error("Error executing update query:", updateError);
              return res.status(500).json({ message: "Internal Server Error" });
            }

            // Insert booking into database
            const sql =
              "INSERT INTO booking (id, user_id, restaurant_id, status, adults, children, price, date, start_time, end_time, bearer_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            db.query(
              sql,
              [
                id,
                userId,
                restaurantId,
                "pendiente",
                adults,
                children,
                price,
                date,
                startTime,
                endTime,
                bearerName,
              ],
              (error, result) => {
                if (error) {
                  console.error("Error executing query:", error);
                  return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
                } else {
                  console.log(
                    "Number of records inserted: " + result.affectedRows
                  );
                  return res.json({ message: "Booking created successfully" });
                }
              }
            );
          }
        );
      } else {
        return res.status(404).json({ message: "Restaurant not found" });
      }
    }
  });
};

// Get all bookings (excluding soft deleted ones)
const getBookings = (req, res) => {
  const sql = "SELECT * FROM booking WHERE deleted_at IS NULL";

  db.query(sql, (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      return res.status(200).json(data);
    }
  });
};

// Get booking by ID (excluding soft deleted ones)
const getBookingById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM booking WHERE id = ? AND deleted_at IS NULL";

  db.query(sql, [id], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      if (data.length > 0) {
        return res.status(200).json(data[0]);
      } else {
        return res.status(404).json("Booking not found");
      }
    }
  });
};

// Update booking by ID
const updateBooking = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Create an array to hold the SQL SET clauses and the corresponding values
  const fieldsToUpdate = [];
  const values = [];

  if (status) {
    fieldsToUpdate.push("status = ?");
    values.push(status);
  }

  // Add the updated_at field to the fieldsToUpdate array
  fieldsToUpdate.push("updated_at = CURRENT_TIMESTAMP");

  // Add the ID of the booking to the values array
  values.push(id);

  // Update the booking in the database
  const sql = `UPDATE booking SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Number of records updated: " + result.affectedRows);

      return res.json({ message: "Booking updated successfully" });
    }
  });
};

// Soft delete booking by ID
const deleteBooking = (req, res) => {
  const { id } = req.params;

  // Soft delete the booking
  const sql = "UPDATE booking SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Number of records deleted: " + result.affectedRows);

      return res.json({ message: "Booking deleted successfully" });
    }
  });
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
