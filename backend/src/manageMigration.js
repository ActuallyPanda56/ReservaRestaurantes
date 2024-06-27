const dotenv = require("dotenv");
const mysql = require("mysql2");
const queries = require("./schema/rawTableCreationSql");

function manageMigration() {
  dotenv.config();
  const tableList = ["user", "restaurant", "review", "booking", "schedule"];

  console.log("Table list:", tableList);

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  db.query("CREATE DATABASE IF NOT EXISTS curd", (error) => {
    if (error) {
      return console.log("Error creating database:", error);
    }
    console.log("Database 'curd' checked/created successfully.");

    db.changeUser({ database: "curd" }, (err) => {
      if (err) {
        console.log("Error switching database:", err);
        return;
      }

      tableList.reverse().forEach(table => {
        db.query("DROP TABLE IF EXISTS " + table, (error) => {
          if (error) {
            return console.log("Error dropping table:", error);
          }
          console.log("Table dropped successfully:", table);
        });
      });

      console.log("All tables dropped.");

      tableList.reverse().forEach(table => {
        db.query(queries[table], (error) => {
          if (error) {
            console.log("Error creating table:", error);
          } else {
            console.log("Table created successfully:", table);
          }
        });
      });

      db.end(() => {
        console.log("Database connection closed.");
        process.exit(); // Terminate Node.js process
      });
    });
  });
}

manageMigration();
