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

const deletePost = (postName) =>{
  Axios.delete(`http://localhost:3001/api/delete/${postName}`); // with altgr+7 you can add variables to it
}

  return (
    <div className="App">
      <h1>CRUD-APPLICATION</h1>

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

        <button className="btn" onClick={submitPostData}>Submit</button>
        <button className="btn" onClick={refreshData}>Refresh data</button>

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

                  <button onClick={() => {deletePost(val.PostName)}}>Delete</button>
                  <input type="text" id="updateInput"></input>
                  <button>Update</button>
                </div>
              );
          })}
        </div>
        
      </div>

    </div>
  );
}

export default App;
