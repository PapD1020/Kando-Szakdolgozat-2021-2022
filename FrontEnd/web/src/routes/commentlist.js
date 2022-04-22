import React, {useState, useEffect, useRef} from "react";
import '../App.css';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import * as ReactBootStrap from "react-bootstrap";
import { Button,Modal } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function Comment(){
    
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);

  const GotArticleId = useRef(null);

  

    const [CommentList, setCommentList] = useState([]); //'' hibás, [] kell használni
    
 

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    //On page load get posts
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/commentall').then((response) => {
  
      setCommentList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
    });
    }, []);
    
      const ArticleSetting = (articleId) =>{
        setShow(true);
      Axios.get(`http://localhost:3001/api/get/article/${articleId}`).then((response) => {
        GotArticleId.current = response.data.article[0].ArticleId;
        alert("UseEffectes GotArticleId: " + GotArticleId.current);
       
        
        //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
      })};
    //GET - POST
    //Refresh Post data
    const refreshCommentData = () => {

        Axios.get('http://localhost:3001/api/get/commentall').then((response) => {
    
        setCommentList(response.data);
        //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
        });
    };

    

    //DELETE - POST
    const deleteComment = (commentId) =>{
      Axios.delete(`http://localhost:3001/api/delete/comment/${commentId}`); // with altgr+7 you can add variables to it
      refreshCommentData();
      
      
    };

    
  

    return(
        <div >
           
        
            <ReactBootStrap.Table responsive bordered hover>
                        <thead >
                                <tr className="none">
                                    
                                    <th>Article</th>
                                    <th>Comment</th>                               
                                    <th>Created at</th>                  
                                    <th>Operation</th>
                                </tr>
                          </thead>
          
                  {CommentList.map((val) => {
                      return(

                          <tbody >
                            <tr>
                           
                              <td><td className="td-none">Article:</td><p>{val.ArticleId}</p>{val.ArticleName}</td>  
                              <td><td className="td-none">Comment:</td>{val.Comment}</td>  
                              <td><td className="td-none">Created at:</td>{val.CommentCreatedAt}</td>  
                         

                            
                           <td>
                           
                              
                           <td><Button onClick={() => {deleteComment(val.CommentId)}}>Delete</Button></td>
                          
                            </td>
                            </tr> 
                            </tbody>
                        
                      )
                  })}
                </ReactBootStrap.Table>
          
        </div>
    );
}