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
      },
      console.log(`Connected to the company_db database.`)
    );
  }

  viewAllDepartments() {
    console.log("viewAllDept called");
    this.db.query("SELECT * FROM department", function (err, results) {
      if (err) {
        console.log(err);
      }
      if (results) {
        console.table(results);
      }
      return results;
    });
  }

  viewAllDepartments_inquirer() {
    console.log("viewAllDepartments_inquirer called");

    this.db.query("SELECT * FROM department", function (err, results) {
      const list = results.map((dbRec) => ({
        name: dbRec.name,
        value: `${dbRec.id}`,
      }));

      console.log("inquirer_list", list);

      return list;
    });
  }

  viewAllDepartments_inquirer_sync = () => {
    console.log("viewAllDepartments_inquirer_sync called");

    this.db.query("SELECT * FROM department", function (err, results) {
      console.log("results", results);

      const list = results.map((dbRec) => ({
        name: dbRec.name,
        value: `${dbRec.id}`,
      }));

      console.log("inquirer_list", list);

      return list;
    });
  };

  viewAllRoles() {
    this.db.query(
      "SELECT A.id, A.title, A.salary, B.name FROM role A join department B on A.department_Id = B.id",
      function (err, results) {
        if (err) {
          console.log(err);
        }
        if (results) {
          console.table(results);
        }

        return results;
      }
    );
  }

  viewAllEmployees() {
    return this.db.query(
      "SELECT A.id, A.first_name, A.last_name, B.title, IFNULL(CONCAT(C.first_name, ' ', C.last_name), '-') manager FROM employee A join role B on A.role_id = B.id join department D on B.department_id = D.id left join employee C on A.manager_id = C.id",
      function (err, results) {
        if (err) {
          console.log(err);
        }
        if (results) {
          console.table(results);
        }

        return results;
      }
    );
  }

  addDepartment(department_name) {
    this.db.query(
      "INSERT INTO department (name) VALUES (?)",
      department_name,
      function (err, results) {
        if (err) throw err;
        console.log("Number of records inserted: " + results.affectedRows);

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
        console.log("Number of records inserted: " + results.affectedRows);

        return results.affectedRows;
      }
    );
  }
}

module.exports = DAO;
