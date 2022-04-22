import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { Card } from 'react-bootstrap';

export default function EditArticle() {

  const [ArticleNameUpd, setArticleNameUpd] = useState('');
  const [ArticleSmDescrUpd, setArticleSmDescrUpd] = useState('');
  const [ArticleMDescrUpd, setArticleMDescrUpd] = useState('');
  const [ArticleImgUpd, setArticleImgUpd] = useState('');
  const [ArticleTypeUpd, setArticleTypeUpd] = useState('');
  const [ArticleStatusUpd, setArticleStatusUpd] = useState('');

  const location = useLocation();
 
  const [LoginStatus, setLoginStatus] = useState(false);

  const [OneArticleList, setOneArticleList] = useState([]);

  const [ModalState, setModalState] = useState(false);

  const [DuplicateError, setDuplicateError] = useState('');
  const [DuplicateErrorMsg, setDuplicateErrorMsg] = useState('');
  const modalClose = () => setModalState(false);

  const modalOpen = () => setModalState(true);

  Axios.defaults.withCredentials = true;

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

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/get/article/${location.state.id}`).then((response) => {
      setOneArticleList(response.data);
      modalOpen();
      console.log("One article get: " + JSON.stringify(response));
    })
 
}, []);

  

  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/articlelist');
  }

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = () => {
     
      submitArticleData();
      routeChange();
  };

  const submitArticleData = () => {

    //articleName - backend variable name
    Axios.put('http://localhost:3001/api/update/article/byUser', { //URL for our api (node.js backend)
      articleId: location.state.id,
      articleName: ArticleNameUpd,
      articleSmDescr: ArticleSmDescrUpd,
      articleMDescr: ArticleMDescrUpd,
      articleImg: ArticleImgUpd,
      articleType: ArticleTypeUpd,
      articleStatus: ArticleStatusUpd,
      articleUpdatedAt: date
      
    });
    
  };
  const ArticleStatusView=(ArticleStatus)=>{
    if(ArticleStatus==-2){ArticleStatus = "Törölt"}
    if(ArticleStatus==-1){ArticleStatus = "Felfüggesztett"}
    if(ArticleStatus==0){ArticleStatus = "Inaktív"}
    if(ArticleStatus==1){ArticleStatus = "Aktív"}
  
    return ArticleStatus;
  }

  return (
    <div>
        <div>
          {OneArticleList.map((val) => {
            return(
              <div className=''>
                  <Card style={{backgroundImage: `url(${val.ArticleImg})`, backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  color: 'white'
                  }} className="text-center m-5 bg-dark">
                    <Card.Header className="bg-dark bg-opacity-50">{val.ArticleName}</Card.Header>
                    <Card.Body className="bg-dark bg-opacity-25">
                      <Card.Title>{val.ArticleSmDescr}</Card.Title>
                      <Card.Text>
                        {val.ArticleMDescr}
                      </Card.Text>
                      <Card.Text>
                        Article Status: {val.ArticleStatus}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-dark bg-opacity-25">Created at: {val.ArticleCreatedAt}</Card.Footer>
                  </Card>

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "10vh" }}
                  >

                    <Button variant="outline-primary" onClick={modalOpen}>
                      Edit
                    </Button>
                  </div>
                    <Modal show={ModalState} fullscreen={true} onHide={modalClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>You are editing {val.ArticleName} article</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        {OneArticleList.map((val) => {
                                return(
                                  <div className="container">
                                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="form-group">
                                                    <label className="display-6 mb-3">Article type:</label>
                                                    <select id="types" className="form-control p-2 mb-3"{
                                                        ...register("articleTypeUpd", {
                                                            required: true,
                                                        })
                                                    } onChange={(e) => {
                                                        setArticleTypeUpd(e.target.value);
                                                    }}>
                                                        <option defaultValue={val.ArticleType}>{val.ArticleType}</option>
                                                        <option value="Programming">Programming</option>
                                                        <option value="Programming">Other</option>
                                                    </select>
                                                    
                                                </div>

                                                <div className="errordiv text-danger mb-2">
                                                    {errors?.articleTypeUpd?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a type.</p></div>}
                                                </div>
                                            </div>

                                            <div className="col-lg-3">
                                                <div className="form-group">
                                                    <label className="display-6 mb-3">Article name:</label>
                                                    <input type="text" className="mb-3 p-2 form-control" defaultValue={val.ArticleName}{
                                                        ...register("articleNameUpd", {
                                                            required: true,
                                                            minLength: 1,
                                                            maxLength: 20
                                                        })
                                                    } onChange={(e) => {
                                                        setArticleNameUpd(e.target.value);
                                                    }}/>
                                                </div>

                                                <div className="errordiv text-danger mb-2">
                                                    {errors?.articleNameUpd?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a name.</p></div>}
                                                    {errors?.articleNameUpd?.type === "minLength" && <div><h5>Your article's name is too short.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                                                    {errors?.articleNameUpd?.type === "maxLength" && <div><h5>Your article's name is too long.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                                                    {errors?.articleNameUpd?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <label className="display-6 mb-3">Article image:</label>
                                                    <input type="url" className="mb-3 p-2 form-control" defaultValue={val.ArticleImg}{
                                                        ...register("articleImgUpd", {
                                                            required: true,
                                                            minLength: 1,
                                                            maxLength: 500
                                                        })
                                                    } onChange={(e) => {
                                                        setArticleImgUpd(e.target.value);
                                                    }}/>
                                                </div>

                                                <div className="errordiv text-danger mb-2">
                                                    {errors?.articleImgUpd?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a picture</p></div>}
                                                    {errors?.articleImgUpd?.type === "minLength" && <div><h5>Your article's picture URL is too short.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                                                    {errors?.articleImgUpd?.type === "maxLength" && <div><h5>Your article's picture URL is too long.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <label className="display-5 mb-3 mt-3">Article small description:</label>
                                                    <textarea rows="3" className="mb-3 p-2 form-control" defaultValue={val.ArticleSmDescr}{
                                                        ...register("articleSmDescrUpd", {
                                                            required: true,
                                                            minLength: 1,
                                                            maxLength: 100
                                                        })
                                                    } onChange={(e) => {
                                                        setArticleSmDescrUpd(e.target.value);
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-auto">
                                                <div className="errordiv text-danger mb-2">
                                                    {errors?.articleSmDescrUpd?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a small description of your article.</p></div>}
                                                    {errors?.articleSmDescrUpd?.type === "minLength" && <div><h5>Your article's small description is too short.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                                                    {errors?.articleSmDescrUpd?.type === "maxLength" && <div><h5>Your article's small description is too long.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                                                    {errors?.articleSmDescrUpd?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-auto">
                                                <div className="form-group">
                                                    <label className="display-5 mb-3 mt-3">Article main description:</label>
                                                    <textarea rows="10" cols="170" className="mb-3 p-2 form-control" defaultValue={val.ArticleMDescr}{
                                                        ...register("articleMDescrUpd", {
                                                            required: true,
                                                            minLength: 3,
                                                            maxLength: 500
                                                        })
                                                    } onChange={(e) => {
                                                        setArticleMDescrUpd(e.target.value);
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-auto">
                                                <div className="errordiv text-danger mb-2">
                                                    {errors?.articleMDescrUpd?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a main description of your article.</p></div>}
                                                    {errors?.articleMDescrUpd?.type === "minLength" && <div><h5>Your article's main description is too short.</h5><p>Your article's main description length must be between 150 and 500 characters.</p></div>}
                                                    {errors?.articleMDescrUpd?.type === "maxLength" && <div><h5>Your article's main description is too long.</h5><p>Your article's main description length must be between 150 and 500 characters.</p></div>}
                                                    {errors?.articleMDescrUpd?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-auto">
                                              <div className="form-group">
                                                  <label>Article status:</label>
                                                  <select id="status" className="form-control" required {
                                                      ...register("articleStatus", {
                                                          required: true,
                                                      })
                                                  } onChange={(e) => {
                                                      setArticleStatusUpd(e.target.value);
                                                  }}>
                                                      <option defaultValue={val.ArticleStatus}>{ArticleStatusView(val.ArticleStatus)}</option>
                                                      <option value="1">Aktív</option>
                                                      <option value="0">Inaktív</option>
                                                      <option value="-1">Felfüggesztett</option>
                                                      <option value="-2">Törölt</option>
                                                  </select>
                                              </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3 mb-5">
                                            <div className="col-sm-auto">
                                            <Button className='mt-5' variant='primary' type="submit"
                                              onClick={() => {
                                    
                                                  if ( ArticleNameUpd === "" ) { setArticleNameUpd(val.ArticleName) }
                                                  if ( ArticleSmDescrUpd === "" ) { setArticleSmDescrUpd(val.ArticleSmDescr)}
                                                  if ( ArticleMDescrUpd === "" ) { setArticleMDescrUpd(val.ArticleMDescr)}
                                                  if ( ArticleImgUpd === "" ) { setArticleImgUpd(val.ArticleImg)}
                                                  if ( ArticleTypeUpd === "" ) { setArticleTypeUpd(val.ArticleType)}
                                                  if ( ArticleStatusUpd === "" ) { setArticleStatusUpd(val.ArticleStatus)}
                                                }}>
                                                Update
                                            </Button>
                                            </div>
                                        </div>
                                    </form>
                                  </div>
                                  ) 
                                })}
                      </Modal.Body>
                
                      <Modal.Footer>
                        <Button variant="outline-secondary" onClick={modalClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
              </div>
              )
            })}
          </div>

          <div className='ms-5 d-flex align-items-center justify-content-center'>
            <Button variant='primary' onClick={routeChange}>Back to selection page</Button>
          </div>

          {DuplicateError && (
            <div>
              Duplicate error: {DuplicateErrorMsg}
            </div> 
          )}
    </div>
  )

}