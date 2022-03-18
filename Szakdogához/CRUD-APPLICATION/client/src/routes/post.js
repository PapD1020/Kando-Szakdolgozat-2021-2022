import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

export default function Post(){
    
    const [PostName, setPostName] = useState('');
    const [PostSmDescr, setPostSmDescr] = useState('');
    const [PostMDescr, setPostMDescr] = useState('');
    const [PostImg, setPostImg] = useState('');
    const [PostStatus, setPostStatus] = useState('');

    const [PostNameList, setPostNameList] = useState([]); //'' hibás, [] kell használni

    
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

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

    

    //DELETE - POST
    const deletePost = (post) =>{
      Axios.delete(`http://localhost:3001/api/delete/post/${post}`); // with altgr+7 you can add variables to it

      alert("Successfuly deleted. Please click on the refresh button.")
      //kell frissítés, hogy eltünjön a törölt, submitos nem működik
    };

    //PUT - POST
    const updatePostStatus = (postid) =>{
        console.log(postid);
      Axios.put('http://localhost:3001/api/update/post', {
          postId : postid,
          postName: PostName,
          postSmDescr: PostSmDescr,
          postMDescr: PostMDescr,
          postImg: PostImg,
          postStatus: PostStatus,
          postUpdatedAt: date
      });

      console.log("Post PostUpdatedAt: " + date);

      setPostStatus("");
      alert("Successfuly changed! Please click on the refresh button.");
    };

    return(
        <div >
          <div className='form'>


                <div className="cardContainer">
                  {PostNameList.map((val) => {
                      return(
                        <div className="card">
                          <p>Name:<input type="text" name="postName" placeholder={val.PostName} onChange={(e) => {
                            setPostName(e.target.value)}}></input> </p>

                          <p>Small description:  <input type="text" name="postSmDescr" placeholder={val.PostSmDescr} onChange={(e) => {
                            setPostSmDescr(e.target.value)}}></input> </p>

                          <p>Main description:  <input type="text" name="postMDescr" placeholder={val.PostMDescr} onChange={(e) => {
                              setPostMDescr(e.target.value)}}></input> </p>

                          <p>Image: <input type="text" name="postImg" placeholder={val.PostImg}onChange={(e) => {
                            setPostImg(e.target.value)}}></input></p>

                          <p>Status: <input type="number" name="postStatus" placeholder={val.PostStatus} onChange={(e) => {
                             setPostStatus(e.target.value)}}></input> </p>
                          <p>Ceated at: {val.PostCreatedAt}</p>
                          <p>Updated at: {val.PostUpdatedAt}</p>

                          <button onClick={() => {deletePost(val.PostName)}}>Delete Post</button>

                         
                         
                          <button onClick={() => {updatePostStatus(val.PostId)}}>Update Post</button>
                          <button className="btn" onClick={refreshPostData}>Refresh post data</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>
    );
}