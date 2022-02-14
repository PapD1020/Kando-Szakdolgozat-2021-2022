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

//GET - SELECT*
app.get('/api/get', (req, res) => {

    const sqlSelect = "SELECT * FROM post";
    db.query(sqlSelect, (err, result) => {

        console.log("Result:" + result); //valamiért Object-et kapok terminálban
        res.send(result);
    });
});

//POST - INSERT
app.post('/api/insert', (req, res) => {

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

//DELETE
app.delete('/api/delete/:postName', (req, res) => {
    const name = req.params.postName;
    const sqlDelete = "DELETE FROM post WHERE PostName = ?";
    db.query(sqlDelete, name, (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});