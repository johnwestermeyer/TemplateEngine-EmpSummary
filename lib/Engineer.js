// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(id, email, github){
        this.github = github;

        super(id, email);
    }
}

module.exports = Engineer;