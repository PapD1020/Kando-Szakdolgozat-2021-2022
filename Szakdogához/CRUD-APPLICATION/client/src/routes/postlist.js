import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';
import { Row, Table } from "react-bootstrap";

export default function Post(){
    const [PostName, setPostName] = useState('');
    const [PostSmDescr, setPostSmDescr] = useState('');
    const [PostMDescr, setPostMDescr] = useState('');
    const [PostImg, setPostImg] = useState('');
    const [PostStatus, setPostStatus] = useState('');

    const [PostNameList, setPostNameList] = useState([]); //'' hibás, [] kell használni

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
        <div className="userList">
                        
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

                            <Table responsive>
                           
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

                          <button onClick={() => {deletePost(val.PostName)}}>Delete Post</button>

                          <input type="number" className="updateInput" onChange={(e) => {
                            setNewPostStatus(e.target.value);
                          }}></input>

                          <button onClick={() => {updatePostStatus(val.PostName)}}>Update Post</button>
                       

                            </td>
                            </tr> 
                            </tbody>
                            </Table>
                      )
                  })}
                
          
        </div>
    );
}