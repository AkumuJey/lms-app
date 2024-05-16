const express = require("express");

const getFullname = express.Router();

getFullname.get("/", (req, res) => {
  const fullName = req.session.user.full_name;
  res.json({
    fullName,
  });
});
module.exports = getFullname;
