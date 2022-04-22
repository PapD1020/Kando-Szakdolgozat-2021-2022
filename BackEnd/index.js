const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const { json } = require('body-parser');
const Nanoid = require('nanoid');
const bcrypt = require('bcryptjs');
const { response } = require('express');
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
//for express-session
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true //enables cookies
}));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//initialize session
app.set('trust proxy', 1);
app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 24 * 60 * 60 * 1000 //ez 24 óra
    },
}));

/*
* POST CRUD
*/
//GET - Article
//Dani - chooseArticles.js
app.get('/api/get/article/allById', (req, res) => {

    const userId = req.get("userId");
    
    const sqlSelect = "SELECT * FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId = ArticleUser.AId WHERE ArticleUser.UId = ? AND ArticleStatus != -1";

    db.query(sqlSelect, [userId], (err, result) => {
        if(err){
            res.status(500).send({message: err.message});
        }else if (result.length == 0){
            res.status(404).send({message:'Not found'});
        }else{
            res.status(200).send(result);
        }
    });
});

//Dani - editArticle.js
app.get('/api/get/article/oneById', (req, res) => {

    const articleId = req.get("articleId");
    console.log("articleId: " + articleId);

    const sqlSelect = "SELECT * FROM Articles WHERE articleId = ?";
    console.log("oneById select: " + sqlSelect);

    db.query(sqlSelect, [articleId], (err, result) => {

        if(err){
            res.status(500).send({message: err.message});
        }else if (result.length == 0){
            res.status(404).send({message:'Not found'});
        }else{
            res.status(200).send(result);
        }
    });
});

//20-asával lekérdezés
//Dani - articles.js
//Márk - home/articles.js
app.get('/api/get/article', (req, res) => {

    const item = req.get("item")-1;

    const sqlSelect = "SELECT Articles.*, Users.UserUn, Users.UserId, Users.UserPP FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId = ArticleUser.AId INNER JOIN Users ON ArticleUser.UId = Users.UserId AND Articles.ArticleStatus = 1 ORDER BY ArticleId ASC LIMIT 20  OFFSET ?";
    
    db.query(sqlSelect, [item],(err, result) => {
        if(err){
            res.status(500).send({message: err.message});
        }else if (result.length == 0){
            res.status(404).send({message:'Not found'});
        }else{
            res.status(200).send(result);
        }
    });
});

/**Article kiválasztása editeléshez - bejelentkezett user id-ja alapján kilistásázásuk**/
//20-asával lekérdezés
//Márk - usersArticles/articles.js
app.get('/api/get/article/byId', (req, res) => {

    //const item = req.body.item-1; POST-hoz body kérés
    const item = req.get("item")-1;
    const userId = req.get("userId");

    const sqlSelect = "SELECT * FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId = ArticleUser.AId WHERE ArticleUser.UId = ? ORDER BY Articles.ArticleId ASC LIMIT 20 OFFSET ?";
    
    db.query(sqlSelect, [userId,item], (err, result) => {
        if(err){
            res.status(500).send({message: err.message});
        }
        if (result.length == 0){
            res.status(404).send({message: 'Not found'});
        }else{
            res.status(200).send(result);
        }
    });
});


//Márk
//GET - Article Searching
app.get('/api/get/article/search/', (req, res) => {
    const searchedString = "%" + req.get("searchedString") + "%";
    const item = req.get("item")-1;

    const sqlSelect = "SELECT Articles.*, Users.UserUn, Users.UserId, Users.UserPP FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId = ArticleUser.AId INNER JOIN Users ON ArticleUser.UId = Users.UserId AND Articles.ArticleStatus = 1 WHERE ArticleName LIKE ? ORDER BY ArticleId ASC LIMIT 20 OFFSET ?";
    //const sqlSelect = "SELECT * FROM Articles WHERE ArticleName LIKE ?";
    db.query(sqlSelect, [searchedString,item], (err, result) => {
        if(err){
            res.status(500).send({message: err.message});
        }
        if (result.length == 0){
            res.status(404).send({message: 'Not found'});
        }else{
            res.status(200).send(result);
        }
    });
});

