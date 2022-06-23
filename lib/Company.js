const inquirer = require("inquirer");

class Company {
  async ask(questions) {
    let answers = await inquirer.prompt(questions);
    return answers;
  }
}

module.exports = Company;
