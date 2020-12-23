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

// connection.connect(function (err) {
//     if (err) throw err;
//     runSearch();
//   });

  //starts server to begin listening
    app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });