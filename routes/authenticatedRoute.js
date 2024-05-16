const express = require("express");

const authenticatedRoute = express.Router();

authenticatedRoute.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
});

module.exports = authenticatedRoute;
