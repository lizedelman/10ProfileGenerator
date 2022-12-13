const inquirer = require("inquirer");
const fs = require("fs");
const 

const questions = [
  {
    type: "input",
    message: "What is your project name?",
    name: "title",
  },
  {
    type: "input",
    message: "Write a short description of the project.",
    name: "description",
  },
  {
    type: "input",
    message: "What would you like to include under the usage section?",
    name: "usage",
  },
  {
    type: "input",
    message: "What would you like to include under the installation section?",
    name: "installation",
  },
  {
    type: "input",
    message: "Would you like to include any credits?",
    name: "credits",
  },
  {
    type: "input",
    message: "What license would you like to use/list?",
    name: "license",
  },
];

function writeToFile(fileName, data) {
  return fs.writeFileSync(fileName, data);
}

function init() {
  inquirer
    .prompt(questions)

    .then((responses) =>
      writeToFile("./README1.md", generateMarkdown(responses))
    )
    .catch((err) => console.log("An error ocurred", err));
}

// Function call to initialize app
init();
