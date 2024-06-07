// Initiate the migration process by dropping all tables and creating them again.
// ! This will delete all the data in the database.
// ! Run this file to reset the database to the initial state.

const mysql = require("mysql");
const queries = require("./schema/rawTableCreationSql");

function manageMigration() {
  const tableList = ["user", "restaurant", "review", "booking", "schedule"];

  console.log("table list: ",tableList)

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curd",
  });

  tableList.reverse().map(table => {
    db.query("DROP TABLE IF EXISTS " + table, (error) => {
      if (error) {
        console.log("Error dropping table:", error);
      }
    });
  });
  console.log("Se eliminaron todas las tablas.");


  tableList.reverse().map(table => {
    db.query(queries[table], (error) => {
      if (error) {
        console.log("Error creating table:", error);
      } else {
        console.log("Tabla creada exitosamente:", table);
      }
    });
  });

  db.end(() => {
    console.log("Database connection closed.");
    process.exit(); // Terminate Node.js process
  });
}

manageMigration();
