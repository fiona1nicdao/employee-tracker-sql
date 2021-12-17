INSERT INTO department (name)
VALUES  (Sales),
        (Enginneering),
        (Finance),
        (Legal)

INSERT INTO role (title, department_id,salary)
VALUES  (sales lead, Sales, 10000),
        (salesperson, Sales, 80000),
        (Lead Enginneer, Enginneering, 150000),
        (Accountant, Finance,124000),
        (Lawyer, Legal, 19000)

INSERT INTO role (first_name, last_name, title,department,salary,manager_id)
VALUES  (John, Doe, sales lead, Sales, 10000, NULL),
        (Mike, Chan, Lead Enginneer, Enginneering, 150000, NULL),
        (Anna, Singh, Lawyer, Legal, 19000, Mike Chan)