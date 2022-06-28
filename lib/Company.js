const inquirer = require("inquirer");
const DAO = require("./DAO");
const questions = require("./questions");
const cTable = require("console.table");

class Company {
  constructor() {
    this.dao = new DAO();
  }

  async ask(questions) {
    const answers = await inquirer.prompt(questions);
    return answers;
  }

  async process(initAnswer) {
    if (initAnswer.todo === "view_all_departments") {
      const results = await this.dao.viewAllDepartments();
      console.table(results);
    } else if (initAnswer.todo === "view_all_roles") {
      const results = await this.dao.viewAllRoles();
      console.table(results);
    } else if (initAnswer.todo === "view_all_employees") {
      const results = await this.dao.viewAllEmployees();
      console.table(results);
    } else if (initAnswer.todo === "add_department") {
      const answers = await this.ask(questions.add_department);

      // console.log("answers", answers);
      const results = this.dao.addDepartment(answers.department_name);
      console.log(
        `Added ${answers.department_name} department to the database`
      );
    } else if (initAnswer.todo === "add_role") {
      const depts = await this.dao.viewAllDepartments();

      questions.add_role.push({
        type: "list",
        name: "departmentId",
        message: "Select department name",
        choices: depts.map((dbRec) => ({
          name: dbRec.name,
          value: `${dbRec.id}`,
        })),
      });

      const answers = await this.ask(questions.add_role);

      this.dao.addRole(answers.title, answers.salary, answers.departmentId);
      console.log(`Added ${answers.title} role to the database`);
    } else if (initAnswer.todo === "add_employee") {
      const roles = await this.dao.viewAllRoles();
      const managers = await this.dao.viewAllEmployees(); //Left this as a list of all employees because someone who was previously not a manager can be assigned as a manager

      questions.add_employee.push({
        type: "list",
        name: "roleId",
        message: "Select department name",
        choices: roles.map((dbRec) => ({
          name: dbRec.title,
          value: `${dbRec.id}`,
        })),
      });

      questions.add_employee.push({
        type: "list",
        name: "managerId",
        message: "Select manager name",
        choices: [
          ...[{ name: "None", value: "none" }],
          ...managers.map((dbRec) => ({
            name: dbRec.first_name + " " + dbRec.last_name,
            value: `${dbRec.id}`,
          })),
        ],
      });

      const answers = await this.ask(questions.add_employee);

      this.dao.addEmployee(
        answers.first_name,
        answers.last_name,
        answers.roleId,
        answers.managerId
      );

      console.log(
        `Added ${answers.first_name} ${answers.last_name} as an employee to the database`
      );
    } else if (initAnswer.todo === "update_employee") {
      const employees = await this.dao.viewAllEmployees();
      const roles = await this.dao.viewAllRoles();

      questions.update_employee.push({
        type: "list",
        name: "employeeId",
        message: "Select am employee",
        choices: employees.map((dbRec) => ({
          name: dbRec.first_name + " " + dbRec.last_name,
          value: `${dbRec.id}`,
        })),
      });

      questions.update_employee.push({
        type: "list",
        name: "roleId",
        message: "Assign a role to employee",
        choices: roles.map((dbRec) => ({
          name: dbRec.title,
          value: `${dbRec.id}`,
        })),
      });

      const answers = await this.ask(questions.update_employee);

      this.dao.updateEmployee(answers.employeeId, answers.roleId);

      console.log(`Employee ID# ${answers.employeeId} updated`);
    }
  }
}

module.exports = Company;
