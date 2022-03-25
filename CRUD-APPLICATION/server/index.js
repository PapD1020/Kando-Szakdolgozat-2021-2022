const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const { json } = require('body-parser');
const Nanoid = require('nanoid');
const bcrypt = require('bcrypt');
const { response } = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const saltRounds = 10;

const jwt = require('jsonwebtoken');


//Nethelyes
const db = mysql.createPool({
    host: 'mysql.nethely.hu',
    user: 'ideashare',
    password: 'KozosAdatbazis1',
    database: 'ideashare'
});


//Xampos
/*
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ideashare'
});
*/
//Middleware
//app.use(cors());  without express-session

//for express-session
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true //enables cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//initialize session
app.use(session({
    key: "userId",
    secret: "secret", //lehet meg kell változtatni
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 //ez 24 óra 
    },
}));


/*
app.get('/', (req, res)=>{      //req is used to get information from the frontend
    res.send("Hello world");    //sending this information to frontend (not yet to react)
})
*/

/*
app.get("/", (req, res) => {
    //Test to see if the database connection works

    const sqlInsert = "INSERT INTO `Articles`(`ArticleName`, `ArticleDate`, `ArticleSmDescr`, `ArticleMDescr`, `ArticleImg`, `ArticleStatus`) VALUES ('Első Poszt neve','2022-02-10','kicsi leírás','nagy lerás','kép','1')";
    db.query(sqlInsert, (err, result) => {

        res.send("Hello");
    });
});
*/

/*
* POST CRUD
*/





//GET - Article

//kikommentelve, Danié, működik, minden Articlet lekér. Helyette: egyesével kérés header alapján
/*app.get('/api/get/article', (req, res) => {

    const sqlSelect = "SELECT * FROM Articles";
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Article GET error: " + err);
        }

        console.log("Result:" + result);                //valamiért Object-et kapok terminálban
        res.send(result);
    });
});*/

/*
//Egyenkénti lekérdezés
app.get('/api/get/article', (req, res) => {

    //const item = req.body.item-1; POST-hoz body kérés
    const item = req.get("item")-1;
    console.log(item);
    const sqlSelect = "SELECT * FROM Articles ORDER BY ArticleId ASC LIMIT 1 OFFSET " + item + "";
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Article GET error: " + err);
        }

        //console.log(result[0].ArticleId);                //valamiért Object-et kapok terminálban
        res.send(result);
    });
});*/
//GET - Post single
app.get('/api/get/article/:articleId', (req, res) => {
    const id = req.params.articleId;
    const sqlSelect = "SELECT * FROM Articles WHERE ArticleId = ?";
    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log("Article GET error: " + err);
        }

        console.log(result);                //valamiért Object-et kapok terminálban
        res.send(result);
    });
});
//GET - Post
app.get('/api/get/articleall', (req, res) => {

    const sqlSelect = "SELECT * FROM Articles";
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Article GET error: " + err);
        }

        console.log("Result:" + result);                //valamiért Object-et kapok terminálban
        res.send(result);
    });
});
//20-asával lekérdezés
app.get('/api/get/article', (req, res) => {

    //const item = req.body.item-1; POST-hoz body kérés
    const item = req.get("item")-1;
    console.log(item);
    //const sqlSelect = "SELECT * FROM Articles ORDER BY ArticleId ASC LIMIT 1 OFFSET " + item + "";
    const sqlSelect = "SELECT * FROM Articles ORDER BY ArticleId ASC LIMIT 20  OFFSET " + item + "";
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Article GET error: " + err);
        }
        if (!result){
            res.status(404).send('Not found');
        }else{
        //console.log(result[0].ArticleId);                //valamiért Object-et kapok terminálban
        console.log(result);
        res.send(result);
        }
    });
});

