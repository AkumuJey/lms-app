const express = require("express");
const bcrypt = require("bcryptjs");
const connection = require("../models/connection");
const Courses = require("../models/Courses");
const loginRoute = express.Router();

loginRoute.post("/", (req, res) => {
  const { username, password } = req.body;
  // Retrieve user from database
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        res.status(401).send("Invalid username or password");
      } else {
        const user = results[0];
        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            // Store user in session
            req.session.user = user;
            // res.send("Login successful");
            Courses.getCourses((err, rows, fieldData) => {
              if (err) {
                console.log(err);
                res.status(400).json({ err });
                return;
              }
              res.status(200).json({ message: "Login successful", data: rows });
            });
          } else {
            res.status(401).send("Invalid username or password");
          }
        });
      }
    }
  );
});

module.exports = loginRoute;
