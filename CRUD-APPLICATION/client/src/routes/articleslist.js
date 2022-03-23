import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';
import * as ReactBootStrap from "react-bootstrap";
import { Button,Modal } from "react-bootstrap";

export default function Article(){
    
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);

  const [ArticleName, setArticleName] = useState('');
  const [ArticleSmDescr, setArticleSmDescr] = useState('');
  const [ArticleMDescr, setArticleMDescr] = useState('');
  const [ArticleImg, setArticleImg] = useState('');
  const [ArticleStatus, setArticleStatus] = useState('');
  const [ArticleType, setArticleType] = useState('');
  

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
    const deleteArticle = (article) =>{
      Axios.delete(`http://localhost:3001/api/delete/article/${article}`); // with altgr+7 you can add variables to it

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

  setArticleStatus("");
  alert("Successfuly changed! Please click on the refresh button.");
  setShow(false);
  refreshArticleData();
};
    return(
        <div >
           <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {ArticleNameSetting.map((val) => {
                      return(
                        <div >
                          <p>Name:<input type="text" name="articleName" defaultValue={val.ArticleName} onChangeCapture={(e) => {
                            setArticleName(e.target.value)}}></input> </p>

                          <p>Small description:  <input type="text" name="articleSmDescr" defaultValue={val.ArticleSmDescr} onChangeCapture={(e) => {
                            setArticleSmDescr(e.target.value)}}></input> </p>

                          <p>Main description:  <textarea type="text" name="articleMDescr" defaultValue={val.ArticleMDescr} onChangeCapture={(e) => {
                              setArticleMDescr(e.target.value)}}></textarea> </p>

                          <p>Image: <input type="text" name="articleImg" defaultValue={val.ArticleImg} onChangeCapture={(e) => {
                            setArticleImg(e.target.value)}}></input></p>
                            
                          <p>Type: <input type="text" name="articleType" defaultValue={val.ArticleType} onChangeCapture={(e) => {
                            setArticleType(e.target.value)}}></input></p>
                          <p>Status: <input type="number" name="articleStatus" defaultValue={val.ArticleStatus} onChangeCapture={(e) => {
                             setArticleStatus(e.target.value)}}></input> </p>
                          <p>Created at: {val.ArticleCreatedAt}</p>
                          <p>Updated at: {val.ArticleUpdatedAt}</p>

                                        
                          <Button onClick={() => {updateArticleStatus(val.ArticleId)}}>Update</Button>
                         
                        </div>
                      )
                })} 
          </Modal.Body>
          
        </Modal>
        <Button className="btn" onClick={refreshArticleData}>Refresh</Button>
            <ReactBootStrap.Table>
                        <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Small description</th>
                                    <th>Main description</th>
                                    <th>Image</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                </tr>
                          </thead>
          
                  {ArticleNameList.map((val) => {
                      return(

                          <tbody>
                            <tr>
                              <td>{val.ArticleName}</td>    
                              <td>{val.ArticleSmDescr}</td>  
                              <td>{val.ArticleMDescr}</td>  
                              <td><img src={val.ArticleImg} style={{ width: "80%" }} alt={val.ArticleImg} /></td>  
                              <td>{val.ArticleType}</td>  
                              <td>{val.ArticleStatus}</td>  
                              <td>{val.ArticleCreatedAt}</td>  
                              <td>{val.ArticleUpdatedAt}</td>  

                            
                           <td>
                           
                           <Button variant="primary" onClick={() => {ArticleSetting(val.ArticleId)}}>Setting</Button>
                         
                              
                          <Button onClick={() => {deleteArticle(val.ArticleName)}}>Delete</Button>
                          
                            </td>
                            </tr> 
                            </tbody>
                        
                      )
                  })}
                </ReactBootStrap.Table>
          
        </div>
    );
}