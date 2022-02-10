const express = require("express");
const app = express();
//mysql összekötés - npm install mysql express
const mysql = require('mysql');

const PORT = process.env.PORT || 8081;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ideasharedb'
});
  
/*
app.get("/", (req, res) => {
  res.send("Hello World!");
});
*/

//React-al összekötés

app.post("/post", (req, res) => {
    console.log("Connected to React on port: " + PORT);
    res.redirect("/");
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//MySQL kód ide
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM admin', (err, rows) => {
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
});
 
app.listen(PORT, console.log(`Server started on port ${PORT}`));