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

  const [DuplicateError, setDuplicateError] = useState('');
  const [DuplicateErrorMsg, setDuplicateErrorMsg] = useState('');

  const location = useLocation();

  const [LoginStatus, setLoginStatus] = useState(false);

  const [OneArticleList, setOneArticleList] = useState([]);

  const [ModalState, setModalState] = useState(false);

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
        getChoosenArticleById();
      }
    });
  }, []);

  const getChoosenArticleById = () => {

    Axios.get('http://localhost:3001/api/get/article/oneById', {
      headers: {
        'content-type': "application/json",
        'articleId': location.state.id
      }
    }).then((response) => {
      setOneArticleList(response.data);
      console.log("One article get: " + JSON.stringify(response));
    })
  }

  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/chooseArticle');
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
    }).then((response) => {
      if(response.data.errorType === "duplicate"){
        setDuplicateError(true);
        setDuplicateErrorMsg(response.data.errorMessage);
      }
    })
  };

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
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                      <label>Article type:</label>
                                      <select id="types" className="form-control" required {
                                          ...register("articleType", {
                                              required: false,
                                          })
                                      } onChange={(e) => {
                                          setArticleTypeUpd(e.target.value);
                                      }}>
                                          <option defaultValue={val.ArticleType}>{val.ArticleType}</option>
                                          <option value="Programming">Programming</option>
                                          <option value="Other">Other</option>
                                      </select>
                                      <div className="invalid-feedback">You must select a article type.</div>
                                  </div>

                                  <div className="form-group">
                                      <label>Article name:</label>
                                      <input type="text" className="form-control" defaultValue={val.ArticleName} {
                                          ...register("articleName", {
                                              minLength: 6,
                                              maxLength: 20,
                                              pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                                          })
                                      }onChange={(e) => {
                                          setArticleNameUpd(e.target.value);
                                      }}/>
                                      
                                      {errors?.articleName?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a name.</p></div>}
                                      {errors?.articleName?.type === "minLength" && <div><h5>Your article's name is too short.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                                      {errors?.articleName?.type === "maxLength" && <div><h5>Your article's name is too long.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                                      {errors?.articleName?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                  </div>
                                  
                                  <div className="form-group">
                                      <label>Article small description:</label>
                                      <input type="text" className="form-control" defaultValue={val.ArticleSmDescr} {
                                          ...register("articleSmDescr", {
                                              minLength: 8,
                                              maxLength: 100,
                                              pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                                          })
                                      }onChange={(e) => {
                                          setArticleSmDescrUpd(e.target.value);
                                      }}/>

                                      {errors?.articleSmDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a small description of your article.</p></div>}
                                      {errors?.articleSmDescr?.type === "minLength" && <div><h5>Your article's small description is too short.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                                      {errors?.articleSmDescr?.type === "maxLength" && <div><h5>Your article's small description is too long.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                                      {errors?.articleSmDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                  </div>

                                  <div className="form-group">
                                      <label>Article main description:</label>
                                      <input type="text" className="form-control" defaultValue={val.ArticleMDescr} {
                                          ...register("articleMDescr", {
                                              minLength: 3,
                                              maxLength: 500,
                                              pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                                          })
                                      }onChange={(e) => {
                                          setArticleMDescrUpd(e.target.value);
                                      }}/>

                                      {errors?.articleMDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a main description of your article.</p></div>}
                                      {errors?.articleMDescr?.type === "minLength" && <div><h5>Your article's main description is too short.</h5><p>Your article's main description length must be between 150 and 500 characters.</p></div>}
                                      {errors?.articleMDescr?.type === "maxLength" && <div><h5>Your article's main description is too long.</h5><p>Your article's main description length must be between 150 and 500 characters.</p></div>}
                                      {errors?.articleMDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                  </div>

                                  <div className="form-group">
                                      <label>Article image:</label>
                                      <input type="url" className="form-control" defaultValue={val.ArticleImg} {
                                          ...register("articleImg", {
                                              minLength: 20, //Mennyi legyen?
                                              maxLength: 500, //Mennyi legyen?
                                          })
                                      }onChange={(e) => {
                                          setArticleImgUpd(e.target.value);
                                      }}/>

                                      {errors?.articleImg?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a picture</p></div>}
                                      {errors?.articleImg?.type === "minLength" && <div><h5>Your article's picture URL is too short.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                                      {errors?.articleImg?.type === "maxLength" && <div><h5>Your article's picture URL is too long.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                                    </div>

                                    <div className="form-group">
                                      <label>Article status:</label>
                                      <select id="status" className="form-control" required {
                                          ...register("articleStatus", {
                                              required: true,
                                          })
                                      } onChange={(e) => {
                                          setArticleStatusUpd(e.target.value);
                                      }}>
                                          <option defaultValue={val.ArticleStatus}>{val.ArticleStatus}</option>
                                          <option value="1">Aktív</option>
                                          <option value="0">Inaktív</option>
                                          <option value="-2">Törölt</option>
                                      </select>
                                  </div>

                                    <Button className='mt-5' variant='primary' type="submit"
                                      onClick={() => {
                            
                                        if ( ArticleNameUpd === "" ) { setArticleNameUpd(val.ArticleName) }
                                        if ( ArticleSmDescrUpd === "" ) { setArticleSmDescrUpd(val.ArticleSmDescr)}
                                        if ( ArticleMDescrUpd === "" ) { setArticleMDescrUpd(val.ArticleMDescr)}
                                        if ( ArticleImgUpd === "" ) { setArticleImgUpd(val.ArticleImg)}
                                        if ( ArticleTypeUpd === "" ) { setArticleTypeUpd(val.ArticleType)}
                                        if ( ArticleStatusUpd === "" ) { setArticleStatusUpd(val.ArticleStatus)}
                                      }}>
                                        Submit
                                    </Button>
                                  </form>
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

          <div className='ms-5'>
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
