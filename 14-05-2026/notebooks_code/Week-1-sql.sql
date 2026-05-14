create database customer_orders;
use customer_orders;

create table customers(
customer_id int primary key,
customer_name varchar(100),
region varchar(100)
);

create table orders(
order_id int primary key,
customer_id int,
product_name varchar(100),
order_date date,
delivery_date date,
status varchar(50)
);

create table delivery_status(
delivery_id int primary key,
order_id int,
delivery_partner varchar(100),
delivery_status varchar(50)
);

insert into customers values
(1,'vaishali','chennai'),
(2,'rahul','bangalore'),
(3,'priya','hyderabad');
insert into orders values
(101,1,'laptop','2026-05-01','2026-05-05','delivered'),
(102,2,'mouse','2026-05-02','2026-05-12','delayed'),
(103,3,'keyboard','2026-05-03','2026-05-10','delivered');	
insert into delivery_status values
(1,101,'dtdc','delivered'),
(2,102,'delhivery','delayed'),
(3,103,'blue dart','delivered');

select * from orders;
update orders
set status='delivered'
where order_id=102;
delete from delivery_status
where delivery_id=3;
update orders
set status='delayed'
where order_id=102;

delimiter //
create procedure delayed_orders(in cust_id int)
begin
select * from orders
where customer_id=cust_id
and status='delayed';
end //
delimiter ;
call delayed_orders(2);