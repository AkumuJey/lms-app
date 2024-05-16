const connection = require("./connection");

const LeaderboardInfo = {
  tableName: "leaderboard",
  getData: function (callback) {
    const query = `SELECT * FROM ${this.tableName}`;
    connection.query(query, callback);
  },
};

module.exports = LeaderboardInfo;
