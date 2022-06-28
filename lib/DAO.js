const mysql = require("mysql2");
const cTable = require("console.table");

class DAO {
  // Connect to database
  constructor() {
    this.db = mysql.createConnection(
      {
        host: "localhost",
        user: "root",
        password: "MySQL834",
        database: "company_db",
      }
      //console.log(`Connected to the company_db database.`)
    );
  }

  // viewAllDepartments() {
  //   console.log("viewAllDept called");
  //   this.db.query("SELECT * FROM department", function (err, results) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (results) {
  //       console.table(results);
  //     }
  //     return results;
  //   });
  // }

  // viewAllDepartments_inquirer() {
  //   console.log("viewAllDepartments_inquirer called");

  //   this.db.query("SELECT * FROM department", function (err, results) {
  //     const list = results.map((dbRec) => ({
  //       name: dbRec.name,
  //       value: `${dbRec.id}`,
  //     }));

  //     console.log("inquirer_list", list);

  //     return list;
  //   });
  // }

  viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
      this.db.query(
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
      this.db.query(
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
      this.db.query(
        "SELECT A.id, A.first_name, A.last_name, B.title, D.name department, B.salary, IFNULL(CONCAT(C.first_name, ' ', C.last_name), '-') manager FROM employee A join role B on A.role_id = B.id join department D on B.department_id = D.id left join employee C on A.manager_id = C.id",
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
    this.db.query(
      "INSERT INTO department (name) VALUES (?)",
      department_name,
      function (err, results) {
        if (err) throw err;
        //console.log("Number of records inserted: " + results.affectedRows);

        return results.affectedRows;
      }
    );
  }

  addRole(title, salary, department) {
    return this.db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department],
      function (err, results) {
        if (err) throw err;
        //console.log("Number of records inserted: " + results.affectedRows);

        return results.affectedRows;
      }
    );
  }

  addEmployee(first_name, last_name, role, manager) {
    return this.db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role, manager],
      function (err, results) {
        if (err) throw err;
        //console.log("Number of records inserted: " + results.affectedRows);

        return results.affectedRows;
      }
    );
  }

  updateEmployee(id, role) {
    return this.db.query(
      "UPDATE employee SET role = ? where id = ?",
      [role, id],
      function (err, results) {
        if (err) throw err;
        console.log("Number of records updated: " + results.affectedRows);

        return results.affectedRows;
      }
    );
  }
}

module.exports = DAO;
