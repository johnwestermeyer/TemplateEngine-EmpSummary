// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Intern extends Employee {
    constructor(id, email, school){
        this.school = school;

        super(id, email);
    }
}

module.exports = Intern;