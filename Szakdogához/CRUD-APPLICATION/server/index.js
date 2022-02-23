const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const { json } = require('body-parser');

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
        if(err){
            console.log("Post GET error: " + err);
        }

        console.log("Result:" + result);                //valamiért Object-et kapok terminálban
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

        if(err){
            console.log("Post POST error: " + err);
        }

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

    console.log(JSON.stringify(req.body)); //ez jó
    const adminUn = req.body.adminUn;

    const adminPw = req.body.adminPw;
    const adminFN = req.body.adminFN;
    const adminSN = req.body.adminSN;
    const adminPermL = req.body.adminPermL;
    const adminEmail = req.body.adminEmail;

    const sqlInsert = "INSERT INTO `admin`(`AdminUn`, `AdminPw`, `AdminFN`, `AdminSN`, `AdminPermL`, `AdminEmail`) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [adminUn, adminPw, adminFN, adminSN, adminPermL, adminEmail], (err, result) => {

        if(err){
            console.log("Admin POST error: " + err);
        }

        setTimeout(function(){
            console.log("AdminUn: " + JSON.stringify(adminUn));
            console.log("AdminPw: " + adminPw);

            /*
            var x = JSON.parse(JSON.stringify(result));
            console.log("Result Admin POST: " + x);
            */
        }, 100);
        
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

//PUT - ADMIN
app.put('/api/update/admin', (req, res) => {

    const name = req.body.adminUn;
    const permL = req.body.adminPermL;
    const sqlUpdate = "UPDATE admin SET AdminPermL = ? WHERE AdminUn = ?";

    db.query(sqlUpdate, [permL, name], (err, result) => { //Fontos a sorrend, első a PostStatus, aztán a PostName, gondolom az sql szintaktika miatt
        if(err){
            console.log("Admin UPDATE error: " + err);
        }
    });
});

/*
* USERS CRUD
*/

//GET - USERS
app.get('/api/get/users', (req, res) => {
    
    const sqlSelect = "SELECT * FROM users";

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Users GET error: " + err);
        }

        console.log("Users GET result: " + result.data); //still not working properly
        res.send(result);
    });
});

//POST - USERS
app.post('/api/insert/users', (req, res) => {

    const userUn = req.body.userUn;
    const userPw = req.body.userPw;
    const userFN = req.body.userFN;
    const userSN = req.body.userSN;
    const userDob = req.body.userDob;
    const userEmail = req.body.userEmail;

    const sqlInsert = "INSERT INTO `users` (`UserUn`, `UserPw`, `UserFN`, `UserSN`, `UserDob`, `UserEmail`) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [userUn, userPw, userFN, userSN, userDob, userEmail], (err, result) => {

        console.log("Users INSERT INTO error: " + err);
        console.log("Users INSERT INTO result: " + result);
        res.send(result);
    });
});

//DELETE - USERS
app.delete('/api/delete/users/:userUn', (req, res) => {
    const name = req.params.userUn;
    const sqlDelete = "DELETE FROM users WHERE UserUn = ?";
    db.query(sqlDelete, name, (err, result) => {
        if(err){
            console.log("Users DELETE error: " + err);
        }
        console.log("Users DELETE result: " + result);
    });
});

//PUT - USERS
app.put('/api/update/users', (req, res) => {

    const name = req.body.userUn;
    const userE = req.body.userEmail;
    const sqlUpdate = "UPDATE users SET UserEmail = ? WHERE UserUn = ?";

    db.query(sqlUpdate, [userE, name], (err, result) => {                       //Fontos a sorrend, első a PostStatus, aztán a PostName, gondolom az sql szintaktika miatt
        if(err){
            console.log("Users UPDATE error: " + err);
        }
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});