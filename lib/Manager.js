// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
    constructor(id, email, office){
        this.office = office;

        super(id, email);
    }
}

module.exports = Manager;