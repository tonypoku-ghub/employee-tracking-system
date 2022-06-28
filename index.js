const questions = require("./lib/questions");
const Company = require("./lib/Company");

async function init() {
  let company = new Company();

  do {
    const init_answers = await company.ask(questions.init);

    await company.process(init_answers);
  } while (true);
}

init();
