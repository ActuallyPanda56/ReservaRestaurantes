const db = require("@web/index.js");

// Function to get all users (excluding soft deleted ones)
const getUsers = (req, res) => {
  const sql = "SELECT * FROM User WHERE deleted_at IS NULL";

  db.query(sql, (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      return res.status(200).json(data);
    }
  });
};

// Function to get a user by ID (excluding soft deleted ones)
const getUserById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM User WHERE id = ? AND deleted_at IS NULL";

  db.query(sql, [id], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      if (data.length > 0) {
        return res.status(200).json(data[0]);
      } else {
        return res.status(404).json("User not found");
      }
    }
  });
};

// Function to soft delete a user by ID
const deleteUser = (req, res) => {
  const { id } = req.params;
  var email = "";

  const sql =
    "UPDATE User SET deleted_at = CURRENT_TIMESTAMP, email = ? WHERE id = ? AND deleted_at IS NULL";

  const sql2 = "SELECT 1 FROM User WHERE id = ? AND deleted_at IS NULL";

  db.query(sql2, [id], (error, data) => {
    if (error) {
      return res.status(500).json("Internal Server Error");
    } else {
      email = data[0].email;
    }
  });

  email = email + "deleted:" + id;

  db.query(sql, [email, id], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      if (data.affectedRows > 0) {
        return res.status(200).json("User deleted successfully");
      } else {
        return res.status(404).json("User not found or already deleted");
      }
    }
  });
};

// Function to update a user by ID
const updateUser = (req, res) => {
  const {id} = req.params;
  const { name, lastName, email, phoneNumber, profilePicture } = req.body;

  // Ensure the ID is provided
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Create an array to hold the SQL SET clauses and the corresponding values
  const fieldsToUpdate = [];
  const values = [];

  if (name) {
    fieldsToUpdate.push("name = ?");
    values.push(name);
  }
  if (lastName) {
    fieldsToUpdate.push("last_name = ?");
    values.push(lastName);
  }
  if (email) {
    fieldsToUpdate.push("email = ?");
    values.push(email);
  }
  if (phoneNumber) {
    fieldsToUpdate.push("phone_number = ?");
    values.push(phoneNumber);
  }
  if (profilePicture) {
    fieldsToUpdate.push("profile_picture = ?");
    values.push(profilePicture);
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
    UPDATE User SET
      ${fieldsToUpdate.join(", ")}
    WHERE id = ? AND deleted_at IS NULL
  `;

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Profile updated successfully" });
      } else {
        return res.status(404).json("User not found or already deleted");
      }
    }
  });
};

module.exports = { getUsers, getUserById, deleteUser, updateUser };
