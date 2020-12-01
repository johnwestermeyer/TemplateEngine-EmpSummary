// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name, id, email, role){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    getRole(){
        return this.role;
    }

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getId(){
        return this.id;
    }
}

module.exports = Employee;