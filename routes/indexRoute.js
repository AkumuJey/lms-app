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

const authenticatedRoute = require("./authenticatedRoute");
const logoutRoute = require("./logoutRoute");
indexRoute.use("/logout", logoutRoute);

const dashboardRoute = require("./dashboardRoute");
indexRoute.use("/dashboard", authenticatedRoute, dashboardRoute);
const leaderboardRoute = require("./leaderboardRoute");
indexRoute.use("/leaderboard", leaderboardRoute);
const getFullname = require("../routes/get-fullname");
indexRoute.use("/get-fullname", authenticatedRoute, getFullname);

const practiceRoute = require("./practiceRoute");
indexRoute.use("/mine", practiceRoute);

module.exports = indexRoute;
