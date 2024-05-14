const mysql = require("mysql");

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "LMS",
});

module.exports = connection;
