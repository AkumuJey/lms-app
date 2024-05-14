const connection = require("./connection");

const Courses = {
  tableName: "courses",
  getCourses: function (callback) {
    connection.query(`SELECT * FROM ${this.tableName}`, callback);
  },
};

module.exports = Courses;
