CREATE DATABASE supplychain;
USE supplychain;

create table orders(
order_id int primary key,
supplier_id int,
product_name varchar(100),
quantity int,
order_date date,
delivery_date date,
status varchar(50)
);

create table suppliers(
supplier_id int primary key,
supplier_name varchar(100),
location varchar(100)
);

create table inventory(
product_id int primary key,
product_name varchar(100),
stock int,
reorder_level int
);
insert into orders values
(101,1,'laptop',5,'2026-05-01','2026-05-05','delivered'),
(102,2,'mouse',10,'2026-05-02','2026-05-12','delayed'),
(103,1,'keyboard',7,'2026-05-03','2026-05-08','delivered');
insert into suppliers values
(1,'tech supplies','chennai'),
(2,'global electronics','bangalore');
insert into inventory values
(1,'laptop',5,10),
(2,'mouse',20,15),
(3,'keyboard',8,10);
select * from orders;
update inventory
set stock=25
where product_id=1;
select * from inventory;
delete from orders
where order_id=103;
select * from orders;
delimiter //
create procedure check_reorder()
begin 
select * from inventory 
where stock<reorder_level;
end //
delimiter ;

call check_reorder()