//Márk
//GET - UsersArticle Searching
app.get('/api/get/article/search/byId', (req, res) => {
    const searchedString = "%" + req.get("searchedString") + "%";
    const item = req.get("item")-1;
    const userId = req.get("userId");

    const sqlSelect = "SELECT * FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId = ArticleUser.AId WHERE ArticleUser.UId = ? AND ArticleName LIKE ? ORDER BY Articles.ArticleId ASC LIMIT 20 OFFSET ?";
    //const sqlSelect = "SELECT * FROM Articles WHERE ArticleName LIKE ?";
    db.query(sqlSelect, [userId, searchedString, item, ], (err, result) => {
        if(err){
            res.status(500).send({message: err.message});
        }
        if (result.length == 0){
            res.status(404).send({message: 'Not found'});
        }else{
            res.status(200).send(result);
        }
    });
});

//POST - Article by userId
//Dani - createArticle.js
//Márk - newArticle/articleDataForm.js
app.post('/api/insert/article/byId', (req, res) => {

    var articleImg
    if ( req.body.articleImg == undefined || req.body.articleImg == '' || req.body.articleImg == null ) 
    {
        articleImg = 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg';
    }
    else
    {
        articleImg = req.body.articleImg;
    }

    const articleId = Nanoid.nanoid();
    const userId = req.body.userId;
    const articleName = req.body.articleName;
    const articleSmDescr = req.body.articleSmDescr;
    const articleMDescr = req.body.articleMDescr;
    const articleType = req.body.articleType;
    const articleStatus = 1;
    const articleCreatedAt = req.body.articleCreatedAt;
    const articleUpdatedAt = req.body.articleUpdatedAt;

    const sqlInsert = "INSERT INTO `Articles`(`ArticleId`, `ArticleName`, `ArticleSmDescr`, `ArticleMDescr`, `ArticleImg`, `ArticleType`, `ArticleStatus`, `ArticleCreatedAt`, `ArticleUpdatedAt`) VALUES (?,?,?,?,?,?,?,?,?); INSERT INTO `ArticleUser`(`Uid`, `Aid`) VALUES (?, ?)";


        db.query(sqlInsert, [articleId, articleName, articleSmDescr, articleMDescr, articleImg, articleType, articleStatus, articleCreatedAt, articleUpdatedAt, userId, articleId], (err, result) => {

            if(err){
                if(err.errno == 1062){
                    res.status(409).send({message: "There's a post with exactly same small or detailed description"});
                }
                else{
                    res.status(500).send({message: err.message});
                }
            }
            else{
               // res.status(200).send(JSON.stringify(result[0]) + JSON.stringify(result[1]));
               res.status(200).send({message: "Article successfully created."});
            }
        });
});

//PUT-UPDATE - Article
//Dani - editArticle.js
//Márk - usersArticles/articles.js
app.put('/api/update/article/byUser', (req, res) => {

    const articleId = req.body.articleId;
    const articleName = req.body.articleName;
    const articleSmDescr = req.body.articleSmDescr;
    const articleMDescr = req.body.articleMDescr;
    const articleImg = req.body.articleImg;
    const articleType = req.body.articleType;
    const articleStatus = req.body.articleStatus;
    const articleUpdatedAt = req.body.articleUpdatedAt;

    const sqlUpdate = "UPDATE Articles SET ArticleName = ?, ArticleSmDescr = ?, ArticleMDescr = ?, ArticleImg = ?, ArticleType = ?, ArticleStatus = ?, ArticleUpdatedAt = ? WHERE ArticleId = ?";

    db.query(sqlUpdate, [articleName, articleSmDescr, articleMDescr, articleImg, articleType, articleStatus, articleUpdatedAt, articleId], (err, result) => { //Fontos a sorrend, első a ArticleStatus, aztán a ArticleName, gondolom az sql szintaktika miatt
        
        if(err){
            console.log(err);
            if(err.errno == 1062){
                res.status(409).send({message: "There is a post with the exact same small or main description"});
            }
            else{
                res.status(500).send({message: err.message});
            }
        }
        else{
            res.status(200).send({result: result, message: "Changed successfully"});
        }
    });
});

/*
* USERS CRUD
*/


/************************************************REGISTRATION - LOGIN**********************************************************/

