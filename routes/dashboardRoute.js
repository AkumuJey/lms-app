const express = require("express");

const dashboardRoute = express.Router();

dashboardRoute.get("/", (req, res) => {
  // Assuming you have middleware to handle user authentication and store user information in req.user
  res.sendFile("D:\\HTML\\lmls app\\dashboard.html");
});

module.exports = dashboardRoute;
