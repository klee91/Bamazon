CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(128) NOT NULL,
    department_name VARCHAR(128) NOT NULL,
    price DECIMAL(9, 2),
    stock_quantity INT(11),
    PRIMARY KEY (item_id)
);

INSERT products VALUES (1,'Oakwood Table','HOME & KITCHEN',125.00,50),(2,'Bamazon Becho','ELECTRONICS',149.99,200),(3,'KitchenAid KFP0711CU 7 Cup Food Processor', 
'HOME & KITCHEN', 99.99, 76),(4,'Marry Potter & The Deathly Marshmallows', 'BOOKS', 16.99, 352),(5,'5LB. Gummy Bears','HEALTH & FOOD', 24.99, 11),
(6,'Horde of the Rings - LIMITED EDITION','ENTERTAINMENT', 9.99, 32),(7,'The Bible - NIV Version 2017','BOOKS',9.99,284),(8,'Frosted Flakes','HEALTH & FOOD',3.99, 78),
(9,'CHACER AJ-670 Laptop', 'ELECTRONICS', 479.95, 34),(10,'Sbalding Pro Basketball','SPORTS & OUTDOORS', 20.00, 130);


select * from products;
select* from departments;

CREATE TABLE departments (
	department_id INT(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(128) NOT NULL,
    over_head_costs INT(11),
    total_sales DECIMAL(11),
    PRIMARY KEY(department_id)
);
alter table departments modify total_sales DECIMAL(11,2);
INSERT departments VALUES (department_id, 'TOYS, KIDS & BABY', 1670, 0.00);

UPDATE bamazon.products SET product_sales = 0; 

ALTER TABLE departments add total_profit DECIMAL(11,2);