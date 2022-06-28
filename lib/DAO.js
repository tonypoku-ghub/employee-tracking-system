const mysql = require("mysql2");
const cTable = require("console.table");

class DAO {
  constructor() {
    this.conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "MySQL834",
      database: "company_db",
    });
  }

  viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
      this.conn.query(
        "SELECT * FROM department order by name",
        function (err, results) {
          if (err) {
            return reject(err);
          }

          resolve(results);
        }
      );
    });
  };

  viewAllRoles() {
    return new Promise((resolve, reject) => {
      this.conn.query(
        "SELECT A.id, A.title, B.name, A.salary FROM role A join department B on A.department_Id = B.id",
        function (err, results) {
          if (err) {
            return reject(err);
          }

          resolve(results);
        }
      );
    });
  }

  viewAllEmployees() {
    return new Promise((resolve, reject) => {
      this.conn.query(
        "SELECT A.id, A.first_name, A.last_name, B.title, D.name department, B.salary, IFNULL(CONCAT(C.first_name, ' ', C.last_name), '-') manager FROM employee A join role B on A.role_id = B.id join department D on B.department_id = D.id left join employee C on A.manager_id = C.id order by A.first_name, A.last_name",
        function (err, results) {
          if (err) {
            return reject(err);
          }

          resolve(results);
        }
      );
    });
  }

  addDepartment(department_name) {
    this.conn.query(
      "INSERT INTO department (name) VALUES (?)",
      department_name,
      function (err, results) {
        if (err) throw err;

        return results.affectedRows;
      }
    );
  }

  addRole(title, salary, department) {
    return this.conn.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department],
      function (err, results) {
        if (err) throw err;

        return results.affectedRows;
      }
    );
  }

  addEmployee(first_name, last_name, role, manager) {
    return this.conn.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role, manager],
      function (err, results) {
        if (err) throw err;

        return results.affectedRows;
      }
    );
  }

  updateEmployee(id, role) {
    return this.conn.query(
      "UPDATE employee SET role_id = ? where id = ?",
      [role, id],
      function (err, results) {
        if (err) throw err;

        return results.affectedRows;
      }
    );
  }
}

module.exports = DAO;
