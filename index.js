const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/htmltemplate.js");

const employees = [];

function init() {
  createTeam();
}

function createTeam() {
  inquirer
    .prompt([
      {
        message: "Add employee's name",
        name: "name",
      },
      {
        type: "list",
        message: "Choose employee's role",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
      {
        message: "Enter team member id",
        name: "id",
      },
      {
        message: "Add team member's email address",
        name: "email",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "Engineer") {
        roleInfo = "GitHub username";
      } else if (role === "Intern") {
        roleInfo = "school name";
      } else {
        roleInfo = "office number";
      }
      inquirer
        .prompt([
          {
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["yes", "no"],
            name: "addMore",
          },
        ])
        .then(function ({ roleInfo, addMore }) {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
          } else {
            newMember = new Manager(name, id, email, roleInfo);
          }
          employees.push(newMember);
          if (addMore === "yes") {
            createTeam();
          } else {
            createHTML();
          }
        });
    });
}

function createHTML() {
  fs.writeFileSync("./dist/team.html", generateTeam(employees), "UTF-8");
}

init();
