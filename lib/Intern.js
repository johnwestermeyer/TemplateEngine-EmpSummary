// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, id, email, role, school){        
        super(name, id, email, role);
        this.school = school;

    }
    getSchool(){
        return this.school;
    }
    getRole(){
        return this.role;
    }
}

module.exports = Intern;