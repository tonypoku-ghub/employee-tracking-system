const mysql = require("mysql2");
const inquirer = require("inquirer");
const questions = require("./lib/questions");
const Company = require("./lib/Company");

async function init() {
  let company = new Company();

  const init_answers = await company.ask(questions.init);
  console.log("init_answers", init_answers);

  company.process(init_answers);
}

init();

// // Connect to database
// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     // MySQL username,
//     user: "root",
//     // TODO: Add MySQL password
//     password: "MySQL834",
//     database: "books_db",
//   },
//   console.log(`Connected to the books_db database.`)
// );

// // Query database

// let deletedRow = 2;

// db.query(
//   `DELETE FROM favorite_books WHERE id = ?`,
//   deletedRow,
//   (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   }
// );

// // Query database
// db.query("SELECT * FROM favorite_books", function (err, results) {
//   console.log(results);
// });
