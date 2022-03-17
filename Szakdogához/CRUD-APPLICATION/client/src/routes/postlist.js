import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';
import * as ReactBootStrap from "react-bootstrap";
import { Button,Modal } from "react-bootstrap";

export default function Post(){
    
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  

  const [PostName, setPostName] = useState('');
  const [PostSmDescr, setPostSmDescr] = useState('');
  const [PostMDescr, setPostMDescr] = useState('');
  const [PostImg, setPostImg] = useState('');
  const [PostStatus, setPostStatus] = useState('');

    const [PostNameList, setPostNameList] = useState([]); //'' hibás, [] kell használni
    const [PostNameSetting, setPostNameSetting] = useState([]);
    const [NewPostStatus, setNewPostStatus] = useState('');

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    //On page load get posts
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/post').then((response) => {
  
      setPostNameList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
    });
    }, []);
    
      const PostSetting = (postId) =>{
        setShow(true);
      Axios.get(`http://localhost:3001/api/get/post/${postId}`).then((response) => {
    
        setPostNameSetting(response.data);
        //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
      })};
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
    const updatePostStatus = (post) =>{

      Axios.put('http://localhost:3001/api/update/post', {
          postName: post,
          postStatus: NewPostStatus,
          postUpdatedAt: date
      });

      console.log("Post PostUpdatedAt: " + date);

      setNewPostStatus("");
      alert("Successfuly changed! Please click on the refresh button.");
    };

    return(
        <div >
           <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {PostNameSetting.map((val) => {
                      return(
                        <div className="card">
                          <p>Name:<input type="text" name="postName" value={val.PostName} onChange={(e) => {
                            setPostName(e.target.value)}}></input> </p>

                          <p>Small description:  <input type="text" name="postSmDescr" value={val.PostSmDescr} onChange={(e) => {
                            setPostSmDescr(e.target.value)}}></input> </p>

                          <p>Main description:  <input type="text" name="postMDescr" value={val.PostMDescr} onChange={(e) => {
                              setPostMDescr(e.target.value)}}></input> </p>

                          <p>Image: <input type="text" name="postImg" value={val.PostImg}onChange={(e) => {
                            setPostImg(e.target.value)}}></input></p>

                          <p>Status: <input type="number" name="postStatus" value={val.PostStatus} onChange={(e) => {
                             setPostStatus(e.target.value)}}></input> </p>
                          <p>Ceated at: {val.PostCreatedAt}</p>
                          <p>Updated at: {val.PostUpdatedAt}</p>

                         

                          <input type="number" className="updateInput" onChange={(e) => {
                            setNewPostStatus(e.target.value);
                          }}></input>

                          <button onClick={() => {updatePostStatus(val.PostName)}}>Update Post</button>
                          <button className="btn" onClick={refreshPostData}>Refresh post data</button>
                        </div>
                      )
                })} 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> 
        </Modal>

            <ReactBootStrap.Table>
                        <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>small description</th>
                                    <th>main description</th>
                                    <th>image</th>
                                    <th>status</th>
                                    <th>created at</th>
                                    <th>updated at</th>
                                </tr>
                          </thead>
          
                  {PostNameList.map((val) => {
                      return(

                          <tbody>
                            <tr>
                              <td>{val.PostName}</td>    
                              <td>{val.PostSmDescr}</td>  
                              <td>{val.PostMDescr}</td>  
                              <td>{val.PostImg}</td>  
                              <td>{val.PostStatus}</td>  
                              <td>{val.PostCreatedAt}</td>  
                              <td>{val.PostUpdatedAt}</td>  

                            
                           <td>

                           <Button variant="primary" onClick={() => {PostSetting(val.PostId)}}>Setting</Button>
                         
                              
                          <Button onClick={() => {deletePost(val.PostName)}}>Delete Post</Button>

                            </td>
                            </tr> 
                            </tbody>
                        
                      )
                  })}
                </ReactBootStrap.Table>
          
        </div>
    );
}