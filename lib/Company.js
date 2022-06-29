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
    switch (initAnswer.todo) {
      case "view_all_departments":
        console.log("\n"); // line break for visual spacing
        console.table(await this.dao.viewAllDepartments());
        break;
      case "view_all_roles":
        console.log("\n"); // line break for visual spacing
        console.table(await this.dao.viewAllRoles());
        break;
      case "view_all_employees":
        console.log("\n"); // line break for visual spacing
        console.table(await this.dao.viewAllEmployees());
        break;
      case "add_department":
        const { department_name } = await this.ask(questions.add_department);

        this.dao.addDepartment(department_name);

        console.log(`Added ${department_name} department to the database`);
        break;
      case "view_dept_budget":
        console.log("\n"); // line break for visual spacing
        const all_depts = await this.dao.viewAllDepartments();

        questions.view_dept_budget.push({
          type: "list",
          name: "departmentId",
          message: "Select department name",
          choices: all_depts.map((dbRec) => ({
            name: dbRec.name,
            value: `${dbRec.id}`,
          })),
        });

        const { departmentId } = await this.ask(questions.view_dept_budget);

        const budget_results = await this.dao.viewDeptUtilizedBudget(
          departmentId
        );

        console.log(
          `Total utilized department budget is $${budget_results[0].budget}`
        );
        break;
      case "add_role":
        const all_depts1 = await this.dao.viewAllDepartments();

        questions.add_role.push({
          type: "list",
          name: "add_role_departmentId",
          message: "Select department name",
          choices: all_depts1.map((dbRec) => ({
            name: dbRec.name,
            value: `${dbRec.id}`,
          })),
        });

        const { title, salary, add_role_departmentId } = await this.ask(
          questions.add_role
        );

        this.dao.addRole(title, salary, add_role_departmentId);
        console.log(`Added ${title} role to the database`);
        break;
      case "add_employee":
        const roles = await this.dao.viewAllRoles();
        const managers = await this.dao.viewAllManagers(); //Assume Lead and Manager can play manager role

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
            ...[{ name: "None", value: -1 }],
            ...managers.map((dbRec) => ({
              name: dbRec.first_name + " " + dbRec.last_name,
              value: `${dbRec.id}`,
            })),
          ],
        });

        const { first_name, last_name, roleId, managerId } = await this.ask(
          questions.add_employee
        );

        this.dao.addEmployee(first_name, last_name, roleId, managerId);

        console.log(
          `Added ${first_name} ${last_name} as an employee to the database`
        );
        break;
      case "update_employee_role":
        const employees = await this.dao.viewAllEmployees();
        const roles1 = await this.dao.viewAllRoles();

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
          name: "update_employee_roleId",
          message: "Assign a role to employee",
          choices: roles1.map((dbRec) => ({
            name: dbRec.title,
            value: `${dbRec.id}`,
          })),
        });

        const { employeeId, update_employee_roleId } = await this.ask(
          questions.update_employee
        );

        this.dao.updateEmployeeRole(employeeId, update_employee_roleId);

        console.log(`Role of Employee ID# ${employeeId} updated`);
        break;
      case "update_employee_manager":
        const employees1 = await this.dao.viewAllEmployees();
        const managers1 = await this.dao.viewAllManagers(); //Assume Lead and Manager can play manager role

        questions.update_employee.push({
          type: "list",
          name: "employeeId",
          message: "Select am employee",
          choices: employees1.map((dbRec) => ({
            name: dbRec.first_name + " " + dbRec.last_name,
            value: `${dbRec.id}`,
          })),
        });

        questions.update_employee.push({
          type: "list",
          name: "managerId",
          message: "Assign a manager to employee",
          choices: [
            ...[{ name: "None", value: -1 }],
            ...managers1.map((dbRec) => ({
              name: dbRec.first_name + " " + dbRec.last_name,
              value: `${dbRec.id}`,
            })),
          ],
        });

        const answers = await this.ask(questions.update_employee);

        this.dao.updateEmployeeManager(answers.employeeId, answers.managerId);

        console.log(`Manager of Employee ID# ${answers.employeeId} updated`);
        break;
      case "exit":
        console.log("Application terminated by client. Buh-bye!");
        process.exit();
    }
  }
}

module.exports = Company;
