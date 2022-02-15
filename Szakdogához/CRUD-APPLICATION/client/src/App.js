import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {
//Post
const [PostName, setPostName] = useState('');
const [PostDate, setPostDate] = useState('');
const [PostSmDescr, setPostSmDescr] = useState('');
const [PostMDescr, setPostMDescr] = useState('');
const [PostImg, setPostImg] = useState('');
const [PostStatus, setPostStatus] = useState('');

const [PostNameList, setPostNameList] = useState([]); //'' hibás, [] kell használni

const [NewPostStatus, setNewPostStatus] = useState('');
//Post

//Admin
const [AdminUn, setAdminUn] = useState('');
const [AdminPw, setAdminPw] = useState('');
const [AdminFN, setAdminFN] = useState('');
const [AdminSN, setAdminSN] = useState('');
const [AdminPermL, setAdminPermL] = useState('');
const [AdminEmail, setAdminEmail] = useState('');

const [AdminNameList, setAdminNameList] = useState([]);

useEffect(() => {

  Axios.get('http://localhost:3001/api/get/post').then((response) => {

    setPostNameList(response.data);
    //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
  });
}, []);

useEffect(() => {

  Axios.get('http://localhost:3001/api/get/admin').then((response) => {

    setAdminNameList(response.data);
  });
}, []);

const refreshPostData = () => {

    Axios.get('http://localhost:3001/api/get/post').then((response) => {
  
      setPostNameList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
    });
};

//Request the subbmit button
const submitPostData = () => {

  //postName - backend variable name
  Axios.post('http://localhost:3001/api/insert/post', { //URL for our api (node.js backend)
    postName: PostName, postDate: PostDate, postSmDescr: PostSmDescr, postMDescr: PostMDescr, postImg: PostImg, postStatus: PostStatus
  });
    
  setPostNameList([
    ...PostNameList,
    {PostName: PostName, PostDate: PostDate, PostSmDescr: PostSmDescr, PostMDescr: PostMDescr, PostImg: PostImg, PostStatus: PostStatus}, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem postName: PostName
  ]);
  //console.log("PostNameList: ",  JSON.stringify(PostNameList[PostNameList.length-1].data));
};

const deletePost = (post) =>{
  Axios.delete(`http://localhost:3001/api/delete/post/${post}`); // with altgr+7 you can add variables to it

  alert("Successfuly deleted. Please click on the refresh button.")
  //kell frissítés, hogy eltünjön a törölt, submitos nem működik
};

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


  return (
    <div className="App">
      <h1>CRUD-APPLICATION</h1>


        <div className="smallContainer">
          <div className='form'>
                <label>PostName</label>
                <input type="text" name="postName" onChange={(e) => {
                  setPostName(e.target.value);
                }}></input>

                <label>PostDate</label>
                <input type="text" name="postDate" onChange={(e) => {
                  setPostDate(e.target.value);
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
                <input type="text" name="postStatus" onChange={(e) => {
                  setPostStatus(e.target.value);
                }}></input>

                <button className="btn" onClick={submitPostData}>Add post</button>
                <button className="btn" onClick={refreshPostData}>Refresh post data</button>

                <div className="cardContainer">
                  {PostNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>Post name: {val.PostName}</h1>
                          <p>Post date: {val.PostDate}</p>
                          <h2>Post small description: {val.PostSmDescr}</h2>
                          <p>Post main description: {val.PostMDescr}</p>
                          <p>Post image: {val.PostImg}</p>
                          <p>Post status: {val.PostStatus}</p>

                          <button onClick={() => {deletePost(val.PostName)}}>Delete Post</button>

                          <input type="text" id="updateInput" onChange={(e) => {
                            setNewPostStatus(e.target.value);
                          }}></input>

                          <button onClick={() => {updatePostStatus(val.PostName)}}>Update Post</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>

        <div className="smallContainer">
          <div className='form'>
                <label>AdminUn</label>
                <input type="text" name="adminUn" onChange={(e) => {
                  setAdminUn(e.target.value);
                }}></input>

                <label>AdminPw</label>
                <input type="text" name="adminPw" onChange={(e) => {
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
                <input type="text" name="adminPermL" onChange={(e) => {
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

                          <button onClick={() => {deletePost(val.PostName)}}>Delete Admin</button>

                          <input type="text" id="updateInput" onChange={(e) => {
                            setNewPostStatus(e.target.value);
                          }}></input>

                          <button onClick={() => {updatePostStatus(val.PostName)}}>Update Admin</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>

        <div className="smallContainer">
          <div className='form'>
                <label>UserUn</label>
                <input type="text" name="postName" onChange={(e) => {
                  setPostName(e.target.value);
                }}></input>

                <label>UserPw</label>
                <input type="text" name="postDate" onChange={(e) => {
                  setPostDate(e.target.value);
                }}></input>

                <label>UserFN</label>
                <input type="text" name="postSmDescr" onChange={(e) => {
                  setPostSmDescr(e.target.value);
                }}></input>

                <label>UserSN</label>
                <input type="text" name="postMDescr" onChange={(e) => {
                  setPostMDescr(e.target.value);
                }}></input>

                <label>UserDOB</label>
                <input type="text" name="postImg" onChange={(e) => {
                  setPostImg(e.target.value);
                }}></input>

                <label>UserEmail</label>
                <input type="text" name="postStatus" onChange={(e) => {
                  setPostStatus(e.target.value);
                }}></input>

                <button className="btn" onClick={submitPostData}>Add User</button>
                <button className="btn" onClick={refreshPostData}>Refresh User data</button>

                <div className="cardContainer">
                  {PostNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>User username: {val.PostName}</h1>
                          <p>User password: {val.PostDate}</p>
                          <h2>User first name: {val.PostSmDescr}</h2>
                          <p>User second name: {val.PostMDescr}</p>
                          <p>User date of birth: {val.PostImg}</p>
                          <p>User email: {val.PostStatus}</p>

                          <button onClick={() => {deletePost(val.PostName)}}>Delete Post</button>

                          <input type="text" id="updateInput" onChange={(e) => {
                            setNewPostStatus(e.target.value);
                          }}></input>

                          <button onClick={() => {updatePostStatus(val.PostName)}}>Update Post</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>

    </div>
  );
}

export default App;
