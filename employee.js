//establish dependencies

var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//building server
var connection = mysql.createConnection({
    host: "localhost",
    PORT:  process.env.PORT || 3000,
    user: "root",
    password: "password1",
  database: "employees_DB",
});
