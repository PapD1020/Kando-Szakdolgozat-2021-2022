import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

export default function All(){
//Post
const [PostName, setPostName] = useState('');
const [PostSmDescr, setPostSmDescr] = useState('');
const [PostMDescr, setPostMDescr] = useState('');
const [PostImg, setPostImg] = useState('');
const [PostStatus, setPostStatus] = useState('');
let PostCreatedAt;
let PostUpdatedAt;

const [PostNameList, setPostNameList] = useState([]); //'' hibás, [] kell használni

const [NewPostStatus, setNewPostStatus] = useState('');

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
const [UserPw, setUserPw] = useState('');
const [UserFN, setUserFN] = useState('');
const [UserSN, setUserSN] = useState('');
const [UserDob, setUserDob] = useState('');
const [UserEmail, setUserEmail] = useState('');

const [UsersNameList, setUsersNameList] = useState([]);

const [NewUserEmail, setNewUserEmail] = useState('');

//On page load get posts
useEffect(() => {

  Axios.get('http://localhost:3001/api/get/post').then((response) => {

    setPostNameList(response.data);
    //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
  });
}, []);

//On page load get admins
useEffect(() => {

  Axios.get('http://localhost:3001/api/get/admin').then((response) => {

    setAdminNameList(response.data);
  });
}, []);

//On page load get users
useEffect(() => {

  Axios.get('http://localhost:3001/api/get/users').then((response) => {

    setUsersNameList(response.data);
  });
}, []);

//GET - POST
//Refresh Post data
const refreshPostData = () => {

    Axios.get('http://localhost:3001/api/get/post').then((response) => {
  
      setPostNameList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
    });
};

//POST - POST
//Request the subbmit button
const submitPostData = () => {

  //postName - backend variable name
  Axios.post('http://localhost:3001/api/insert/post', { //URL for our api (node.js backend)
    postName: PostName,
    postSmDescr: PostSmDescr,
    postMDescr: PostMDescr,
    postImg: PostImg,
    postStatus: PostStatus
  });
    
  setPostNameList([
    ...PostNameList,
    {
      PostName: PostName,
      PostSmDescr: PostSmDescr,
      PostMDescr: PostMDescr,
      PostImg: PostImg,
      PostStatus: PostStatus,
      PostCreatedAt: PostCreatedAt,
      PostUpdatedAt: PostUpdatedAt
    }, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem postName: PostName
  ]);
  //console.log("PostNameList: ",  JSON.stringify(PostNameList[PostNameList.length-1].data));
};

//DELETE - POST
const deletePost = (post) =>{
  Axios.delete(`http://localhost:3001/api/delete/post/${post}`); // with altgr+7 you can add variables to it

  alert("Successfuly deleted. Please click on the refresh button.")
  //kell frissítés, hogy eltünjön a törölt, submitos nem működik
};

//PUT - POST
const updatePostStatus = (post) =>{
  Axios.put('http://localhost:3001/api/update/post', {
    postName: post,
    postStatus: NewPostStatus,
  });
  setNewPostStatus("");
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

  //postName - backend variable name
  Axios.post('http://localhost:3001/api/insert/admin', { //URL for our api (node.js backend)
  adminUn: AdminUn, adminPw: AdminPw, adminFN: AdminFN, adminSN: AdminSN, adminPermL: AdminPermL, adminEmail: AdminEmail
  });
    
  setAdminNameList([
    ...AdminNameList,
    {AdminUn: AdminUn, AdminPw: AdminPw, AdminFN: AdminFN, AdminSN: AdminSN, AdminPermL: AdminPermL, AdminEmail: AdminEmail}, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem postName: PostName
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
  });
  setNewAdminPermL("");
  alert("Successfuly changed! Please click on the refresh button.");
};

/*
* USERS
*/

//GET - USERS
const refreshUserData = () => {
  Axios.get('http://localhost:3001/api/get/users').then((response) => {

    setUsersNameList(response.data);
  });
};

//POST - USERS
const submitUserData = () => {

  //postName - backend variable name
  Axios.post('http://localhost:3001/api/insert/users', { //URL for our api (node.js backend)
  userUn: UserUn, userPw: UserPw, userFN: UserFN, userSN: UserSN, userDob: UserDob, userEmail: UserEmail
  });
  

  setUsersNameList([
    ...UsersNameList,
    {UserUn: UserUn, UserPw: UserPw, UserFN: UserFN, UserSN: UserSN, UserDob: UserDob, UserEmail: UserEmail}, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem postName: PostName
  ]);
};

//DELETE - USERS
const deleteUser = (user) =>{
  Axios.delete(`http://localhost:3001/api/delete/users/${user}`); // with altgr+7 you can add variables to it

  alert("Successfuly deleted. Please click on the refresh button.")
  //kell frissítés, hogy eltünjön a törölt, submitos nem működik
};

//PUT - USERS
const updateUserEmail = (user) =>{
  Axios.put('http://localhost:3001/api/update/users', {
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
                <label>PostName</label>
                <input type="text" name="postName" onChange={(e) => {
                  setPostName(e.target.value);
                }}></input>

                <label>PostSmDescr</label>
                <input type="text" name="postSmDescr" onChange={(e) => {
                  setPostSmDescr(e.target.value);
                }}></input>

                <label>PostMDescr</label>
                <input type="text" name="postMDescr" onChange={(e) => {
                  setPostMDescr(e.target.value);
                }}></input>

                <label>PostImg</label>
                <input type="text" name="postImg" onChange={(e) => {
                  setPostImg(e.target.value);
                }}></input>

                <label>PostStatus</label>
                <input type="number" name="postStatus" onChange={(e) => {
                  setPostStatus(e.target.value);
                }}></input>

                <button className="btn" onClick={submitPostData}>Add post</button>
                <button className="btn" onClick={refreshPostData}>Refresh post data</button>

                <div className="cardContainer">
                  {PostNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>Post name: {val.PostName}</h1>
                          <h2>Post small description: {val.PostSmDescr}</h2>
                          <p>Post main description: {val.PostMDescr}</p>
                          <p>Post image: {val.PostImg}</p>
                          <p>Post status: {val.PostStatus}</p>
                          <p>Post created at: {val.PostCreatedAt}</p>
                          <p>Post updated at: {val.PostUpdatedAt}</p>

                          <button onClick={() => {deletePost(val.PostName)}}>Delete Post</button>

                          <input type="number" className="updateInput" onChange={(e) => {
                            setNewPostStatus(e.target.value);
                          }}></input>

                          <button onClick={() => {updatePostStatus(val.PostName)}}>Update Post</button>
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