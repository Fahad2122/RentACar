const moysql = require('mysql');

let schema = 'CREATE TABLE `rentme`.`cars` (`Reg_No` VARCHAR(50) NOT NULL , `car_Name` VARCHAR(255) NOT NULL , `model` INT(30) NOT NULL , `Price` REAL NOT NULL , `cit_id` INT(10) NOT NULL , PRIMARY KEY (`Reg_No`))';

module.exports = schema;