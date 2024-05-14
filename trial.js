// server.js
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const app = express();
const cors = require("cors");
app.use(cors());
// Configure session middleware
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Create MySQL connection
const connection = require("./models/connection");

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Serve static files from the default directory
app.use(express.static(__dirname));

// Set up middleware to parse incoming JSON data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/trial", (req, res) => {
  try {
    // Simulate some logic
    const message = "Hello world";
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error in /trial route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a User representation for clarity
const User = require("./models/User");

const Courses = {
  tableName: "courses",
  getCourses: function (callback) {
    connection.query(`SELECT * FROM ${this.tableName}`, callback);
  },
};

// Registration route
const registrationValidator = require("./utils/registrationValidator");
app.post("/register", [...registrationValidator], async (req, res) => {
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

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
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

app.get("/courses", async (req, res) => {
  Courses.getCourses((err, rows, fieldData) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
      return;
    }
    res.status(200).json({ data: rows });
  });
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logout successful");
});

//Dashboard route
app.get("/dashboard", (req, res) => {
  // Assuming you have middleware to handle user authentication and store user information in req.user
  const userFullName = req.user.full_name;
  res.render("dashboard", { fullName: userFullName });
});

// Route to retrieve course content
app.get("/course/:id", (req, res) => {
  const courseId = req.params.id;
  const sql = "SELECT * FROM courses WHERE id = ?";
  connection.query(sql, [courseId], (err, result) => {
    if (err) {
      throw err;
    }
    // Send course content as JSON response
    res.json(result);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
