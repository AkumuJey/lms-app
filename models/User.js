const connection = require("./connection");

const User = {
  tableName: "users",
  userCourseTable: "user_courses",
  createUser: function (newUser, callback) {
    connection.query(
      "INSERT INTO " + this.tableName + " SET ?",
      newUser,
      callback
    );
  },
  getUserByEmail: function (email, callback) {
    connection.query(
      "SELECT * FROM " + this.tableName + " WHERE email = ?",
      email,
      callback
    );
  },
  getUserByUsername: function (username, callback) {
    connection.query(
      "SELECT * FROM " + this.tableName + " WHERE username = ?",
      username,
      callback
    );
  },
  addUserCourse: function (userId, courseIds, callback) {
    const newUserCourses = courseIds.map((courseId) => ({ userId, courseId }));
    connection.query(
      `INSERT INTO ${this.userCourseTable} SET ?`,
      newUserCourses,
      callback
    );
  },
};

module.exports = User;
