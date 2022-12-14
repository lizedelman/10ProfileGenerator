const inquirer = require("inquirer");
const fs = require("fs");
const { resolve } = require("path");

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
        choices: ["engineer", "intern", "manager"],
        name: "role",
      },
      {
        message: "enter team member id",
        name: "id",
      },
      {
        message: "Add team member's email address",
        name: "email",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "engineer") {
        roleInfo = "github username";
      } else if (role === "intern") {
        roleInfo = "school name";
      } else {
        roleInfo = "Office number";
      }
      inquirer
        .prompt([
          {
            message: `enter team member's ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "would you like to add more team members?",
            choices: ["yes", "no"],
            name: "moremembers",
          },
        ])

        .then(function ({ roleInfo, moreMembers }) {
          let newMember;
          if (role === "engineer") {
            newMember = new engineer(name, id, email, roleInfo);
          } else if (role === "intern") {
            newMember = new intern(name, id, email, roleInfo);
          } else {
            newMember = new manager(name, id, email, roleInfo);
          }
          employees.push(newMember);
          addHtml(newMember).then(function () {
            if (moreMembers === "yes") {
              addMember();
            } else {
              finishHtml();
            }
          });
        });
    });
}

init();
