const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const http = require("http");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//Code to use inquirer to gather information about the development team members,
async function askquestions() {
  const res = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"
    },
    {
      type: "list",
      name: "role",
      message: "Select your role?",
      choices: ["Manager", "Engineer", "Intern"]
    }
  ]);
  //create objects for each team member (using the correct classes as blueprints!)
  const employees = [];

  switch (res.role) {
    case "Manager":
      const phone = await inquirer.prompt([
        {
          type: "input",
          name: "officeNumber",
          message: "What is your office number?"
        }
      ]);
      employees.push(
        new Manager(res.name, res.id, res.email, phone.officeNumber)
      );
      break;
    case "Engineer":
      const gitHub = await inquirer.prompt([
        {
          type: "input",
          name: "gitHubUserName",
          message: "What is your github username?"
        }
      ]);
      employees.push(
        new Engineer(res.name, res.id, res.email, gitHub.gitHubUserName)
      );
      break;
    case "Intern":
      const school = await inquirer.prompt([
        {
          type: "input",
          name: "schoolName",
          message: "What is your school?"
        }
      ]);
      employees.push(
        new Intern(res.name, res.id, res.email, school.schoolName)
      );
      break;
    default:
  }
  // employees aray with all employer
  // render ( employees)
}

askquestions();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
