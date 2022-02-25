import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

export default function Post(){
    const [PostName, setPostName] = useState('');
    const [PostSmDescr, setPostSmDescr] = useState('');
    const [PostMDescr, setPostMDescr] = useState('');
    const [PostImg, setPostImg] = useState('');
    const [PostStatus, setPostStatus] = useState('');
    let PostCreatedAt;
    let PostUpdatedAt;

    const [PostNameList, setPostNameList] = useState([]); //'' hibás, [] kell használni

    const [NewPostStatus, setNewPostStatus] = useState('');

    //On page load get posts
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/post').then((response) => {
  
      setPostNameList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
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
        postStatus: PostStatus,
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

    return(
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
    );
}