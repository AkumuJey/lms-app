const express = require("express");
const practiceRoute = express.Router();

practiceRoute.get("/", (req, res) => {
  res.json({ name: "Akumu" });
});

module.exports = practiceRoute;
