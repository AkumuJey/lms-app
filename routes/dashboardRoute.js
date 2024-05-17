const express = require("express");

const dashboardRoute = express.Router();

dashboardRoute.get("/", (req, res) => {
  // Assuming you have middleware to handle user authentication and store user information in req.user
  res.redirect("/dashboard.html");
});

dashboardRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.redirect(`/course_content.html?id=${id}`);
});

module.exports = dashboardRoute;