//POST - Article
app.post('/api/insert/article', (req, res) => {

    const articleId = Nanoid.nanoid();
    const articleName = req.body.articleName;
    const articleSmDescr = req.body.articleSmDescr;
    const articleMDescr = req.body.articleMDescr;
    const articleImg = req.body.articleImg;
    const articleType = req.body.articleType;
    const articleStatus = 1;
    const articleCreatedAt = req.body.articleCreatedAt;
    const articleUpdatedAt = req.body.articleUpdatedAt;

    const sqlInsert = "INSERT INTO `Articles`(`ArticleId`, `ArticleName`, `ArticleSmDescr`, `ArticleMDescr`, `ArticleImg`, `ArticleType`, `ArticleStatus`, `ArticleCreatedAt`, `ArticleUpdatedAt`) VALUES (?,?,?,?,?,?,?,?,?)"
    db.query(sqlInsert, [articleId, articleName, articleSmDescr, articleMDescr, articleImg, articleType, articleStatus, articleCreatedAt, articleUpdatedAt], (err, result) => {

        if(err){
            console.log("Article POST error: " + err);
        }

        console.log("Nanoid: " + articleId);
        console.log("Article createdAt: " + articleCreatedAt);
        console.log("Article type: " + articleType);
        res.send(result);
    });
});

