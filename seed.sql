DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE  employees_DB;

USE employees_DB;

CREATE TABLE department (
id INTEGER AUTO_INCREMENT NOT Null,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id INTEGER AUTO_INCREMENT NOT Null,
title VARCHAR(30),
salary DECIMAL(10,4),
department_id INTEGER NOT null,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT NOT Null,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER NOT null,
manager_id INTEGER NULL,
PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wendi", "Freeman", 2, 5)
("Dominic", "Garrini", 3, 5),
("Kevin", "Ku", 9, 3)
