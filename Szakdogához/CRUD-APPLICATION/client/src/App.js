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
}, [])

//Request the subbmit button
const submitReview = () => {

  //postName - backend variable name
  Axios.post('http://localhost:3001/api/insert', { //URL for our api (node.js backend)
    postName: PostName, postDate: PostDate, postSmDescr: PostSmDescr, postMDescr: PostMDescr, postImg: PostImg, postStatus: PostStatus
  }).then(() => {
    alert("Successful insert");
  });
};

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

        <button onClick={submitReview}>Submit</button>

        <div>
          {PostNameList.map((val) => {
              return <h1>Post name: {val.PostName} | Post status: {val.PostStatus}</h1>
          })}
        </div>
        
      </div>

    </div>
  );
}

export default App;
