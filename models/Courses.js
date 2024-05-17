const connection = require("./connection");

const Courses = {
  tableName: "courses",
  getCourses: function (userId, callback) {
    const query = `
    SELECT ${this.tableName}.id, name, description FROM ${this.tableName} LEFT JOIN user_courses ON ${this.tableName}.id <> user_courses.course_id WHERE user_courses.user_id = 1;
    `;
    connection.query(query, userId, callback);
  },
};

module.exports = Courses;
