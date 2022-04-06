import React, {useState, useEffect, useRef} from "react";
import '../App.css';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import * as ReactBootStrap from "react-bootstrap";
import { Button,Modal } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function Article(){
    
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);

  const GotArticleId = useRef(null);

  
  var ArticleName = '';
  var ArticleSmDescr = '';
  var ArticleMDescr = '';
  var ArticleImg = '';
  var ArticleStatus = '';
  var ArticleType = '';

    const {
      register,
      handleSubmit,
      formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        updateArticleStatus();
    };

    const [ArticleNameList, setArticleNameList] = useState([]); //'' hibás, [] kell használni
    const [ArticleNameSetting, setArticleNameSetting] = useState([]);
 

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    //On page load get posts
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/articleall').then((response) => {
  
      setArticleNameList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
    });
    }, []);
    
      const ArticleSetting = (articleId) =>{
        setShow(true);
      Axios.get(`http://localhost:3001/api/get/article/${articleId}`).then((response) => {
        GotArticleId.current = response.data.article[0].ArticleId;
        alert("UseEffectes GotArticleId: " + GotArticleId.current);
        setArticleNameSetting(response.data);
        
        //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
      })};
    //GET - POST
    //Refresh Post data
    const refreshArticleData = () => {

        Axios.get('http://localhost:3001/api/get/articleall').then((response) => {
    
        setArticleNameList(response.data);
        //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
        });
    };

    

    //DELETE - POST
    const deleteArticle = (articleId) =>{
      Axios.delete(`http://localhost:3001/api/delete/article/${articleId}`); // with altgr+7 you can add variables to it

      alert("Successfuly deleted. Please click on the refresh button.")
      //kell frissítés, hogy eltünjön a törölt, submitos nem működik
    };

    
   //PUT - POST
   const updateArticleStatus = (Articleid) =>{
  Axios.put('http://localhost:3001/api/update/article', {
    articleId : Articleid,
    articleName: ArticleName,
    articleSmDescr: ArticleSmDescr,
    articleMDescr: ArticleMDescr,
    articleImg: ArticleImg,
    articleType: ArticleType,
    articleStatus: ArticleStatus,
    articleUpdatedAt: date
  });

  console.log("Article ArticleUpdatedAt: " + date);
 
  alert("Successfuly changed! Please click on the refresh button.");
  setShow(false);
  
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
                                    <th>Name</th>
                                    <th>Small description</th>
                                    <th>Main description</th>
                                    <th>Image</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                    <th>Operation</th>
                                </tr>
                          </thead>
          
                  {ArticleNameList.map((val) => {
                      return(

                          <tbody >
                            <tr>
                              <td>{val.ArticleName}</td>    
                              <td>{val.ArticleSmDescr}</td>  
                              <td>{val.ArticleMDescr}</td>  
                              <td><img src={val.ArticleImg} style={{ width: "80%" }} alt={val.ArticleImg} /></td>  
                              <td>{val.ArticleType}</td>  
                              <td > {ArticleStatusView(val.ArticleStatus)}</td>  
                              <td>{val.ArticleCreatedAt}</td>  
                              <td>{val.ArticleUpdatedAt}</td>  

                            
                           <td>
                           
                           <td><Button variant="primary" onClick={() => {routeChange(val.ArticleId)}}>Setting</Button></td>
                         
                              
                           <td><Button onClick={() => {deleteArticle(val.ArticleId)}}>Delete</Button></td>
                          
                            </td>
                            </tr> 
                            </tbody>
                        
                      )
                  })}
                </ReactBootStrap.Table>
          
        </div>
    );
}