const express = require("express");

const indexRoute = express.Router();

indexRoute.get("/", (req, res) => {
  res.sendFile(__dirname + "../index.html");
});

const registerRoute = require("./registerRoute");
indexRoute.post("/register", registerRoute);

const loginRoute = require("./loginRoute");
indexRoute.use("/login", loginRoute);

const courseRoute = require("./coursesRoute");
indexRoute.get("/courses", courseRoute);

const logoutRoute = require("./logoutRoute");
indexRoute.post("/logout", logoutRoute);

const dashboardRoute = require("./dashboardRoute");
indexRoute.get("/dashboard", dashboardRoute);

module.exports = indexRoute;
