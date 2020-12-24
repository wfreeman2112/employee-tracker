//establish dependencies

var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//building server
var app = express();
var PORT = process.env.PORT || 3000;

var connection = mysql.createConnection({
    host: "localhost",
    PORT:  process.env.PORT || 3000,
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
          "View All Employees by Department",
          "View all Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager"
        ]
      })
      
  

  //starts server to begin listening
    app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    },
  )};