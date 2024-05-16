const express = require("express");
const LeaderboardInfo = require("../models/LeaderboardInfo");
const leaderboardRoute = express.Router();

leaderboardRoute.get("/", (req, res) => {
  LeaderboardInfo.getData((err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (req.accepts("json")) {
      // Respond with JSON data
      res.status(200).json(results);
    } else {
      // Respond with HTML page
      res.render("leaderboard.html"); // Assuming you have a view engine set up
    }
  });
});
module.exports = leaderboardRoute;
