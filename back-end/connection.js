const mysql = require('mysql');
require('dotenv').config();

const mySQLConnection = mysql.createConnection({
    host: '104.198.26.36',
    user: "root",
    password: "runescape",
    database: "cmpt470",
    port: "3306",
    multipleStatements: true
});

mySQLConnection.connect((error) =>{
    if (error) {
        console.log("Conection Failed:", error); 
    }else{
        console.log("MySQL connected");
    }
});

module.exports = mySQLConnection;
