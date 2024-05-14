const express = require("express");

const logoutRoute = express.Router();
logoutRoute.post("/", (req, res) => {
  req.session.destroy();
  res.send("Logout successful");
});

module.exports = logoutRoute;
