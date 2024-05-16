const express = require("express");
const Courses = require("../models/Courses");
const courseRoute = express.Router();

courseRoute.get("/", async (req, res) => {
  Courses.getCourses((err, rows, fieldData) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
      return;
    }
    res.status(200).json({ data: rows });
  });
});

const authenticatedRoute = require("./authenticatedRoute");
const User = require("../models/User");
courseRoute.post("/", authenticatedRoute, (req, res) => {
  const { selectedCoursesIds } = req.body;
  const user = req.session.user;
  const { id } = req.session.user;
  console.log(req.session.user);
  User.addUserCourse(id, selectedCoursesIds, (error, results, fields) => {
    console.log(results[0]);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
    return res.status(201).json({ data: results[0] });
  });
});

courseRoute.get("/:id", authenticatedRoute, (req, res) => {
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

module.exports = courseRoute;
