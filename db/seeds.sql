INSERT INTO department (department_name)
VALUES  ('Sales'),
        ('Enginneering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (title, department_id,salary)
VALUES  ('sales lead', 1, 10000),
        ('salesperson', 1, 80000),
        ('Lead Enginneer', 2, 150000),
        ('Accountant', 3,124000),
        ('Lawyer', 4, 19000);

INSERT INTO employee (first_name, last_name, roles_id,manager_id)
VALUES  ('John', 'Doe', 1, NULL),
        ('Mike', 'Chan', 3, 1),
        ('Anna', 'Singh', 5,1);