//REGISTER - USERS
//Dani - login.js
//Márk - authScreen.js
app.post('/api/register/user', (req, res) => {

    var userPP;

    if ( req.body.userPP == undefined || req.body.userPP == '' || req.body.userPP == null ) 
    {
        userPP = 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png';
    }
    else
    {
        userPP = req.body.userPP;
    }

    const userId = Nanoid.nanoid();
    const userUn = req.body.userUn;
    const userPw = req.body.userPw;
    const userFN = req.body.userFN;
    const userSN = req.body.userSN;
    const userDob = req.body.userDob;
    const userEmail = req.body.userEmail;
    const userPL = 1;
    const userCreatedAt = req.body.userCreatedAt;
    const userUpdatedAt = req.body.userUpdatedAt;

    bcrypt.hash(userPw, saltRounds, (err, hash) => {

        if(err){
            res.status(500).send({message: err.message});
            //console.log("Registration - bcrypt error: " + err);
        }else{

            const sqlInsert = "INSERT INTO `Users` (`UserId`, `UserUn`, `UserPP`, `UserPw`, `UserFN`, `UserSN`, `UserDob`, `UserEmail`, `UserPL`, `UserCreatedAt`, `UserUpdatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

            db.query(sqlInsert, [userId, userUn, userPP, hash, userFN, userSN, userDob, userEmail, userPL, userCreatedAt, userUpdatedAt], (err, result) => {

                if(err){
                    if(err.errno == 1062){
                        res.status(409).send({message: "This username is already in use."});
                    }
                    else{
                        res.status(500).send({message: err.message});
                    }
                }
                else{
                    res.status(200).send({result: result, message: "Registration was successfull"});
                }
            });
        }
    });
});

//Session check
//Dani - majdnem minden oldalon
app.get('/api/login/user', (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});


//Destroy cookie 2.0
app.get('/api/user/logout', (req, res) => {
    req.session.destroy((err) => {
        
    });

    res.clearCookie("userId").send({loggedIn: false, cookiesDestroyed: true});
  });

//verifyJWT
//Dani 
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
//MEG KELL NÉZNI
//Dani
//Márk - authScreen.js
app.get('/api/login/user/auth', verifyJWT, (req, res) => {
    if(verifyJWT){
        res.send({isUserAuth: true, message: "You are authenticated!"});
    }else{
        res.send({isUserAuth: false, message: "You are NOT authenticated!"});
    }
});

//LOGIN - CHECK IF USER EXISTS - USERS
//Dani - login.js
//Márk - authScreen.js
app.post('/api/login/user', (req, res) => {

    const userUn = req.body.userUn;
    const userPw = req.body.userPw;

    const sqlInsert = "SELECT UserId, UserPP, UserUn, UserPw, UserPL FROM Users WHERE UserUn LIKE BINARY ?";
    db.query(sqlInsert, [userUn], (err, result) => {

        if(err){
            res.status(500).send({message: err.message});
            /*res.send({err: err});
            console.log("Users LOGIN SELECT * error: " + err);*/
        }else if(result.length > 0){

            bcrypt.compare(userPw, result[0].UserPw, (err, response) => {
                
                if(response){
                    req.session.user = result;

                    //JWT creation
                    const id = result[0].UserId;
                    const token = jwt.sign({id}, "jwtSecret", { //ezt a secretet kell a verify-nál is megadni (verifyJWT)
                        expiresIn: 3600, //60 mins, 300 = 5 mins
                    });

                    req.session.user = result;

                    res.json({auth: true, token: token, result: result, message: "Log in successfull!"});

                }else{

                    res.json({auth: false, message: "Wrong username or password."});
                
                }
            })
        }
        else{
            res.json({auth: false, message: "No user exists."});
        }
    });
});

/************************************************Profile - Udpate********************************************/
//USER - Profile page (data Update)
//Dani - profilePage.js
//Márk - settings/userDataForm
app.put('/api/update/user/userId', (req, res) => {
    const userId = req.body.userId;
    const userPP = req.body.userPP;
    const userFN = req.body.userFN;
    const userSN = req.body.userSN;
    const userEmail = req.body.userEmail;
    const userUpdatedAt = req.body.userUpdatedAt;

        const sqlUpdate = "UPDATE Users SET UserPP = ?, UserFN = ?, UserSN = ?, UserEmail = ?, UserUpdatedAt = ? WHERE UserId = ?";

        db.query(sqlUpdate, [userPP, userFN, userSN, userEmail, userUpdatedAt, userId], (err, result) => {

            if(err){
                if(err.errno == 1062){
                    res.status(409).send({message: "This email address is already in use."});
                }
                else{
                    res.status(500).send({message: err.message});
                }
            }
            else{
                res.status(200).send({result: result, message: "Changed successfully"});
            }
        });
});

