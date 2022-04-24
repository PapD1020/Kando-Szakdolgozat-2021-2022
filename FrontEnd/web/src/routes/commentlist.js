import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

import * as ReactBootStrap from "react-bootstrap";
import { Button} from "react-bootstrap";


export default function Comment(){
    

    const [CommentList, setCommentList] = useState([]); //'' hibás, [] kell használni

    
    //On page load get posts
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/commentall').then((response) => {
  
      setCommentList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
    });
    }, []);
    
      
       
     
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
      Axios.delete(`http://localhost:3001/api/delete/comment/${commentId}`).then(() => { // with altgr+7 you can add variables to it
      refreshCommentData();
      
      });
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