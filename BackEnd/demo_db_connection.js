const express = require("express");
const app = express();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ideasharedb'
})


app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM users', (err, rows) => {
            connection.release() //return the connection pool

            if(!err){
                res.send(rows)
            }
            else{
                console.log(err)
            }

            //if(err throw err)

            console.log('The data from users table are: \n', rows)
        })
    })
})
/*
const express = require("express");
const app = express();
//mysql összekötés - npm install mysql express
const mysql = require('mysql');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//MySQL kód ide
*/