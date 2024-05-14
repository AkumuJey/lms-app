const { validationResult } = require("express-validator");
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const registrationValidator = require("../utils/registrationValidator");
const registerRoute = express.Router();

registerRoute.post("/", [...registrationValidator], async (req, res) => {
  console.log(req);
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  // Create a new user object
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    full_name: req.body.full_name,
  };

  console.log(newUser);
  // Insert user into MySQL
  User.createUser(newUser, (error, results, fields) => {
    if (error) {
      console.error("Error inserting user: " + error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log("Inserted a new user with id " + results.insertId);
    res.status(201).json(newUser);
  });
});

registerRoute.get("/", (req, res) => {
  res.send("Hello World");
});
module.exports = registerRoute;
