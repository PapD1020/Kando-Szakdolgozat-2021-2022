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

    Axios.get('http://localhost:3001/api/get/comment/byId').then((response) => {
  
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
    const refreshArticleData = () => {

        Axios.get('http://localhost:3001/api/get/articleall').then((response) => {
    
        setCommentList(response.data);
        //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
        });
    };

    

    //DELETE - POST
    const deleteComment = (commentId) =>{
      Axios.delete(`http://localhost:3001/api/delete/article/${commentId}`); // with altgr+7 you can add variables to it

      alert("Successfuly deleted. Please click on the refresh button.")
      //kell frissítés, hogy eltünjön a törölt, submitos nem működik
    };

    
   
const ArticleStatusView=(ArticleStatus)=>{
  if(ArticleStatus==-2){ArticleStatus = "Törölt"}
  if(ArticleStatus==-1){ArticleStatus = "Felfüggesztett"}
  if(ArticleStatus==0){ArticleStatus = "Inaktív"}
  if(ArticleStatus==1){ArticleStatus = "Aktív"}

  return ArticleStatus;
}

let navigate = useNavigate();
const routeChange = (gotId) =>{
  alert("Második selected got id: " + gotId);
  navigate('/adminEditArticle', {state:{id: gotId}});
}

    return(
        <div >
           
        
            <ReactBootStrap.Table striped bordered hover>
                        <thead className="tabla">
                                <tr>
                                    <th>User Id</th>
                                    <th>Article Id</th>
                                    <th>Comment</th>                               
                                    <th>Created at</th>                  
                                    <th>Operation</th>
                                </tr>
                          </thead>
          
                  {CommentList.map((val) => {
                      return(

                          <tbody >
                            <tr>
                              <td>{val.UserId}</td>    
                              <td>{val.ArticleId}</td>  
                              <td>{val.Comment}</td>  
                              <td>{val.ArticleCreatedAt}</td>  
                         

                            
                           <td>
                           
                           <td><Button variant="primary" onClick={() => {routeChange(val.ArticleId)}}>Setting</Button></td>
                         
                              
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