const express = require("express");

const indexRoute = express.Router();

indexRoute.get("/", (req, res) => {
  res.sendFile(__dirname + "../index.html");
});

const registerRoute = require("./registerRoute");
indexRoute.use("/register", registerRoute);

const loginRoute = require("./loginRoute");
indexRoute.use("/login", loginRoute);

const courseRoute = require("./coursesRoute");
indexRoute.use("/courses", courseRoute);

const logoutRoute = require("./logoutRoute");
indexRoute.use("/logout", logoutRoute);

const dashboardRoute = require("./dashboardRoute");
indexRoute.use("/dashboard", dashboardRoute);

const practiceRoute = require("./practiceRoute");

indexRoute.use("/mine", practiceRoute);

module.exports = indexRoute;
