const generateHTML = require('./src/generateHTML');

const inquirer = require("inquirer");
const fs = require("fs");

const teamMembers = [];

const addManager = () => {
    return inquirer.prompt ([
       {
        type: 'input',
        name: 'name',
        message: 'Add manager name.',
       }
        {
        type: 'input',
        name: 'id',
        message: 'Add manager\'s ID.',
       }
         {
        type: 'input',
        name: 'email',
        message: 'Add manager\'s email.',
       }
         {
        type: 'input',
        name: 'officeNum',
        message: 'Add manager\'s office number.',
       }
    ])

   .then(managerInput => {
        const  { name, id, email, officeNum } = managerInput; 
        const manager = new Manager (name, id, email, officeNum);

        teamArray.push(manager); 
        console.log(manager); 
    })
};


function writeToFile(fileName, data) {
  return fs.writeFileSync(fileName, data);
}

function init() {
  inquirer
    .prompt(questions)

    .then((responses) =>
      writeToFile("./index.html", generateMarkdown(responses))
    )
    .catch((err) => console.log("An error ocurred", err));
}

// Function call to initialize app
init();
