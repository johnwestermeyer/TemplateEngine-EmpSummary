const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const renderer = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const employees = [];



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [
    {
        type: "input",
        message: "What is the employee's ID number?",
        name: "id",
        validate: (ans) => {
            let test = true;
            for(let i = 0; i < employees.length; i++){
                if(ans===employees[i].id){
                    test = false;
                }
            }
            if(isNaN(ans)){
                console.log(`\nPlease Enter a Number Value`)
            } else if(!test){
                console.log(`\nPlease enter an original ID number`)
            }
            return !isNaN(ans) && test;
        }
    },
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
        validate: (ans) => {
            return ans === "" ? "You must provide a name value" : true;
        }
    },
    {
        type: "input",
        message: "Whats it the employee's email address?",
        name: "email"
    },
    {
        type: "list",
        message: "What is the employee's job role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNumber",
        when: (response) => {
            return response.role === "Manager"
        }
    },
    {
        type: "input",
        message: "What is the engineer's github username?",
        name: "github",
        when: (response) => {
            return response.role === "Engineer"
        }
    },
    {
        type: "input",
        message: "What is the intern's school?",
        name: "school",
        when: (response) => {
            return response.role === "Intern"
        }
    }
]

const followUp = [
    {
        type: "confirm",
        message: "Would you like to enter another employee?",
        name: "cont"
    }
]

function init() {
    inquirer.prompt(questions).then((response) => {
        if(response.role === "Manager"){            
            let emp = new Manager(response.name, response.id, 
                response.email, response.role, response.officeNumber);        
            employees.push(emp);
        } else if (response.role === "Engineer"){
            let emp = new Engineer(response.name, response.id, 
                response.email, response.role, response.github);        
            employees.push(emp);
        } else{
            let emp = new Intern(response.name, response.id, 
                response.email, response.role, response.github);        
            employees.push(emp);
        }

        inquirer.prompt(followUp).then((response) => {
            if(response.cont){
                init();
            }
            else{
                try {
                    let text = renderer.render(employees);
                    writeToFile("index.html", text)
                } catch (error) {
                    console.error(error);
                }
            }
        })


}
    )

}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log('Success!'));
}



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

init();