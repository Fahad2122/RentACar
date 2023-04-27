const moysql = require('mysql');

let schema = 'CREATE Table users(FirstName VARCHAR(50) NOT NULL , LastName VARCHAR(50), age DATE NOT NULL, email VARCHAR(70), phone VARCHAR(20) NOT NULL , address TEXT NOT NULL, password VARCHAR(50) NOT NULL, PRIMARY KEY (email))';

module.exports = schema;