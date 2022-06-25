const inquirer = require("inquirer");
const DAO = require("./DAO");
const questions = require("./questions");

class Company {
  constructor() {
    this.dao = new DAO();
  }

  async ask(questions) {
    let answers = await inquirer.prompt(questions);
    return answers;
  }

  async process(initAnswer) {
    if (initAnswer.todo === "view_all_departments") {
      this.dao.viewAllDepartments();
    } else if (initAnswer.todo === "view_all_roles") {
      this.dao.viewAllRoles();
    } else if (initAnswer.todo === "view_all_employees") {
      this.dao.viewAllEmployees();
    } else if (initAnswer.todo === "add_department") {
      const answers = await this.ask(questions.add_department);
      console.log("answers", answers);
      this.dao.addDepartment(answers.department_name);
    } else if (initAnswer.todo === "add_role") {
      // const answers = await this.ask(questions.add_role);
      // console.log("answers", answers);
      // this.dao.addRole(answers.title, answers.salary, answers.departmentId);
    } else if (initAnswer.todo === "view_aladd_employeel_roles") {
      console.log(`${initAnswer.todo} called`);
    } else if (initAnswer.todo === "update_employee") {
      console.log(`${initAnswer.todo} called`);
    }
  }
}

module.exports = Company;
