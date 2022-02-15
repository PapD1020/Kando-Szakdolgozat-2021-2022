const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ideasharedb'
});

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


/*
app.get('/', (req, res)=>{      //req is used to get information from the frontend
    res.send("Hello world");    //sending this information to frontend (not yet to react)
})
*/

/*
app.get("/", (req, res) => {
    //Test to see if the database connection works

    const sqlInsert = "INSERT INTO `post`(`PostName`, `PostDate`, `PostSmDescr`, `PostMDescr`, `PostImg`, `PostStatus`) VALUES ('Első Poszt neve','2022-02-10','kicsi leírás','nagy lerás','kép','1')";
    db.query(sqlInsert, (err, result) => {

        res.send("Hello");
    });
});
*/

/*
* POST CRUD
*/

//GET - Post
app.get('/api/get/post', (req, res) => {

    const sqlSelect = "SELECT * FROM post";
    db.query(sqlSelect, (err, result) => {

        console.log("Result:" + result); //valamiért Object-et kapok terminálban
        res.send(result);
    });
});

//POST - Post
app.post('/api/insert/post', (req, res) => {

    const postName = req.body.postName;
    const postDate = req.body.postDate;
    const postSmDescr = req.body.postSmDescr;
    const postMDescr = req.body.postMDescr;
    const postImg = req.body.postImg;
    const postStatus = req.body.postStatus;

    const sqlInsert = "INSERT INTO `post`(`PostName`, `PostDate`, `PostSmDescr`, `PostMDescr`, `PostImg`, `PostStatus`) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [postName, postDate, postSmDescr, postMDescr, postImg, postStatus], (err, result) => {

        console.log(err);
        console.log("Result:" + result);
        res.send(result);
    });
});

//DELETE - Post
app.delete('/api/delete/post/:postName', (req, res) => {
    const name = req.params.postName;
    const sqlDelete = "DELETE FROM post WHERE PostName = ?";
    db.query(sqlDelete, name, (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

//PUT-UPDATE - Post
app.put('/api/update/post', (req, res) => {

    const name = req.body.postName;
    const status = req.body.postStatus;
    const sqlUpdate = "UPDATE post SET PostStatus = ? WHERE PostName = ?";

    db.query(sqlUpdate, [status, name], (err, result) => { //Fontos a sorrend, első a PostStatus, aztán a PostName, gondolom az sql szintaktika miatt
        if(err){
            console.log(err);
        }
    });
});

/*
* Admin CRUD
*/

//GET - ADMIN
app.get('/api/get/admin', (req, res) => {

    const sqlSelect = "SELECT * FROM admin";
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Admin GET error: " + err);
        }

        console.log(result.data); //still not working properly
        res.send(result);
    });
});

//POST - ADMIN
app.post('/api/insert/admin', (req, res) => {

    const adminUn = req.body.adminUn;
    const adminPw = req.body.adminPw;
    const adminFN = req.body.adminFN;
    const adminSN = req.body.adminSN;
    const adminPermL = req.body.adminPermL;
    const adminEmail = req.body.adminEmail;

    const sqlInsert = "INSERT INTO `admin`(`AdminUn`, `AdminPw`, `AdminFN`, `AdminSN`, `AdminPermL`, `AdminEmail`) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [adminUn, adminPw, adminFN, adminSN, adminPermL, adminEmail], (err, result) => {

        console.log(err);
        console.log("Result:" + result);
        res.send(result);
    });
});

//DELETE - ADMIN
app.delete('/api/delete/admin/:adminUn', (req, res) => {
    const name = req.params.adminUn;
    const sqlDelete = "DELETE FROM admin WHERE AdminUn = ?";
    db.query(sqlDelete, name, (err, result) => {
        if(err){
            console.log("Admin DELETE error: " + err);
        }
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});