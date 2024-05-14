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

courseRoute.get("/:id", (req, res) => {
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
