import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {

const [PostName, setPostName] = useState('');
const [PostDate, setPostDate] = useState('');
const [PostSmDescr, setPostSmDescr] = useState('');
const [PostMDescr, setPostMDescr] = useState('');
const [PostImg, setPostImg] = useState('');
const [PostStatus, setPostStatus] = useState('');

const [PostNameList, setPostNameList] = useState([]); //'' hibás, [] kell használni

const [NewPostStatus, setNewPostStatus] = useState('');

useEffect(() => {

  Axios.get('http://localhost:3001/api/get').then((response) => {

    setPostNameList(response.data);
    //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
  });
}, []);

const refreshData = () => {

    Axios.get('http://localhost:3001/api/get').then((response) => {
  
      setPostNameList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
    });
};

//Request the subbmit button
const submitPostData = () => {

  //postName - backend variable name
  Axios.post('http://localhost:3001/api/insert', { //URL for our api (node.js backend)
    postName: PostName, postDate: PostDate, postSmDescr: PostSmDescr, postMDescr: PostMDescr, postImg: PostImg, postStatus: PostStatus
  });
    
  setPostNameList([
    ...PostNameList,
    {PostName: PostName, PostStatus: PostStatus}, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem postName: PostName
  ]);
  //console.log("PostNameList: ",  JSON.stringify(PostNameList[PostNameList.length-1].data));
};

const deletePost = (post) =>{
  Axios.delete(`http://localhost:3001/api/delete/${post}`); // with altgr+7 you can add variables to it

  //kell frissítés, hogy eltünjön a törölt, submitos nem működik
};

const updatePostStatus = (post) =>{
  Axios.put('http://localhost:3001/api/update', {
    postName: post,
    postStatus: NewPostStatus,
  });
  setNewPostStatus("");
  alert("Successfuly changed!");
};

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
                <button className="btn" onClick={refreshData}>Refresh post data</button>

                <div>
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
                <input type="text" name="postName" onChange={(e) => {
                  setPostName(e.target.value);
                }}></input>

                <label>AdminPw</label>
                <input type="text" name="postDate" onChange={(e) => {
                  setPostDate(e.target.value);
                }}></input>

                <label>AdminFN</label>
                <input type="text" name="postSmDescr" onChange={(e) => {
                  setPostSmDescr(e.target.value);
                }}></input>

                <label>AdminSN</label>
                <input type="text" name="postMDescr" onChange={(e) => {
                  setPostMDescr(e.target.value);
                }}></input>

                <label>AdminPermL</label>
                <input type="text" name="postImg" onChange={(e) => {
                  setPostImg(e.target.value);
                }}></input>

                <label>AdminEmail</label>
                <input type="text" name="postStatus" onChange={(e) => {
                  setPostStatus(e.target.value);
                }}></input>

                <button className="btn" onClick={submitPostData}>Add post</button>
                <button className="btn" onClick={refreshData}>Refresh post data</button>

                <div>
                  {PostNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>Admin username: {val.PostName}</h1>
                          <p>Admin password: {val.PostDate}</p>
                          <h2>Admin first name: {val.PostSmDescr}</h2>
                          <p>Admin second name: {val.PostMDescr}</p>
                          <p>Admin permission level: {val.PostImg}</p>
                          <p>Admin email: {val.PostStatus}</p>

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

                <button className="btn" onClick={submitPostData}>Add post</button>
                <button className="btn" onClick={refreshData}>Refresh post data</button>

                <div>
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
