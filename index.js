const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name:'company-database',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            '6View All Employees',
            
            
            'Add Department',
            'Add Role',
            'Add Employee',

            'Update Employee Role',
            'Quit',
            // show table
            // new questions/ What is the name of the the role ? / what is the salary of the role? / Which department does the role 
            
            // show table
            
            // new questions / What is the name of the department? / confirmation: Added Service to the database 
            
            // end
            
        ]
    }
]

function init() {
    inquirer
        .prompt(questions)
        .then((data) => {
            // if {data.company-database === 'View All Departments'} function to show data
            console.log('view department')
            
        });

}
init()