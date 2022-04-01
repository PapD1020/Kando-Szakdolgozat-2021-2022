import React, {useState, useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import {Link, useNavigate, useLocation} from "react-router-dom";

export default function CreateArticle(){

    const [ArticleNameUpd, setArticleNameUpd] = useState('');
    const [ArticleSmDescrUpd, setArticleSmDescrUpd] = useState('');
    const [ArticleMDescrUpd, setArticleMDescrUpd] = useState('');
    const [ArticleImgUpd, setArticleImgUpd] = useState('');
    const [ArticleTypeUpd, setArticleTypeUpd] = useState('');
    //articleType

    const [OneArticleList, setOneArticleList] = useState([]);
    
    const [LoginStatus, setLoginStatus] = useState('');

    //const GotArticleId = useRef(null);

    Axios.defaults.withCredentials = true;

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        submitArticleData();
    };

      /*
      //ez jó
      const location = useLocation();
      var GotArticleId = location.state.id;
      alert("GotArticleId: " + GotArticleId);
      */

      
      //EZ IS JÓ
      const GotArticleId = useRef(null);

      const GetSelectedArticleId = () => {
        const location = useLocation();
        GotArticleId.current = location.state.id;
        alert("GotArticleId.current in useEffect: " + GotArticleId.current);
      }
      
      const GetChoosenArticleById = (id) => {
  
        Axios.get('http://localhost:3001/api/get/article/oneById', {
          headers: {
            'content-type': "application/json",
            'articleId': id
          }
        }).then((response) => {
  
          alert("itt vagyok");
          setOneArticleList(response.data);
          console.log("One article get: " + response);
        });
    }


    useEffect(GetSelectedArticleId());
    
    //check every time we refresh the page if a user is logged in
    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
        //ellenőrzésre
        //console.log("Are we logged in: " + JSON.stringify(response));
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0].UserUn);
                console.log("useEffect: " + response);
            }
        });
    }, []);
  

    const submitArticleData = () => {

        //articleName - backend variable name
        Axios.put('http://localhost:3001/api/update/articleById', { //URL for our api (node.js backend)
          articleName: ArticleNameUpd,
          articleSmDescr: ArticleSmDescrUpd,
          articleMDescr: ArticleMDescrUpd,
          articleImg: ArticleImgUpd,
          articleType: ArticleTypeUpd,
          articleUpdatedAt: date
      });
        
      setOneArticleList([
        ...OneArticleList,
        {
          ArticleName: ArticleNameUpd,
          ArticleSmDescr: ArticleSmDescrUpd,
          ArticleMDescr: ArticleMDescrUpd,
          ArticleImg: ArticleImgUpd,
          ArticleType: ArticleTypeUpd,
          ArticleCreatedAt: date,
          ArticleUpdatedAt: date
        }, //Valamiért mind a kettőt nagy A-vel kell írni, az első értékeket, azaz nem articleName: ArticleName
      ]);
    };

    const [ModalState, setModalState] = useState(false);

    const modalClose = () => setModalState(false);

    const modalOpen = () => setModalState(true);

    let navigate = useNavigate();
    const routeChangeBack = () =>{
      navigate('/chooseArticle');
    }

    return(
        <div>
          {OneArticleList.map((val) => {
                      return(
                        <div className="card">
                          <h1>Article name: {val.ArticleName}</h1>
                          <h2>Article small description: {val.ArticleSmDescr}</h2>
                          <p>Article main description: {val.ArticleMDescr}</p>
                          <p>Article image: {val.ArticleImg}</p>
                          <p>Article status: {val.ArticleStatus}</p>
                          <p>Article created at: {val.ArticleCreatedAt}</p>
                          <p>Article updated at: {val.ArticleUpdatedAt}</p>

                          <div
                              className="d-flex align-items-center justify-content-center"
                              style={{ height: "100vh" }}
                            >
                              
                              <Button variant="primary" onClick={() => {modalOpen();}}>
                                  Edit
                              </Button>

                              <Modal show={ModalState} onHide={modalClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Modal heading</Modal.Title>
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
                                              minLength: 150,
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

                                    <input type="submit" onClick={submitArticleData()}/> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
                                  </form>
                                  ) 
                                })}
                              </Modal.Body>
                            
                              <Modal.Footer>
                                <Button variant="secondary" onClick={() => {modalClose();}}>
                                  Close
                                </Button>
                            </Modal.Footer>
                          </Modal>
                          </div>

                          
                        </div>
                      )
                  })}

            <h1>{LoginStatus}</h1>

            {/*<button onClick={routeChangeBack()}>Back</button>*/}
        </div>
        
    );
}