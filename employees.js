//establish dependencies

var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");


const connection = mysql.createConnection({
  host: "localhost",
  PORT: 3306,
  user: "root",
  password: "password1",
  database: "employees_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

//prompt user to choose what they want to see

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View Roles",
        "Update Employee Role",
        "Add Employee",
        "Add Role",
        "Add Department",
      ],
    })
    .then(function (response) {
      switch (response.action) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDept();
          break;
      }
    });
}
//function to add department

//write function to display all departments
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "what department would you like to add?",
        name: "department",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO department(name) values(?)",
        response.department,
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });
}

//write function to display all departments
function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

//write function to view roles
function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

//write function to remove employee

//write function to update employee role
//write function to update employee manager
