require("module-alias/register");
const express = require("express");
const db = require("./web/index");
const cors = require("cors");
const v1 = require("./web/modules/v1/router");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  preflightContinue: false,
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  if (connection) connection.release();
  console.log("Connected to MySQL...");
});

app.use("/v1", v1);

app.listen(8081, () => {
  console.log("Server running on port 8081...");
});
