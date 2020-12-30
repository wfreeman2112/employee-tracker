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
        "Exit"
      ],
    })

    //write switch case to get responses
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
          updateEmployee();
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

        case "Exit":
          connection.end();
          break;
      }
    });
  }


//write function to view all employees
function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();

  });
}

//write function to view all departments
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

//write function to add departments
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
          console.log("Department Added!");
          runSearch();
        }
      );
    });
}

//write function to update employees
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "what is the id of employee you would like to update?",
        name: "employeeID",
      },

      {
        type: "input",
        message: "what is the new role of employee you would like to update?",
        name: "newRole",
      },
    ])
    .then(function (response) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [response.newRole, response.employeeID],
        function (err, res) {
          if (err) throw err;
          console.log("Employee Updated!");
          runSearch();
        }
      );
    });
}

//write function to add roles
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "what role would you like to add?",
        name: "role"
      },

      {
        type: "input",
        message: "what is their annual salary?",
        name: "salary"
      },

      {
        type: "input",
        message: "what is the id of this department?",
        name: "deptID"
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO role(title, salary, department_id) values(?,?,?)",
        [response.role, response.salary, response.deptID],
        function (err, res) {
          if (err) throw err;
           console.log("new role added!")
          runSearch();
        }
      );
    });
}

//write function to add employees
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "first name of employee?",
        name: "first_name",
      },

      {
        type: "input",
        message: "last name of employee?",
        name: "last_name",
      },

      {
        type: "input",
        message: "what is their role ID?",
        name: "role_id",
      },

      {
        type: "input",
        message: "what is their manager's ID?",
        name: "manager_id",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) values(?, ?, ?, ?)",
        [response.first_name, response.last_name, response.role_id, response.manager_id],
        function (err, res) {
          if (err) throw err;
          console.log("Employee Added!");
          runSearch();
        }
      );
    });
}


