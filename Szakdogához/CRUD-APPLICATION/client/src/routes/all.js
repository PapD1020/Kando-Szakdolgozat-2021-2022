import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

export default function All(){
  //Post
  const [ArticleName, setArticleName] = useState('');
  const [ArticleSmDescr, setArticleSmDescr] = useState('');
  const [ArticleMDescr, setArticleMDescr] = useState('');
  const [ArticleImg, setArticleImg] = useState('');
  const [ArticleStatus, setArticleStatus] = useState('');

  const [ArticleNameList, setArticleNameList] = useState([]); //'' hibás, [] kell használni

  const [NewArticleStatus, setNewArticleStatus] = useState('');

  //Admin
  const [AdminUn, setAdminUn] = useState('');
  const [AdminPw, setAdminPw] = useState('');
  const [AdminFN, setAdminFN] = useState('');
  const [AdminSN, setAdminSN] = useState('');
  const [AdminPermL, setAdminPermL] = useState('');
  const [AdminEmail, setAdminEmail] = useState('');

  const [AdminNameList, setAdminNameList] = useState([]);

  const [NewAdminPermL, setNewAdminPermL] = useState('');

  //USERS
  const [UserUn, setUserUn] = useState('');
  const [UserPP, setUserPP] = useState('');
  const [UserPw, setUserPw] = useState('');
  const [UserFN, setUserFN] = useState('');
  const [UserSN, setUserSN] = useState('');
  const [UserDob, setUserDob] = useState('');
  const [UserEmail, setUserEmail] = useState('');

  const [UsersNameList, setUsersNameList] = useState([]);

  const [NewUserEmail, setNewUserEmail] = useState('');

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

  //On page load get articles
  useEffect(() => {

    Axios.get('http://localhost:3001/api/get/article').then((response) => {

      setArticleNameList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM article to the frontend terminal
    });
  }, []);

  //On page load get admins
  useEffect(() => {

    Axios.get('http://localhost:3001/api/get/admin').then((response) => {

      setAdminNameList(response.data);
    });
  }, []);

  //On page load get user
  useEffect(() => {

    Axios.get('http://localhost:3001/api/get/user').then((response) => {

      setUsersNameList(response.data);
    });
  }, []);

  //GET - POST
  //Refresh Article data
  const refreshArticleData = () => {

      Axios.get('http://localhost:3001/api/get/article').then((response) => {
    
        setArticleNameList(response.data);
        //console.log(response.data); //console logging the SELECT * FROM article to the frontend terminal
      });
  };

  //POST - Article
  //Request the subbmit button
  const submitArticleData = () => {

    //articleName - backend variable name
    Axios.post('http://localhost:3001/api/insert/article', { //URL for our api (node.js backend)
      articleName: ArticleName,
      articleSmDescr: ArticleSmDescr,
      articleMDescr: ArticleMDescr,
      articleImg: ArticleImg,
      articleStatus: ArticleStatus,
      articleCreatedAt: date,
      articleUpdatedAt: date
  });
    
  setArticleNameList([
    ...ArticleNameList,
    {
      ArticleName: ArticleName,
      ArticleSmDescr: ArticleSmDescr,
      ArticleMDescr: ArticleMDescr,
      ArticleImg: ArticleImg,
      ArticleStatus: ArticleStatus,
      ArticleCreatedAt: date,
      ArticleUpdatedAt: date
    }, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem articleName: ArticleName
  ]);
  //console.log("ArticleNameList: ",  JSON.stringify(ArticleNameList[ArticleNameList.length-1].data));
};

//DELETE - POST
const deleteArticle = (article) =>{
  Axios.delete(`http://localhost:3001/api/delete/article/${article}`); // with altgr+7 you can add variables to it

  alert("Successfuly deleted. Please click on the refresh button.")
  //kell frissítés, hogy eltünjön a törölt, submitos nem működik
};

//PUT - POST
const updateArticleStatus = (article) =>{
  Axios.put('http://localhost:3001/api/update/article', {
    articleName: article,
    articleStatus: NewArticleStatus,
    articleUpdatedAt: date
  });
  setNewArticleStatus("");
  alert("Successfuly changed! Please click on the refresh button.");
};

/*
* Admin CRUD
*/

//GET - ADMIN
const refreshAdminData = () => {
  Axios.get('http://localhost:3001/api/get/admin').then((response) => {

    setAdminNameList(response.data);
  });
};

//POST - ADMIN
const submitAdminData = () => {

  //adminUn - backend variable name
  Axios.post('http://localhost:3001/api/insert/admin', { //URL for our api (node.js backend)
  adminUn: AdminUn,
  adminPw: AdminPw,
  adminFN: AdminFN,
  adminSN: AdminSN,
  adminPermL: AdminPermL,
  adminEmail: AdminEmail,
  adminCreatedAt: date,
  adminUpdatedAt: date
  });
    
  setAdminNameList([
    ...AdminNameList,
    {
      AdminUn: AdminUn,
      AdminPw: AdminPw,
      AdminFN: AdminFN,
      AdminSN: AdminSN,
      AdminPermL: AdminPermL,
      AdminEmail: AdminEmail,
      AdminCreatedAt: date,
      AdminUpdatedAt: date
    }, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem articleName: ArticleName
  ]);
};

//DELETE - ADMIN
const deleteAdmin = (admin) =>{
  Axios.delete(`http://localhost:3001/api/delete/admin/${admin}`); // with altgr+7 you can add variables to it

  alert("Successfuly deleted. Please click on the refresh button.")
  //kell frissítés, hogy eltünjön a törölt, submitos nem működik
};

//PUT - ADMIN
const updateAdminPermL = (admin) =>{
  Axios.put('http://localhost:3001/api/update/admin', {
    adminUn: admin,
    adminPermL: NewAdminPermL,
    adminUpdatedAt: date
  });
  setNewAdminPermL("");
  alert("Successfuly changed! Please click on the refresh button.");
};

/*
* USERS
*/

//GET - USERS
const refreshUserData = () => {
  Axios.get('http://localhost:3001/api/get/user').then((response) => {

    setUsersNameList(response.data);
  });
};

//POST - USERS
const submitUserData = () => {

  //articleName - backend variable name
  Axios.post('http://localhost:3001/api/insert/user', { //URL for our api (node.js backend)
    userUn: UserUn,
    userPP: UserPP,
    userPw: UserPw,
    userFN: UserFN,
    userSN: UserSN,
    userDob: UserDob,
    userEmail: UserEmail,
    userCreatedAt: date,
    userUpdatedAt: date
  });
  

  setUsersNameList([
    ...UsersNameList,
    {
      UserUn: UserUn,
      userPP: UserPP,
      UserPw: UserPw,
      UserFN: UserFN,
      UserSN: UserSN,
      UserDob: UserDob,
      UserEmail: UserEmail,
      UserCreatedAt: date,
      UserUpdatedAt: date
    }, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem articleName: ArticleName
  ]);
};

//DELETE - USERS
const deleteUser = (user) =>{
  Axios.delete(`http://localhost:3001/api/delete/user/${user}`); // with altgr+7 you can add variables to it

  alert("Successfuly deleted. Please click on the refresh button.")
  //kell frissítés, hogy eltünjön a törölt, submitos nem működik
};

//PUT - USERS
const updateUserEmail = (user) =>{
  Axios.put('http://localhost:3001/api/update/user', {
    userUn: user,
    userEmail: NewUserEmail,
  });
  setNewUserEmail("");
  alert("Successfuly changed! Please click on the refresh button.");
};

  return (
    <div className="App">
      <h1>CRUD-APPLICATION</h1>

        {/*POST*/}
        <div className="smallContainer">
          <div className='form'>
            <h3>POST</h3>
                <label>ArticleName</label>
                <input type="text" name="articleName" onChange={(e) => {
                  setArticleName(e.target.value);
                }}></input>

                <label>ArticleSmDescr</label>
                <input type="text" name="articleSmDescr" onChange={(e) => {
                  setArticleSmDescr(e.target.value);
                }}></input>

                <label>ArticleMDescr</label>
                <input type="text" name="articleMDescr" onChange={(e) => {
                  setArticleMDescr(e.target.value);
                }}></input>

                <label>ArticleImg</label>
                <input type="text" name="articleImg" onChange={(e) => {
                  setArticleImg(e.target.value);
                }}></input>

                <label>ArticleStatus</label>
                <input type="number" name="articleStatus" onChange={(e) => {
                  setArticleStatus(e.target.value);
                }}></input>

                <button className="btn" onClick={submitArticleData}>Add article</button>
                <button className="btn" onClick={refreshArticleData}>Refresh post data</button>

                <div className="cardContainer">
                  {ArticleNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>Article name: {val.ArticleName}</h1>
                          <h2>Article small description: {val.ArticleSmDescr}</h2>
                          <p>Article main description: {val.ArticleMDescr}</p>
                          <p>Article image: {val.ArticleImg}</p>
                          <p>Article status: {val.ArticleStatus}</p>
                          <p>Article created at: {val.ArticleCreatedAt}</p>
                          <p>Article updated at: {val.ArticleUpdatedAt}</p>

                          <button onClick={() => {deleteArticle(val.ArticleName)}}>Delete Article</button>

                          <input type="number" className="updateInput" onChange={(e) => {
                            setNewArticleStatus(e.target.value);
                          }}></input>

                          <button onClick={() => {updateArticleStatus(val.ArticleName)}}>Update Article</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>

        {/*ADMIN*/}
        <div className="smallContainer">
          <div className='form'>
            <h3>ADMIN</h3>
                <label>AdminUn</label>
                <input type="text" name="adminUn" onChange={(e) => {
                  setAdminUn(e.target.value);
                }}></input>

                <label>AdminPw</label>
                <input type="password" name="adminPw" onChange={(e) => {
                  setAdminPw(e.target.value);
                }}></input>

                <label>AdminFN</label>
                <input type="text" name="adminFN" onChange={(e) => {
                  setAdminFN(e.target.value);
                }}></input>

                <label>AdminSN</label>
                <input type="text" name="adminSN" onChange={(e) => {
                  setAdminSN(e.target.value);
                }}></input>

                <label>AdminPermL</label>
                <input type="number" name="adminPermL" onChange={(e) => {
                  setAdminPermL(e.target.value);
                }}></input>

                <label>AdminEmail</label>
                <input type="text" name="adminEmail" onChange={(e) => {
                  setAdminEmail(e.target.value);
                }}></input>

                <button className="btn" onClick={submitAdminData}>Add Admin</button>
                <button className="btn" onClick={refreshAdminData}>Refresh Admin data</button>

                <div className="cardContainer">
                  {AdminNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>Admin username: {val.AdminUn}</h1>
                          <p>Admin password: {val.AdminPw}</p>
                          <h2>Admin first name: {val.AdminFN}</h2>
                          <p>Admin second name: {val.AdminSN}</p>
                          <p>Admin permission level: {val.AdminPermL}</p>
                          <p>Admin email: {val.AdminEmail}</p>
                          <p>Admin created at: {val.AdminCreatedAt}</p>
                          <p>Admin updated at: {val.AdminUpdatedAt}</p>

                          <button onClick={() => {deleteAdmin(val.AdminUn)}}>Delete Admin</button>

                          <input type="number" className="updateInput" onChange={(e) => {
                            setNewAdminPermL(e.target.value);
                          }}></input>

                          <button onClick={() => {updateAdminPermL(val.AdminUn)}}>Update Admin</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>

        {/*USERS*/}
        <div className="smallContainer">
          <div className='form'>
            <h3>USERS</h3>
                <label>UserUn</label>
                <input type="text" name="userUn" onChange={(e) => {
                  setUserUn(e.target.value);
                }}></input>

                <label>UserPP</label>
                <input type="text" name="userPP" onChange={(e) => {
                  setUserPP(e.target.value);
                }}></input>

                <label>UserPw</label>
                <input type="password" name="userPw" onChange={(e) => {
                  setUserPw(e.target.value);
                }}></input>

                <label>UserFN</label>
                <input type="text" name="userFN" onChange={(e) => {
                  setUserFN(e.target.value);
                }}></input>

                <label>UserSN</label>
                <input type="text" name="userSN" onChange={(e) => {
                  setUserSN(e.target.value);
                }}></input>

                <label>UserDOB</label>
                <input type="date" name="userDob" onChange={(e) => {
                  setUserDob(e.target.value);
                }}></input>

                <label>UserEmail</label>
                <input type="email" name="userEmail" onChange={(e) => {
                  setUserEmail(e.target.value);
                }}></input>

                <button className="btn" onClick={submitUserData}>Add User</button>
                <button className="btn" onClick={refreshUserData}>Refresh User data</button>

                <div className="cardContainer">
                  {UsersNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>User username: {val.UserUn}</h1>
                          <h1>User profile picture: {val.UserPP}</h1>
                          <p>User password: {val.UserPw}</p>
                          <h2>User first name: {val.UserFN}</h2>
                          <p>User second name: {val.UserSN}</p>
                          <p>User date of birth: {val.UserDob}</p>
                          <p>User email: {val.UserEmail}</p>

                          <button onClick={() => {deleteUser(val.UserUn)}}>Delete User</button>

                          <input type="text" className="updateInput" onChange={(e) => {
                            setNewUserEmail(e.target.value);
                          }}></input>

                          <button onClick={() => {updateUserEmail(val.UserUn)}}>Update User</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>

    </div>
  );
}