//DELETE - Article
app.delete('/api/delete/article/:articleName', (req, res) => {
    const name = req.params.articleName;
    const sqlDelete = "DELETE FROM Articles WHERE ArticleName = ?";
    db.query(sqlDelete, name, (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

app.put('/api/update/article', (req, res) => {
    const id=req.body.articleId;
    const name = req.body.articleName;
    const smdescr =req.body.articleSmDescr;
    const mdescr = req.body.articleMDescr;
    const img = req.body.articleImg;
    const type = req.body.articleType;
    const status = req.body.articleStatus;
    const updated = req.body.articleUpdatedAt;
    const sqlUpdate = "UPDATE Articles SET ArticleName = ?, ArticleStatus = ?, ArticleSmDescr = ?, ArticleMDescr = ?, ArticleImg = ?, ArticleType = ?, ArticleUpdatedAt = ? WHERE ArticleId = ?";
console.log(name);
    db.query(sqlUpdate, [name,status, smdescr, mdescr, img,type, updated, id], (err, result) => { //Fontos a sorrend, első a PostStatus, aztán a PostName, gondolom az sql szintaktika miatt
        if(err){
            console.log(err);
        }
    });
});


/*
* USERS CRUD
*/
//GET - Post single
app.get('/api/get/user/:userId', (req, res) => {
    const id = req.params.userId;
    const sqlSelect = "SELECT * FROM Users WHERE UserId = ?";
    db.query(sqlSelect, id, (err, result) => {
        if(err){
            console.log("Article GET error: " + err);
        }

        console.log(result);                //valamiért Object-et kapok terminálban
        res.send(result);
    });
});
//GET - USERS
app.get('/api/get/user', (req, res) => {
    
    const sqlSelect = "SELECT * FROM Users";

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Users GET error: " + err);
        }

        console.log("Users GET result: " + result.data); //still not working properly
        res.send(result);
    });
});

//POST - USERS
app.post('/api/insert/user', (req, res) => {

    const userId = Nanoid.nanoid();
    const userUn = req.body.userUn;
    const userPP = req.body.userPP;
    const userPw = req.body.userPw;
    const userFN = req.body.userFN;
    const userSN = req.body.userSN;
    const userDob = req.body.userDob;
    const userEmail = req.body.userEmail;
    const userCreatedAt = req.body.userCreatedAt;
    const userUpdatedAt = req.body.userUpdatedAt;

    const sqlInsert = "INSERT INTO `Users` (`UserId`, `UserUn`, `UserPP`, `UserPw`, `UserFN`, `UserSN`, `UserDob`, `UserEmail`, `UserCreatedAt`, `UserUpdatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?)"
    db.query(sqlInsert, [userId, userUn, userPP, userPw, userFN, userSN, userDob, userEmail, userCreatedAt, userUpdatedAt], (err, result) => {

        console.log("Users INSERT INTO error: " + err);
        console.log("Users INSERT INTO result: " + result);
        console.log("userCreatedAt: " + userCreatedAt);
        console.log(JSON.stringify(req.body));
        res.send(result);
    });
});

//DELETE - USERS
app.delete('/api/delete/user/:userUn', (req, res) => {
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
app.put('/api/update/user', (req, res) => {
    const id=req.body.userId;
    const name = req.body.userUn;
    const password =req.body.userPw;
    const firstname= req.body.userFN;
    const secondname= req.body.userSN;
    const userdob=req.body.userDob;  
    const userE = req.body.userEmail;
    const userPL = req.body.userPL;
    const updated = req.body.userUpdatedAt;
    const sqlUpdate = "UPDATE users SET UserUn = ?, UserPw = ?, UserFN=?, UserSN=?,UserDob = ?, UserEmail = ?,UserPL=?, UserUpdatedAt = ? WHERE UserId = ?";

    db.query(sqlUpdate, [name, password, firstname, secondname, userdob, userE,userPL, updated,id ], (err, result) => {                       //Fontos a sorrend, első a PostStatus, aztán a PostName, gondolom az sql szintaktika miatt
        if(err){
            console.log("Users UPDATE error: " + err);
        }
    });
});

/************************************************REGISTRATION - LOGIN**********************************************************/

//REGISTER - USERS
app.post('/api/register/user', (req, res) => {

    console.log("Register users req.body: "+ JSON.stringify(req.body)); //ez jó
    const userId = Nanoid.nanoid();
    const userUn = req.body.userUn;
    const userPP = req.body.userPP;    
    const userPw = req.body.userPw;
    const userFN = req.body.userFN;
    const userSN = req.body.userSN;
    const userDob = req.body.userDob;
    const userEmail = req.body.userEmail;
    const userPL = 1;
    const userCreatedAt = req.body.userCreatedAt;
    const userUpdatedAt = req.body.userUpdatedAt;

    bcrypt.hash(userPw, saltRounds, (err, hash) => {

        const sqlInsert = "INSERT INTO `Users` (`UserId`, `UserUn`, `UserPP`, `UserPw`, `UserFN`, `UserSN`, `UserDob`, `UserEmail`, `UserPL`, `UserCreatedAt`, `UserUpdatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"

        if(err){
            console.log("Registration - bcrypt error: " + err);
        }

        db.query(sqlInsert, [userId, userUn, userPP, hash, userFN, userSN, userDob, userEmail, userPL, userCreatedAt, userUpdatedAt], (err, result) => {

            console.log("UserUn: " + JSON.stringify(req.body.UserUn));

            if(err){
                console.log("Users REGISTER INTO error: " + err);
            }

            //console.log("Users REGISTER INTO result: " + result);
            res.send(result);
        });
    });
});

//Session check
app.get('/api/login/user', (req, res) => {
    if(req.session.user){ //megnézzük, hogy van-e már egy ilyen "user"-ünk
        res.send({loggedIn: true, user: req.session.user});
    }
    else{
        res.send({loggedIn: false});
    }
});

//verifyJWT
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]; //Grabing the token from the headers

    if(!token){ //Ha nincs token
        res.send("We need a token. Not authenticated.");
    }
    else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err){
                res.json({auth: false, message: "Failed to authenticate."});
            }
            else{
                req.DecodedUserId = decoded.UserId;
                next();
            }
        });
    }
};

//Authentication
app.get('/api/login/user/auth', verifyJWT, (req, res) => {
    res.send("You are authenticated!");
});

