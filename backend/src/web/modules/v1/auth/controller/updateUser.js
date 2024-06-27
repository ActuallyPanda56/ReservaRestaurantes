const db = require("@web/index.js");

const updateUser = (req, res) => {
  const { id, name, lastName, email, phoneNumber, profilePicture } = req.body;

  const sql = `
    UPDATE User SET
      name = ?,
      last_name = ?,
      email = ?,
      phone_number = ?,
      profile_picture = ?
    WHERE id = ?
  `;

  db.query(sql, [name, lastName, email, phoneNumber, profilePicture, id], (error, result) => {
    if (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      return res.status(200).json({ message: "Profile updated successfully" });
    }
  });
};

module.exports = { updateUser };
