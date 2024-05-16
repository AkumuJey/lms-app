const express = require("express");
const LeaderboardInfo = require("../models/LeaderboardInfo");
const leaderboardRoute = express.Router();

leaderboardRoute.get("/", (req, res) => {
  LeaderboardInfo.getData((err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ data: results });
  });
});
module.exports = leaderboardRoute;
