const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "curd",
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  if (connection) connection.release();
  console.log("Connected to MySQL...");
});

app.post("/login", (req, res) => {
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
});

app.listen(8081, () => {
  console.log("Server running on port 8081...");
  console.log("holi");
});