//LOGIN - CHECK IF USER EXISTS - USERS
app.post('/api/login/user', (req, res) => {

    console.log("Login users req.body: " + JSON.stringify(req.body)); //ez jó
    const userUn = req.body.userUn;
    const userPw = req.body.userPw;

    //const sqlInsert = "SELECT UserUn, UserPw FROM Users WHERE UserUn = ? AND UserPw = ?"; - pw hash nélkül
    const sqlInsert = "SELECT UserId, UserUn, UserPw FROM Users WHERE UserUn = ?";
    db.query(sqlInsert, [userUn], (err, result) => {

        if(err){
            //Front-end is expecting an object that is why:
            res.send({err: err}); //sending error to front-end
            console.log("Users LOGIN SELECT * error: " + err);
        }

        if(result.length > 0){ //checks if there is a user and password with the sent UserUn and UserPw
            console.log("result.length: " + result.length);
            console.log("pw hash: " + result[0].UserPw);
            console.log("Bejelentkezett user neve: " + result[0].UserUn);
            console.log("Bejelentkezett user idja: " + result[0].UserId);
            bcrypt.compare(userPw, result[0].UserPw, (err, response) => {
                
                if(response){
                    req.session.user = result;

                    //JWT - create web token every time the a user loggs in

                    const id = result[0].UserId;
                    const token = jwt.sign({id}, "jwtSecret", { //ezt a secretet kell a verify-nál is megadni (verifyJWT)
                        expiresIn: 300, //5 mins
                    }); //creating token based on the user's id, secretet meg kell változtatni, azaz .inv file/variable vagy mivel

                    req.session.user = result;

                    //ellenőrzés
                    console.log("Session ellenőrzés: " + JSON.stringify(req.session.user));
                    //res.send(result); //all the information from the data base of the user !!! mivel ez ki van kommeztezve, a frontenden a response.data[0].UserUn nem működik
                    res.json({auth: true, token: token, result: result});
                }
                else{
                    //res.send({message: "Wrong username or password!"}); jwt előtt
                    res.json({auth: false, message: "Wrong username or password."});
                }
            }) //pass the password the user inputed and comapre it with the one in the database
        }
        else{
            //res.send({message: "The user does not exists"}); jwt előtt
            res.json({auth: false, message: "No user exists."});
        }
    });
});

/************************************************Profile - Udpate********************************************/
//USER - Profile page (data Update)
app.put('/api/update/user:userId', (req, res) => {

    const userId = req.body.userId;
    const userUn = req.body.userUn;
    const userPP = req.body.userPP;
    const userPw = req.body.userPw;
    const userFN = req.body.userFN;
    const userSN = req.body.userSN;
    //születési dátumot ne tudjon már véltoztatni
    const userEmail = req.body.userEmail;
    const userUpdatedAt = req.body.userUpdatedAt;
    const sqlUpdate = "UPDATE users SET UserUn = ?, UserPP = ?, UserPw = ?, UserFN = ?, UserSN = ?, UserEmail = ?, UserUpdatedAt = ? WHERE UserId = ?";

    db.query(sqlUpdate, [userUn, userPP, userPw, userFN, userSN, userEmail, userUpdatedAt, userId], (err, result) => {                       //Fontos a sorrend, első a ArticleStatus, aztán a ArticleName, gondolom az sql szintaktika miatt
        if(err){
            console.log("Users Profile data UPDATE error: " + err);
        }
    });
});

/**********************************************Article - Update********************************************/
//ARTICLE - Edit Article (data update)
app.put('/api/update/article:articleId', (req, res) => {

    const articleName = req.body.articleName;
    const articleSmDescr = req.body.articleSmDescr;
    const articleMDescr = req.body.articleMDescr;
    const articleImg = req.body.articleImg;
    const articleUpdatedAt = req.body.articleUpdatedAt;
    //articleType
    const sqlUpdate = "UPDATE Articles SET ArticleName = ?, ArticleSmDescr = ?, ArticleMDescr = ?, ArticleImg = ?, ArticleUpdatedAt = ? WHERE ArticleId = ?";

    db.query(sqlUpdate, [articleName, articleSmDescr, articleMDescr, articleImg, articleUpdatedAt], (err, result) => { //Fontos a sorrend, első a ArticleStatus, aztán a ArticleName, gondolom az sql szintaktika miatt
        if(err){
            console.log("Artcile update err: " + err);
        }
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});