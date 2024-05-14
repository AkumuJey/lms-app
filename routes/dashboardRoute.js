const express = require("express");

const dashboardRoute = express.Router();

dashboardRoute.get("/", (req, res) => {
  // Assuming you have middleware to handle user authentication and store user information in req.user
  const userFullName = req.user.full_name;
  res.render("dashboard", { fullName: userFullName });
});

module.exports = dashboardRoute;
