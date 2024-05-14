const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const registrationValidator = [
  // Validate email and username fields
  check("email").isEmail(),
  check("username")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"),

  // Custom validation to check if email and username are unique
  check("email").custom(async (value) => {
    const user = await User.getUserByEmail(value);
    if (user) {
      throw new Error("Email already exists");
    }
  }),
  check("username").custom(async (value) => {
    const user = await User.getUserByUsername(value);
    if (user) {
      throw new Error("Username already exists");
    }
  }),
];

module.exports = registrationValidator;
