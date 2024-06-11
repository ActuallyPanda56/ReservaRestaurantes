const db = require("@web/index.js");

//  Login function
const login = (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ? AND password = ?";

  db.query(sql, [req.body.email, req.body.password], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      if (data.length > 0) {
        return res.json("Usuario reconocido");
      } else {
        return res.json("Usuario no reconocido");
      }
    }
  });
}

const register = (req, res) => {
  const sql = "INSERT INTO user (name, last_name, email, password) VALUES (?, ?, ?, ?)";

  db.query(sql, [req.body.name, req.body.last_name, req.body.email, req.body.password], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json("Internal Server Error");
    } else {
      console.log("Number of records inserted: " + result.affectedRows);
      return res.json("User registered successfully");
    }
  });
}

module.exports = {login, register}