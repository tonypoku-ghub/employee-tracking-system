const inquirer = require("inquirer");

class Company {
  async ask(questions) {
    let answers = await inquirer.prompt(questions);
    return answers;
  }

  process(initAnswer) {
    if (initAnswer.todo === "view_all_departments") {
      console.log(`${initAnswer.todo} called`);
    }
  }
}

module.exports = Company;
