const express = require("express");

const dashboardRoute = express.Router();

dashboardRoute.get("/", (req, res) => {
  // Assuming you have middleware to handle user authentication and store user information in req.user
  const userFullName = req.session.user.full_name;
  // res.render("dashboard.html", { fullName: userFullName });
  console.log(__dirname);
  // res.json({ data: req.session.user, path: __dirname });
  res.sendFile("D:\\HTML\\lmls app\\dashboard.html");
});

module.exports = dashboardRoute;
