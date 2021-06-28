var mysql = require('mysql');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'rootpassword',
    database : 'mobilepresencetest'
});

conn.connect((err) => {
    if(err) throw err;
    console.log ('Mysql has connected')
});

module.exports = conn;
