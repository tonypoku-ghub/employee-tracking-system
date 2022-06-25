const mysql = require("mysql2");

class DAO {
  // Connect to database
  constructor() {
    this.db = mysql.createConnection(
      {
        host: "localhost",
        user: "root",
        password: "MySQL834",
        database: "company_db",
      },
      console.log(`Connected to the company_db database.`)
    );
  }

  viewAllDepartments() {
    return this.db.query("SELECT * FROM department", function (err, results) {
      console.log(results);
    });
  }

  viewAllRoles() {
    return this.db.query("SELECT * FROM role", function (err, results) {
      console.log(results);
    });
  }

  viewAllEmployees() {
    return this.db.query("SELECT * FROM employee", function (err, results) {
      console.log(results);
    });
  }

  addDepartment(department_name) {
    return this.db.query(
      "INSERT INTO department (name) VALUES (?)",
      department_name,
      function (err, results) {
        if (err) throw err;
        console.log("Number of records inserted: " + results.affectedRows);
      }
    );
  }

  addRole(title, salary, department) {
    return this.db.query(
      "INSERT INTO department (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department],
      function (err, results) {
        if (err) throw err;
        console.log("Number of records inserted: " + results.affectedRows);
      }
    );
  }
}

module.exports = DAO;