//Password change
//Dani - profilePage.js
app.put('/api/update/user/password', (req, res) => {
    const userId = req.body.userId;
    const userPw = req.body.userPw;
    const userUpdatedAt = req.body.userUpdatedAt;

    bcrypt.hash(userPw, saltRounds, (err, hash) => {
        if(err){
            res.status(500).send({message: err.message});
            //console.log("Change password - bcrypt error: " + err);
        }else{

        const sqlUpdate = "UPDATE Users SET UserPw = ?, UserUpdatedAt = ? WHERE UserId = ?";

        db.query(sqlUpdate, [hash, userUpdatedAt, userId], (err, result) => {
        if(err){
            res.status(500).send({message: err.message});
            //console.log("User password change sql error: " + err);
        }
        });
    }
    });
});

//Get user by Id for profilePage default data
//Dani - profilePage
//Márk - Home/Articles.js (profile picture onPress, modal)
app.get("/api/get/userById", (req, res) => {
    
    const userIdUpd = req.get("userIdUpd");
    console.log("userIdUpd: " + userIdUpd);

    sqlSelect = "SELECT * FROM Users WHERE UserId = " + "'" + userIdUpd + "'";
    console.log("sqlSelect: " + sqlSelect);

    db.query(sqlSelect, userIdUpd, (err, result) => {
        if(err){
            res.status(500).send({message: err.message});
            //console.log("User get byId error: " + err);
        }else{
            res.send(result);
        }
    });
});


/**************************************************COMMENT*********************************************************************/

//GET-20-asával lekérdezés
//Márk - home/comments.js
app.get('/api/get/comments/byId', (req, res) => {

    const item = req.get("item")-1;
    const articleId = req.get("articleId");
    
    const sqlSelect = "SELECT Users.UserUn,Users.UserPP,Comments.Comment FROM Comments INNER JOIN UserComment ON UserComment.CId = Comments.CommentId INNER JOIN Users ON Users.UserId = UserComment.UId INNER JOIN ArticleComment ON ArticleComment.CId = Comments.CommentId WHERE ArticleComment.AId = ? ORDER BY CommentCreatedAt ASC LIMIT 20 OFFSET ?";

    db.query(sqlSelect, [articleId,item], (err, result) => {

        if(err){
            res.status(500).send({message: err.message});
        }
        else{
            res.status(200).send(result);
        }
    });
});

//POST-COMMENT
//Márk - home/comments.js
app.post('/api/insert/comment', (req, res) => {

    const commentId = Nanoid.nanoid();
    const userId = req.body.userId;
    const articleId = req.body.articleId;
    const comment=req.body.comment;
    const commentCreatedAt = req.body.commentCreatedAt;
  
    //const sqlInsert = "INSERT INTO `ArticleComment`(`CommentId`, `UserId`, `ArticleId`,`Comment`,`CommentCreatedAt`) VALUES (?,?,?,?,?)";
    const sqlInsert = "INSERT INTO Comments (`CommentId`, `Comment`, `CommentCreatedAt`) VALUES (?,?,?)"
    db.query(sqlInsert, [commentId,comment,commentCreatedAt], (err, result) => {

        if(err){
            res.status(500).send({message: err.message});
        }else{

            const sqlInsert2 = "INSERT INTO UserComment (`UId`, `CId`) VALUES (?,?)"
            db.query(sqlInsert2, [userId,commentId], (err, result) => {

                if(err){
                    res.status(500).send({message: err.message});
                }else{

                    const sqlInsert3 = "INSERT INTO ArticleComment( `AId`, `CId` ) VALUES (?,?)"
                    db.query(sqlInsert3, [articleId,commentId], (err, result) => {

                        if(err){
                            res.status(500).send({message: err.message});
                        }
                        else{
                            res.sendStatus(200);
                        }
                    });

                }
            });

        }
    });
   
    
});

