// server.js
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const { config } = require("dotenv");

config();
const app = express();
app.use(cors());
// Configure session middleware
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files from the default directory
app.use(express.static(__dirname));

// Set up middleware to parse incoming JSON data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = require("./models/connection");

// Define routes
const indexRoute = require("./routes/indexRoute");
app.use("/", indexRoute);

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  async function createTables() {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255)
      )
    `;
    const createCoursesTable = `CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
  )`;
    await connection.query(createUsersTable);
    await connection.query(createCoursesTable);
  }
  createTables();
  console.log("Connected to MySQL as id " + connection.threadId);
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
