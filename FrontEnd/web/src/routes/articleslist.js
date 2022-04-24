import React, {useState, useEffect, useRef} from "react";
import '../App.css';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import * as ReactBootStrap from "react-bootstrap";
import { Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function Article(){
    
  const [show, setShow] = useState(false);
  
  
  const [LoginStatus, setLoginStatus] = useState('');
  const GotArticleId = useRef(null);
  const [search,setSearch] =useState('');
  const [record,setRecord] = useState([]);
  
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
  
 

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
 
    //check every time we refresh the page if a user is logged in
 useEffect(() => {
  Axios.get('http://localhost:3001/api/login/user').then((response) => {
    //ellenőrzésre
    //console.log("Are we logged in: " + JSON.stringify(response));
    if(response.data.loggedIn === true){
      setLoginStatus(response.data.user[0].UserUn);
      //getChoosenArticleById();
      console.log('useEffect asd');
    }
  });
}, []);
    //On page load get posts
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/articleall').then((response) => {
  
      setArticleNameList(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
    });
    }, []);
    
      // Search Records here 
    const searchRecords = () =>
    {
        Axios.get(`http://localhost:3001/api/get/article/search/${search}`).then(response => {
          console.log(search);
          setRecord(response.data);
          console.log(record);
        });
         
    }
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
      Axios.delete(`http://localhost:3001/api/delete/article/${articleId}`).then(() => {  // with altgr+7 you can add variables to it
      refreshArticleData();
      });
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
  refreshArticleData();
};
const ArticleStatusView=(ArticleStatus)=>{
  if(ArticleStatus===-2){ArticleStatus = "Törölt"}
  if(ArticleStatus===-1){ArticleStatus = "Felfüggesztett"}
  if(ArticleStatus===0){ArticleStatus = "Inaktív"}
  if(ArticleStatus===1){ArticleStatus = "Aktív"}

  return ArticleStatus;
}

let navigate = useNavigate();
const routeChange = (gotId) =>{
 
  navigate('/adminEditArticle', {state:{id: gotId}});
}

    return(
      
        <div>
                  <ReactBootStrap.Table responsive bordered hover>
                        
                                <thead >
                                <tr className="none">
                                    <th>User Name</th>
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
                                <th colSpan={10}>
                                    <input type="text" id="form"  onKeyUp={searchRecords} onChange={(e)=>setSearch(e.target.value)} class="form-control" placeholder="Search" style={{backgroundColor:"#ececec"}}/>
                                </th>
                                
                          </thead>
  
                    <tbody >
                  {search.length===0 ? ArticleNameList.map((val) => {
                      return(
                            
                          
                            <tr>
                              <td><td className="td-none">User Name:</td>{val.UserUn}</td> 
                              <td><td className="td-none">Name:</td>{val.ArticleName}</td>    
                              <td><td className="td-none">Small description:</td>{val.ArticleSmDescr}</td>  
                              <td><td className="td-none">Main description:</td>{val.ArticleMDescr}</td>  
                              <td><td className="td-none">Image:</td><img src={val.ArticleImg}  alt={val.ArticleImg} /></td>  
                              <td><td className="td-none">Type:</td>{val.ArticleType}</td>  
                              <td><td className="td-none">Status:</td>{ArticleStatusView(val.ArticleStatus)}</td>  
                              <td><td className="td-none">Created at:</td>{val.ArticleCreatedAt}</td>  
                              <td><td className="td-none">Updated at:</td>{val.ArticleUpdatedAt}</td>  

                            
                           <td>
                           
                           <td><Button variant="primary" onClick={() => {routeChange(val.ArticleId)}}>Setting</Button></td>
                         
                              
                           <td><Button onClick={() => {deleteArticle(val.ArticleId)}}>Delete</Button></td>
                          
                            </td>
                            </tr> 
                            
                        
                      )
                      
                  })
                  : search.length !==0 && record.map((val) => {
                      return(

                          
                            <tr>
                             <td> <td className="td-none">User Name:</td>{val.UserUn}</td> 
                              <td><td className="td-none">Name:</td>{val.ArticleName}</td>    
                              <td><td className="td-none">Small description:</td>{val.ArticleSmDescr}</td>  
                              <td><td className="td-none">Main description:</td>{val.ArticleMDescr}</td>  
                              <td><td className="td-none">Image:</td><img src={val.ArticleImg}  alt={val.ArticleImg} /></td>  
                              <td><td className="td-none">Type:</td>{val.ArticleType}</td>  
                              <td><td className="td-none">Status:</td>{ArticleStatusView(val.ArticleStatus)}</td>  
                              <td><td className="td-none">Created at:</td>{val.ArticleCreatedAt}</td>  
                              <td><td className="td-none">Updated at:</td>{val.ArticleUpdatedAt}</td>
                            
                           <td>
                           
                           <td><Button variant="primary" onClick={() => {routeChange(val.ArticleId)}}>Setting</Button></td>
                         
                              
                           <td><Button onClick={() => {deleteArticle(val.ArticleId)}}>Delete</Button></td>
                          
                            </td>
                            </tr> 
                            
                        
                      )
                  })}</tbody>
                </ReactBootStrap.Table>

             
                
        </div >
        
    );
}