//DELETE-COMMENT
app.delete('/api/delete/comment/:commentId', (req, res) => {
    console.log("eeee");
    const id = req.params.commentId;
    const sqlDelete = "DELETE FROM ArticleComment WHERE CId = ?;DELETE FROM UserComment WHERE CId = ?;";
    db.query(sqlDelete, [id,id], (err, result) => {
        if(err){
            res.status(500).send({message: err.message});
            //console.log(err.message)

        }else{
            

            const sqlDelete = "DELETE FROM Comments WHERE CommentId = ?";
            db.query(sqlDelete, id, (err, result) => {
                if(err){
                    res.status(500).send({message: err.message});
                    //console.log(err.message)
                }else{
                    res.status(200).send({message: "Comment deleted"})
                }
            
            });
        }
        
    });
});

/**************************************************FAVORITE*********************************************************************/

//Favories
//20-asával lekérdezés
//Márk - usersFavorites/articles.js
app.get('/api/get/article/favorite/byId', (req, res) => {

    //const item = req.body.item-1; POST-hoz body kérés
    const item = req.get("item")-1;
    const userId = req.get("userId");
console.log(item + userId);
    const sqlSelect = "SELECT Articles.*, Users.UserUn, Users.UserId, Users.UserPP, UserFavorite.FavoriteId FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId = ArticleUser.AId INNER JOIN Users ON ArticleUser.UId = Users.UserId AND Articles.ArticleStatus = 1 INNER JOIN UserFavorite ON Articles.ArticleId=UserFavorite.ArticleId WHERE UserFavorite.UserId = ? ORDER BY Articles.ArticleId ASC LIMIT 20 OFFSET ?";
    
    db.query(sqlSelect, [userId,item], (err, result) => {
        if(err){
            console.log(sqlSelect)
            res.status(500).send({message: err.message});
        }
        else if (result.length == 0){
            res.status(404).send({message: 'Not found'});
        }else{
            res.status(200).send(result);
        }
        console.log(result);
    });
});


//POST-Favorite
//Tomi
//Márk - Home/Articles.js
app.post('/api/insert/favorite', (req, res) => {

    const favoriteId = Nanoid.nanoid();
    const userId = req.body.userId;
    const articleId = req.body.articleId;
 

    const sqlInsert = "INSERT INTO `UserFavorite`(`FavoriteId`, `UserId`, `ArticleId`) VALUES (?,?,?)";
    db.query(sqlInsert, [favoriteId,userId,articleId], (err, result) => {

        if(err){
            res.status(500).send({message: err.message});
        }
        else{
            res.status(200).send({message: "Added to favorites"});
        }
        
    });
});

//DELETE-Favorite
//Tomi
//Márk - UsersFavorites/Articles.js
app.delete('/api/delete/favorite/:favoriteId', (req, res) => {
    const id = req.params.favoriteId;
    console.log(id);
    const sqlDelete = "DELETE FROM UserFavorite WHERE FavoriteId = ?";
    db.query(sqlDelete, id, (err, result) => {
        if(err){
            res.status(500).send({message: err.message});
        }
        else{
            res.status(200).send({message: "Removed from favorites"});
        }
    });
});

/******************************************************TOMI**********************************************************/
//GET - Article
//Tomi
//GET - Article Searching
app.get('/api/get/article/search/:articleName', (req, res) => {
    const name = "%" +req.params.articleName + "%";
    console.log(name);
    const sqlSelect = "SELECT * FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId = ArticleUser.AId  INNER JOIN Users ON  ArticleUser.UId=Users.UserId WHERE ArticleName LIKE ?";
    db.query(sqlSelect, name, (err, result) => {
        if(err){
            console.log("Article GET error: " + err);
        }

        console.log("Result FIGYELD:" + result);               //valamiért Object-et kapok terminálban
        res.send(result);
    });
});

//GET - All
//Tomi
app.get('/api/get/articleall', (req, res) => {

    const sqlSelect = "SELECT * FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId = ArticleUser.AId  INNER JOIN Users ON  ArticleUser.UId=Users.UserId ORDER BY Articles.ArticleUpdatedAt DESC";
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Article GET error: " + err);
        }

        console.log("Result FIGYELD:" + result);                //valamiért Object-et kapok terminálban
        res.send(result);
    });
});

//Tomi
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

