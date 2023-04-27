const mysql = require('mysql');

const connectTOMySQL = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rentme'
})

connectTOMySQL.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connected');
})

module.exports = connectTOMySQL;