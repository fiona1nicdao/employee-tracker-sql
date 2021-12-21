// import and require inquirer and mysql 2
const inquirer = require('inquirer');
const mysql = require('mysql2');
const chalk = require('chalk');
const cTable = require('console.table');

// connect to database
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Password1',
        database:'company_db'
    },
);
db.connect(function(err){
    if (err) throw err;
    console.log('Connected to the company database!')
    init()
});
// main questions
const questions = [
    {
        type: 'list',
        name:'companyData',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit'
        ]
    }
]
function init() {
    inquirer
        .prompt(questions)
        .then((response)=> {
            if (response.companyData === 'View All Departments') {
                viewAllDepartments()
            } else if (response.companyData === 'View All Roles'){
                viewAllRoles()
            } else if (response.companyData === 'View All Employees') {
                viewAllEmployee()
            } else if (response.companyData === 'Add Department') {
                initDepartment()
            } else if (response.companyData === 'Add Role'){
                initRole()
            }else if (response.companyData === 'Add Employee'){
                initEmployee()
            }else if (response.companyData === 'Update Employee Role'){
                initUpdate()
            }else if (response.companyData === 'Quit'){
                return db.end()
            }
            else {
                return db.end()
            }
        })
    
}
// department
// View All Departments
function viewAllDepartments() {
    const sql = `SELECT department.id, department.department_name AS department FROM department`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
    });
};
const departmentQuest = [
    {
        type: 'input',
        name: 'departmentquest',
        message: 'What is the name of the department?'
        // confirmation: Added Service to the database

    }
]
// Add Department
function initDepartment() {
    inquirer
        .prompt(departmentQuest)
        .then((response)=>{
            const sql = `INSERT INTO department (department_name) VALUES (?)`;
            db.query(sql, response.departmentquest, (err, results) => {
                if (err) throw err;
                console.log(`Added ${response.departmentquest} to the database`);
                viewAllDepartments()
            });
        });
};
// Roles
// View All Roles
function viewAllRoles() {
    const sql = `SELECT roles.id,
     roles.title,
     department.department_name AS department, 
     roles.salary FROM roles 
    INNER JOIN department ON roles.department_id = department.id `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
    });
};

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
]
// Add Role
function initRole() {
    inquirer
        .prompt(roleQuest)
        .then((response)=>{
            const input = [response.roleName, response.salary];
            const roleDepartmentSql = `SELECT department_name, id FROM department`;
            db.query(roleDepartmentSql, (err, results) => {
                if (err) throw err;
                const rolesDepartment = results.map(({department_name, id})=> ({name: department_name, value: id}));
                inquirer.prompt([
                    {
                        type:'list',
                        name:'roleDepartment',
                        message:'What department does the role belong to?',
                        choices: rolesDepartment
                    }
                ])
                    .then(departmentReponse => {
                        const department = departmentReponse.roleDepartment;
                        input.push(department);
                        const sql = `INSERT INTO roles (title, salary, department_id)VALUES (?,?,?)`;
                        db.query(sql, input, (err, results)=>{
                            if (err) throw err;
                            console.log(`Added ${response.roleName} to the database`);
                            viewAllRoles();
                        });
                    });
            });
        });
};
// employee
// View All Employee
function viewAllEmployee() {
    const sql =`SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    roles.title,
    department.department_name AS department,
    roles.salary,
    CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    LEFT JOIN roles ON employee.roles_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
    });
};
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
    }
]
// Add Employee
function initEmployee() {
    inquirer
        .prompt(employeeQuest)
        .then((response)=>{
            const input = [response.firstname, response.lastname];
            const personRoleSql =  `SELECT roles.title, roles.id FROM roles`;
            db.query(personRoleSql, (err,results)=>{
                if (err) throw (err);
                const personRole = results.map(({title,id})=>({name:title,value:id}));
                inquirer
                    .prompt([
                        {
                            type:'list',
                            name:'role',
                            message:"What is the employee's role",
                            choices:personRole
                        }
                    ])
                    .then(roleResponse=>{
                        const roles = roleResponse.role;
                        input.push(roles);
                        const managerSql = `SELECT * FROM employee`;
                        db.query(managerSql, (err, results)=>{
                            if (err) throw err;
                            const manager = results.map(({first_name, last_name, id})=>({name:`${first_name} ${last_name}`, value:id}));
                            inquirer
                                .prompt([
                                    {
                                        type:'list',
                                        name:'managers',
                                        message:"Who is the employee's manager?",
                                        choices:manager
                                    }
                                ])
                                .then(managerResponse =>{
                                    const manager = managerResponse.managers;
                                    input.push(manager);
                                    const sql =`INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`;
                                    db.query(sql, input, (err, results)=>{
                                        if (err) throw err;
                                        console.log(`Added new employee`);
                                        viewAllEmployee();
                                    })
                                })
                        })
                    })
                
            })
        })
};
// update employee role
function initUpdate(){
    // question for pick employee via first and last name
    const employeeSql = 'SELECT * FROM employee';
    db.query(employeeSql, (err, data)=> {
        if (err) throw err;
        const employee = data.map(({first_name, last_name, id})=>({name:`${first_name} ${last_name}`, value:id}));
        inquirer
            .prompt([
                {
                    type:'list',
                    name:'employeeName',
                    message:"Which employee's role do you want to update?",
                    choices:employee
                }
            ])
            .then(employeeResponse=>{
                const employees =employeeResponse.employeeName;
                const input = [];
                input.push(employees);
                // question for role reassignment for selected employee via first and last name
                const employeeRoleSql = `SELECT * FROM roles`;
                db.query(employeeRoleSql, (err, data)=> {
                    if (err) throw err;
                    const employeeRole = data.map(({title, id})=>({name:title, value:id}));
                    inquirer
                        .prompt([
                            {
                                type:'list',
                                name:"employeeRole",
                                message:"Which role do you want to assign the selected employee?",
                                choices:employeeRole
                            }
                        ])
                        .then(employeeRoleResponse=>{
                            const role = employeeRoleResponse.employeeRole;
                            input.push(role)

                            let employees = input[0]
                            input[0] = role
                            input[1] = employees

                            console.log(input)
                            const sql =`UPDATE employee SET roles_id =? WHERE id =?`;
                            db.query(sql, input,(err,result)=>{
                                if (err) throw err;
                                console.log(`updated employee and their role!`);
                                viewAllEmployee();
                            })
                        })
                })
            })
    })
}