//Tomi
//DELETE - Article
app.delete('/api/delete/article/:articleId', (req, res) => {
    const id = req.params.articleId;
    //DELETE Articles FROM Articles INNER JOIN ArticleComment ON Articles.ArticleId=ArticleComment.ArticleId WHERE Articles.ArticleId = ?;DELETE Articles FROM Articles INNER JOIN UserFavorite ON Articles.ArticleId=UserFavorite.ArticleId WHERE Articles.ArticleId = ?";
        const sqlDelete = "DELETE Articles FROM Articles INNER JOIN ArticleUser ON Articles.ArticleId=ArticleUser.AId WHERE Articles.ArticleId = ?";
    db.query(sqlDelete, id, (err, res) => {
        if(err){
            console.log(err);
        }else{
            res.sendStatus(200);
        }
    });
});

//Tomi
//GET - User Searching
app.get('/api/get/user/search/:userUn', (req, res) => {
    const name = "%"+req.params.userUn+"%";
    console.log(name);
    const sqlSelect = "SELECT * FROM Users WHERE UserUn LIKE ?";
    db.query(sqlSelect, name, (err, result) => {
        if(err){
            console.log("User GET error: " + err);
        }

        console.log("Result FIGYELD:" + result);               //valamiért Object-et kapok terminálban
        res.send(result);
    });
});

//Tomi
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

//Tomi
//GET - USERS
app.get('/api/get/user', (req, res) => {
    
    const sqlSelect = "SELECT * FROM Users ORDER BY UserUpdatedAt DESC" ;

    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Users GET error: " + err);
        }

        console.log("Users GET result: " + result.data); //still not working properly
        res.send(result);
    });
});

//PUT - USERS
//Tomi
app.put('/api/update/user', (req, res) => {
    const id=req.body.userId;
    const name = req.body.userUn;
    const pimg = req.body.userPP;
    const firstname= req.body.userFN;
    const secondname= req.body.userSN;  
    const userE = req.body.userEmail;
    const userPL = req.body.userPL;
    const updated = req.body.userUpdatedAt;
    const sqlUpdate = "UPDATE Users SET UserUn = ?,UserPP = ?, UserFN=?, UserSN=?, UserEmail = ?,UserPL=?, UserUpdatedAt = ? WHERE UserId = ?";

    db.query(sqlUpdate, [name,pimg, firstname, secondname, userE,userPL, updated,id ], (err, result) => {                       //Fontos a sorrend, első a PostStatus, aztán a PostName, gondolom az sql szintaktika miatt
        if(err){
            console.log("Users UPDATE error: " + err);
        }
            console.log("Users UPDATE result: " + result);
            res.sendStatus(200);
        
    });
});

//Tomi
//DELETE - USERS
app.delete('/api/delete/user/:userId', (req, res) => {
    const id = req.params.userId;
    console.log(id);
    const sqlDelete = "DELETE Users FROM Users WHERE UserId=?;DELETE Users FROM Users INNER JOIN ArticleUser ON Users.UserId=ArticleUser.UId WHERE Users.UserId = ?;DELETE Users FROM Users INNER JOIN ArticleComment ON Users.UserId=ArticleComment.UserId WHERE Users.UserId = ?;DELETE Users FROM Users INNER JOIN UserFavorite ON Users.UserId=UserFavorite.UserId WHERE Users.UserId = ?";
    db.query(sqlDelete, id, (err, result) => {
        if(err){
            console.log("Users DELETE error: " + err);
        }
        console.log("Users DELETE result: " + result);
    });
});

//GET
// Tomi
app.get('/api/get/commentall', (req, res) => {

    const sqlSelect = "SELECT Articles.ArticleName, Comments.CommentId, Comments.Comment, Comments.CommentCreatedAt FROM Articles INNER JOIN ArticleComment ON ArticleComment.AId = Articles.ArticleId INNER JOIN Comments ON Comments.CommentId = ArticleComment.CId ORDER BY Comments.CommentCreatedAt DESC";    
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log("Comment GET error: " + err);
        }

        console.log("Result FIGYELD:" + result);                //valamiért Object-et kapok terminálban
        res.send(result);
    });
});




app.listen(3001, () => {
    console.log("Running on port 3001");
});


//Heroku
/*
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});*/
