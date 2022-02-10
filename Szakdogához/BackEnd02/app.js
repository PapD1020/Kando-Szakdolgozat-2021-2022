const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//MySQL code
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ideasharedb'
});

//GET
app.get('',(req, res) => {

    pool.getConnection((err, connecntion) => {

        if(err) throw err;

        console.log("Get all the records. Connected as id " + connecntion.threadId + "\n");

        connecntion.query("SELECT * FROM admin", (err, rows) => {

            connecntion.release();

            if(!err){
                res.send(rows);
            }
            else{
                console.log(err);
            }
        });
    });
});

//GET by id
app.get('/:id',(req, res) => { 

    pool.getConnection((err, connecntion) => {

        if(err) throw err;

        console.log("connected as id " + connecntion.threadId);

        connecntion.query("SELECT * FROM admin WHERE AdminId = ?", [req.params.id], (err, rows) => {

            connecntion.release();

            if(!err){
                res.send(rows);
            }
            else{
                console.log(err);
            }
        });
    });
});

//DELETE by id
app.delete('/:id',(req, res) => { 

    pool.getConnection((err, connecntion) => {

        if(err) throw err;

        console.log("connected as id " + connecntion.threadId);

        connecntion.query("DELETE FROM admin WHERE AdminId = ?", [req.params.id], (err, rows) => {

            connecntion.release();

            if(!err){
                res.send("Admin with the AdminId: " + req.params.id + " deleted.");
            }
            else{
                console.log(err);
            }
        });
    });
});

//Add a record
app.post('',(req, res) => {

    pool.getConnection((err, connecntion) => {

        if(err) throw err;

        console.log("Add a record. Connected as id " + connecntion.threadId + "\n");

        const parameters = req.body;

        connecntion.query("INSERT INTO admin SET ?", parameters, (err, rows) => {

            connecntion.release();

            if(!err){
                res.send("Admin with the AdminId: " + parameters.AdminId + " has been added.");
            }
            else{
                console.log(err);
            }
        });

        console.log(req.body);
    });
});

//UPDATE a record
app.put('',(req, res) => {

    pool.getConnection((err, connecntion) => {

        if(err) throw err;

        console.log("connected as id " + connecntion.threadId);

        const {AdminId, AdminUn, AdminPw, AdminFN, AdminSN, AdminPermL, AdminEmail} = req.body;

        connecntion.query("UPDATE admin SET AdminUn = ?, AdminPermL = ? WHERE AdminId = ?", [AdminUn, AdminId], (err, rows) => {

            connecntion.release();

            if(!err){
                res.send("Admin data has been updated. AdminId: " + [AdminId]);
            }
            else{
                console.log(err);
            }
        });

        console.log(req.body);
    });
});

//Listen on environment or port 8081
app.listen(port, () => console.log("Listen on port: " + port));
