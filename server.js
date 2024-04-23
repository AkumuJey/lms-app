const express = require("express");
const session = require("express-session");
const mysql = require( "mysql" );
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const cors = require("cors")

const app = express();
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "LMS",
});


// Serve static files from the default directory
app.use(express.static(__dirname));
app.use(cors)

// Set up middleware to parse incoming JSON data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post(
  "/register",
  [
    // Validate email and username fields
    check("email").isEmail(),
    check("username")
      .isAlphanumeric()
      .withMessage("Username must be alphanumeric"),

    // Custom validation to check if email and username are unique
    check("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
    }),
    check("username").custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Username already exists");
      }
    }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user object
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      full_name: req.body.full_name,
    });

    // Save the user to the database
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser); // Return the newly created user
    } catch (err) {
      res.status(500).json({ error: err.message }); // Handle database errors
    }
  }
);


const PORT = 3000

connection.connect((err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("MySQL Connected...");
    app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`))
  });
