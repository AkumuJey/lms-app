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
    courseIds.forEach((courseId) => {
      const query = "INSERT INTO ?? (user_id, course_id) VALUES (?, ?)";
      const values = [this.userCourseTable, userId, courseId];
      connection.query(query, values, callback);
    });
  },
  getUserCourses: function (userId, callback) {
    const query = `
    SELECT courses.id, name, description FROM courses INNER JOIN ${this.userCourseTable} ON courses.id = ${this.userCourseTable}.course_id WHERE ${this.userCourseTable}.user_id = ?
    `;
    connection.query(query, [userId], callback);
  },
};

module.exports = User;
