const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ideasharedb'
});

/*
app.get('/', (req, res)=>{      //req is used to get information from the frontend
    res.send("Hello world");    //sending this information to frontend (not yet to react)
})
*/

app.get("/", (req, res) => {

    const sqlInsert = "INSERT INTO `post`(`PostName`, `PostDate`, `PostSmDescr`, `PostMDescr`, `PostImg`, `PostStatus`) VALUES ('Első Poszt neve','2022-02-10','kicsi leírás','nagy lerás','kép','1')";
    db.query(sqlInsert, (err, result) => {

        res.send("Hello");
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});