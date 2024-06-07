const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

try {
  app.use(cors());

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curd",
  });

  app.post("/login", (req, res) => {
    const sql = "select * from user where usercol = ? AND  password = ?";

    db.query(sql, [req.body.usercol, req.body.password], (error, data) => {
      if (error) {
        return res.json(error);
      }
      if (data.length > 0) {
        return res.json("Usuario reconocido");
      } else {
        return res.json("Usuario no reconocido");
      }
    });
  });

  app.post("/record", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.json({ error: "Passwords do not match" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const sql = "INSERT INTO record (username, email, password) VALUES (?, ?, ?)";
  
    db.query(sql, [username, email, hashedPassword], (error, result) => {
      if (error) {
        return res.json(error);
      }
      if (result.length > 0) {
        return res.json("User registered successfully");
      } else {
        return res.json("User registered error");
      }
    });
  });
} catch (error) {}

app.listen(8081, () => {
  console.log("Conectado MYSQL...");
  console.log("Conectado DBA...");
});
