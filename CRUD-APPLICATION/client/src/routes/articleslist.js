import React, {useState, useEffect,useRef} from "react";
import '../App.css';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import * as ReactBootStrap from "react-bootstrap";
import { Button,Modal } from "react-bootstrap";

export default function Article(){
    
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);

  
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

  alert("Successfuly changed! Please click on the refresh button.");
  setShow(false);
  refreshArticleData();
};
const ArticleStatusView=(ArticleStatus)=>{
  if(ArticleStatus==-2){ArticleStatus = "Törölt"}
  if(ArticleStatus==-1){ArticleStatus = "Felfüggesztett"}
  if(ArticleStatus==0){ArticleStatus = "Inaktív"}
  if(ArticleStatus==1){ArticleStatus = "Aktív"}

  return ArticleStatus;
}

    return(
        <div >
           <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {ArticleNameSetting.map((val) => {
            
                      return(
                        <div>
                          
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-group"> 
                          <label>Name: </label><input type="text" className="form-control" defaultValue={val.ArticleName}{
                              ...register(val.ArticleName,{
                              required: true,
                              minLength: 6,
                              maxLength: 20,
                              pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                              })                            
                            }
                            
                            onBlur={(e) => {ArticleName = e.target.value}}></input>
                            
                            {errors?.articleName?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a name.</p></div>}
                            {errors?.articleName?.type === "minLength" && <div><h5>Your article's name is too short.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                            {errors?.articleName?.type === "maxLength" && <div><h5>Your article's name is too long.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                            {errors?.articleName?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                         </div>
                        <div className="form-group">   
                          <label>Small description:</label>  <input type="text" className="form-control" defaultValue={val.ArticleSmDescr} {
                            ...register("articleSmDescr", {
                              required: true,
                              minLength: 8,
                              maxLength: 100,
                              pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                          })
                            }onBlur={(e) => {ArticleSmDescr = e.target.value}}></input>

                            {errors?.articleSmDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a small description of your article.</p></div>}
                            {errors?.articleSmDescr?.type === "minLength" && <div><h5>Your article's small description is too short.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                            {errors?.articleSmDescr?.type === "maxLength" && <div><h5>Your article's small description is too long.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                            {errors?.articleSmDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                        </div>
                        <div className="form-group">  
                          <label>Main description:</label>  <textarea type="text" className="form-control" defaultValue={val.ArticleMDescr} {
                            ...register("articleMDescr", {
                              required: true,
                              minLength: 8,
                              maxLength: 100,
                              pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                            })
                            }onBlur={(e) => {ArticleMDescr=e.target.value}}></textarea> 
                            {errors?.articleMDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a small description of your article.</p></div>}
                            {errors?.articleMDescr?.type === "minLength" && <div><h5>Your article's small description is too short.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                            {errors?.articleMDescr?.type === "maxLength" && <div><h5>Your article's small description is too long.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                            {errors?.articleMDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                        </div>
                        <div className="form-group">
                          <label>Image:</label> <input type="url" className="form-control" defaultValue={val.ArticleImg} {
                                ...register("articleImg", {
                                    required: true, //kötelező legyen?
                                    minLength: 20, //Mennyi legyen?
                                    maxLength: 500, //Mennyi legyen?
                                })
                              }onBlur={(e) => {ArticleImg=e.target.value}}/>

                              {errors?.articleImg?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a picture</p></div>}
                              {errors?.articleImg?.type === "minLength" && <div><h5>Your article's picture URL is too short.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                              {errors?.articleImg?.type === "maxLength" && <div><h5>Your article's picture URL is too long.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                        </div>   
                        <div className="form-group">
                          <label>Type:</label> <select id="types" className="form-control" required {
                                ...register(val.ArticleType, {
                                    required: true,
                                })
                              }onBlur={(e) => {ArticleType=e.target.value}}>
                                <option value={val.ArticleType}>{val.ArticleType}</option>
                                <option value="Programming">Programming</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="invalid-feedback">You must select a article type.</div>
                        </div>
                        <div className="form-group">
                          <label>Status:</label> <select id="status" className="form-control"  required {
                                ...register(ArticleStatusView(val.ArticleStatus), {
                                    required: true,
                                })
                            } onBlur={(e) => {ArticleStatus=e.target.value}}>
                              <option value={val.ArticleStatus} >{ArticleStatusView(val.ArticleStatus)}</option>
                              <option value="-2">Törlés</option>
                              <option value="-1">Felfüggesztett</option>
                              <option value="0">Inaktív</option>
                              <option value="1">Aktív</option>
                              </select>
                              <div className="invalid-feedback">You must select a article status.</div>
                          </div>
                          <p>Created at: {val.ArticleCreatedAt}</p>
                          <p>Updated at: {val.ArticleUpdatedAt}</p>

                                      
                          <Button  onClick={() => {
                            
                            if ( ArticleName === "" ) { ArticleName = val.ArticleName }
                            if ( ArticleSmDescr === "" ) { ArticleSmDescr = val.ArticleSmDescr}
                            if ( ArticleMDescr === "" ) { ArticleMDescr = val.ArticleMDescr }
                            if ( ArticleImg === "" ) { ArticleImg = val.ArticleImg }
                            if ( ArticleType === "" ) { ArticleType = val.ArticleType }
                            if ( ArticleStatus=== "" ) { ArticleStatus = val.ArticleStatus} 
                            
                          
                            updateArticleStatus(val.ArticleId)
                            
                            }}>Update</Button>
                           
                         </form> 
                        </div>
                      )
                })} 
          </Modal.Body>
          
        </Modal>
        
            <ReactBootStrap.Table striped bordered hover>
                        <thead class="tabla">
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

                          <tbody class="status">
                            <tr>
                              <td>{val.ArticleName}</td>    
                              <td>{val.ArticleSmDescr}</td>  
                              <td>{val.ArticleMDescr}</td>  
                              <td><img src={val.ArticleImg} style={{ width: "80%" }} alt={val.ArticleImg} /></td>  
                              <td>{val.ArticleType}</td>  
                              <td>  {ArticleStatusView(val.ArticleStatus)}</td>  
                              <td>{val.ArticleCreatedAt}</td>  
                              <td>{val.ArticleUpdatedAt}</td>  

                            
                           <td>
                           
                           <td><Button variant="primary" onClick={() => {ArticleSetting(val.ArticleId)}}>Setting</Button></td>
                         
                              
                           <td><Button onClick={() => {deleteArticle(val.ArticleName)}}>Delete</Button></td>
                          
                            </td>
                            </tr> 
                            </tbody>
                        
                      )
                  })}
                </ReactBootStrap.Table>
          
        </div>
    );
}