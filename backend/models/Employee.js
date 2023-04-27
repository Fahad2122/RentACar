const moysql = require('mysql');

let schema = 'CREATE TABLE `rentme`.`employee` (`Emp_Name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(50) NOT NULL , `password` VARCHAR(255) NOT NULL , `Salary` double Not NULL, `office_Id` INT(10) NOT NULL)';

module.exports = schema;