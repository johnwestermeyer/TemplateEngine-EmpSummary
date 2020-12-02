const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const cssPath = path.join(OUTPUT_DIR, "style.css");

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
             //checking if employee ID is in use, input is not a number or is an empty string
            let test = true;
            for(let i = 0; i < employees.length; i++){               
                if(ans===employees[i].id){
                    test = false;
                }
            }
            if(isNaN(ans)){
                console.log(`\nPlease Enter a Number Value`)
            } else if(!test){
                console.log(`\nPlease Enter an Original ID Number`)
            } else if(ans===""){
                console.log(`\nPlease Enter an ID Number`)
            }
            return !isNaN(ans) && test && ans !== "";
        }
    },
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
        validate: (ans) => {
            //check if answer is not an empty string
            return ans === "" ? "You must provide a name" : true;
        }
    },
    {
        type: "input",
        message: "Whats it the employee's email address?",
        name: "email",
        validate: (ans) => {
            //regex obviously not created by me but rather sourced from https://ui.dev/validate-email-address-javascript/ (checks for valid email address)
            return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ans) ? "You must provide a valid email" : true;
        }
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
        },
        validate: (ans) => {
            //checks if office number is indeed a number and not empty
            return (isNaN(ans) || ans === "") ? "Must be a number" : true;
        }
    },
    {
        type: "input",
        message: "What is the engineer's github username?",
        name: "github",
        when: (response) => {
            return response.role === "Engineer"
        },
        validate: (ans) => {
            //checks if answer is not an empty string
            return ans === "" ? "You must provide a github username" : true;
        }
    },
    {
        type: "input",
        message: "What is the intern's school?",
        name: "school",
        when: (response) => {
            return response.role === "Intern"
        },
        validate: (ans) => {            
            //checks if answer is not an empty string
            return ans === "" ? "You must provide a school name" : true;
        }
    }
]
//Continue? question
const followUp = [
    {
        type: "confirm",
        message: "Would you like to enter another employee?",
        name: "cont"
    }
]
//the main show
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
        //Continue? if yes run init again : else write to file
        inquirer.prompt(followUp).then((response) => {
            if(response.cont){
                init();
            }
            else{
                try {
                    let text = renderer.render(employees);
                    checkFolder(); 
                    checkCSS();                   
                    writeToFile(outputPath, text);
                } catch (error) {
                    console.error(error);
                }
            }
        })


}
    )

}
//writeToFile function is a function that writes to a file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log('Success!'));
}
//checking if output folder exists and if not creates it
function checkFolder(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
}
//checking if external CSS exist and if not creates it
function checkCSS(){
    if(!fs.existsSync(cssPath)){
        writeToFile(cssPath, /* CSS GOES HERE */);
    }
}

// :3 :3 :3
//johnwestermeyer.github.io

init();