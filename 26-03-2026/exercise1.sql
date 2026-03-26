create database company_training;
use company_training;

create table employees (
emp_id int primary key,
emp_name varchar(100),
department varchar(50),
city varchar(50)
);

create table projects (
project_id int primary key,
emp_id int,
project_name varchar(100),
project_budget decimal(12,2),
project_status varchar(50)
);

INSERT INTO employees VALUES
(1, 'Rohan Mehta', 'IT', 'Hyderabad'),
(2, 'Sneha Iyer', 'IT', 'Bangalore'),
(3, 'Kiran Patel', 'Finance', 'Mumbai'),
(4, 'Ananya Das', 'HR', NULL),
(5, 'Rahul Sharma', 'IT', 'Delhi'),
(6, NULL, 'Marketing', 'Chennai');

INSERT INTO projects VALUES
(101, 1, 'AI Chatbot', 120000, 'Active'),
(102, 1, 'ML Prediction', 90000, 'Active'),
(103, 2, 'Data Warehouse', 150000, 'Active'),
(104, 3, 'Financial Dashboard', 80000, 'Completed'),
(105, NULL, 'Website Revamp', 60000, 'Pending'),
(106, 8, 'Mobile App', 100000, 'Active');

select e.emp_name,p.project_name,p.project_budget
from employees e 
inner join projects p 
on e.emp_id=p.emp_id;

select e.emp_id,e.emp_name,e.department,e.city,p.project_name, p.project_budget, p.project_status
from employees e
left join projects p 
on e.emp_id=p.emp_id;

select e.emp_name, p.project_name, p.project_budget
from employees e
right join projects p
on e.emp_id = p.emp_id;

select e.emp_name, p.project_name, p.project_budget
from employees e
left join projects p
on e.emp_id = p.emp_id
union 
select e.emp_name, p.project_name, p.project_budget
from employees e
right join projects p
on e.emp_id = p.emp_id;

select e.emp_id,e.emp_name,e.department,e.city,p.project_name, p.project_budget, p.project_status
from employees e
cross join projects p ;

select e.emp_name, p.project_name, p.project_budget
from employees e
inner join projects p 
on e.emp_id = p.emp_id
where e.department = 'IT';

select e.emp_name, p.project_name, p.project_budget
from employees e
inner join projects p 
on e.emp_id = p.emp_id
WHERE p.project_budget > 100000;

select e.emp_name, e.city, p.project_name
from employees e
left join projects p 
on e.emp_id = p.emp_id
where e.city = 'Hyderabad';

select e.emp_name, count(p.project_id) as total_projects
from employees e
left join projects p 
on e.emp_id = p.emp_id
group by e.emp_id, e.emp_name;

select e.emp_name, sum(p.project_budget) as total_budget
from employees e
inner join  projects p
on e.emp_id = p.emp_id
group by e.emp_id, e.emp_name;

select e.department, avg(p.project_budget) as avg_budget
from employees e
inner join projects p on e.emp_id = p.emp_id
group by e.department;

select e.department, count(p.project_id) as total_projects
from employees e
left join projects p on e.emp_id = p.emp_id
group by e.department;

select e.department, sum(p.project_budget) as total_budget
from employees e
inner join projects p 
on e.emp_id = p.emp_id
group by e.department;

select city, count(emp_id) as employee_count
from employees
group by city;

select e.emp_name, count(p.project_id) as project_count
from employees e
inner join projects p 
on e.emp_id = p.emp_id
group by e.emp_id, e.emp_name
having count(p.project_id) > 1;

select e.department, sum(p.project_budget) as total_budget
from employees e
inner join projects p 
on e.emp_id = p.emp_id
group by e.department
having sum(p.project_budget) > 150000;

select e.emp_name, sum(p.project_budget) as total_budget
from employees e
inner join projects p 
on e.emp_id = p.emp_id
group by e.emp_id, e.emp_name
having sum(p.project_budget) > 100000;

select e.emp_name, e.department, sum(p.project_budget) as total_budget
from employees e
inner join projects p 
on e.emp_id = p.emp_id
group by e.emp_id, e.emp_name, e.department
having sum(p.project_budget) > 100000
order by total_budget desc;
