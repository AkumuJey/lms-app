const express = require("express");
const Courses = require("../models/Courses");

const connection = require("../models/connection");
const courseRoute = express.Router();

courseRoute.get("/", async (req, res) => {
  const { id } = req.session.user;
  Courses.getCourses(id, (err, rows, fieldData) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err });
      return;
    }
    res.status(200).json({ data: rows });
  });
});

const User = require("../models/User");
courseRoute.post("/", (req, res) => {
  const { selectedCoursesIds } = req.body;
  const { id } = req.session.user;
  try {
    console.log(selectedCoursesIds);
    User.addUserCourse(id, selectedCoursesIds, (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
      }
      return res.status(201);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ failed });
  }
});
courseRoute.get("/user-courses", (req, res) => {
  const { id } = req.session.user;
  try {
    User.getUserCourses(id, (err, rows, fieldData) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ rows });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed" });
  }
});
courseRoute.get("/:id", (req, res) => {
  const courseId = req.params.id;
  const sql = "SELECT * FROM courses WHERE id = ?";
  connection.query(sql, [courseId], (err, result) => {
    if (err) {
      throw err;
    }
    // Send course content as JSON response
    res.json(result[0]);
  });
});

module.exports = courseRoute;
