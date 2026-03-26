create database capstone_sql;
use capstone_sql;

create table students (
student_id int primary key,
student_name varchar(100),
city varchar(50),
age int
);

create table enrollments (
enrollment_id int primary key,
student_id int,
course_name varchar(100),
trainer varchar(100),
fee decimal(10,2)
);

insert into students values
(1,'Aarav Sharma','Hyderabad',22),
(2,'Priya Reddy','Bangalore',23),
(3,'Rahul Verma','Mumbai',24),
(4,'Sneha Kapoor',NULL,21),
(5,'Vikram Singh','Chennai',25),
(6,NULL,'Delhi',22);

insert into enrollments values
(101,1,'MySQL','Abdullah Khan',5000),
(102,1,'Python','Abdullah Khan',7000),
(103,2,'Power BI','Kiran',6000),
(104,3,'Azure Data Factory','Sneha',8000),
(105,NULL,'Excel','Rohan',3000),
(106,8,'Databricks','Ananya',9000);

select s.student_name,e.course_name
from students s
INNER JOIN enrollments e 
ON s.student_id = e.student_id;

select s.student_name,e.course_name
from students s 
left join enrollments e 
on s.student_id = e.student_id;

select s.student_name, e.course_name
from students s
right join enrollments e 
on s.student_id = e.student_id;

select s.student_name, e.course_name
from students s
left join enrollments e 
on s.student_id = e.student_id
union
select s.student_name, e.course_name
from students s
right join enrollments e 
on s.student_id = e.student_id;

select s.student_name, e.course_name
from students s
cross join enrollments e;

select s.student_name, s.city, e.course_name
from students s
inner join enrollments e 
on s.student_id = e.student_id
where s.city = 'Hyderabad';

select s.student_name, e.course_name, e.fee
from students s
inner join enrollments e 
on s.student_id = e.student_id
where e.fee > 6000;

select s.student_name, count(e.enrollment_id) as total_courses
from students s
left join enrollments e 
on s.student_id = e.student_id
group by s.student_id, s.student_name;

select s.student_name, sum(e.fee) as total_fee
from students s
inner join enrollments e 
on s.student_id = e.student_id
group by s.student_id, s.student_name;

select s.student_name, count(e.enrollment_id) as course_count
from students s
inner join enrollments e 
on s.student_id = e.student_id
group by s.student_id, s.student_name
having count(e.enrollment_id) > 1;

select  e.trainer, sum(e.fee) as total_collected
from enrollments e
group by e.trainer
having sum(e.fee) > 10000;

select city, count(student_id) AS student_count
from students
where city is not null
group by city
having count(student_id) > 1;

select s.student_name, s.city, sum(e.fee) as total_fee_paid
from students s
inner join enrollments e on s.student_id = e.student_id
group by s.student_id, s.student_name, s.city
having sum(e.fee) > 5000
order by total_fee_paid desc;