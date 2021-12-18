const { response } = require('express');
const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name:'companyData',
        message: 'What would you like to do?',
        choices: [
            // show table
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            
            'Add Role',
            'Add Employee',

            'Update Employee Role',
            // end
            'Quit'
        ]
    }
]

const departmentQuest = [
    {
        type: 'input',
        name: 'departmentquest',
        message: 'What is the name of the department?'
        // confirmation: Added Service to the database

    }
]
function initDepartment() {
    inquirer
        .prompt(departmentQuest)
        .then((response)=>{
            console.log(`Added ${response.departmentquest} to the database`)
        })
}
// how to add newly added departments ? need to make a function for it?
const roleQuest = [
    {
        type:'input',
        name:'roleName',
        message:'What is the name of the role?'
    },
    {
        type:'input',
        name:'salary',
        message:'What is the salary of the role?'
    },
    {
        type:'list',
        name:'roleDepartment',
        message:'What department does the role?',
        choices: [
            'Engineering',
            'Finance',
            'Legal',
            'Sales'
        ]
    }
    // new questions/ What is the name of the the role ? / what is the salary of the role? / Which department does the role?
]
function initRole() {
    inquirer
        .prompt(roleQuest)
        .then((response)=>{
            console.log(`Added ${response.roleName} to the role table with a salary of ${response.salary} and from the department ${response.roleDepartment}`)
        })
}
// how to add newly added roles ? need a function?
const employeeQuest = [
    {
        type:'input',
        name:'firstname',
        message:"What is the employee's first name?"
    },
    {
        type:'input',
        name:'lastname',
        message:"What is the employee's last name?"
    },
    {
        type:'list',
        name:'role',
        message:"What is the employee's role",
        choices:[
            'Salesperson',
            'lead Engineer',
            'lawyer'
        ]
    },
    {
        type:'list',
        name:'manager',
        message:"Who is the employee's manager?",
        choices: [
            'None',
            'John Doe',
            'Mike Chan'
        ]
    }
]
function initEmployee() {
    inquirer
        .prompt(employeeQuest)
        .then((response)=>{
            console.log(`added new employee`)
        })
}
const updateQuest = [
    {
        type:'list',
        name:'employeeName',
        message:"Which employee's role do you want to update?",
        choices:[
            'Ashley Rodriguez',
            'Kevin Tupik'
        ]
    },
    {
        type:'list',
        name:"employeeRole",
        message:"Which role do you want to assign the selected employee?",
        choices:[
            'Sales Lead',
            'Salesperson',
            'lead Engineer',
            'lawyer'
        ]
    }
]
function initUpdate(){
    inquirer
        .prompt(updateQuest)
        .then((response)=>{
            console.log(`updated employee and their role`)
        })
}
function init() {
    inquirer
        .prompt(questions)
        .then((response)=> {
            if (response.companyData === 'View All Departments') {
                console.log(`show department table`)
            } else if (response.companyData === 'View All Roles'){
                console.log('show roles table')
            } else if (response.companyData === 'View All Employees') {
                console.log('show employees table')
            } else if (response.companyData === 'Add Department') {
                initDepartment()
            } else if (response.companyData === 'Add Role'){
                initRole()
            }else if (response.companyData === 'Add Employee'){
                initEmployee()
            }else if (response.companyData === 'Update Employee Role'){
                initUpdate()
            }else if (response.companyData === 'Quit'){
                return
            }
            else {
                return
            }
        })
    
}

init()