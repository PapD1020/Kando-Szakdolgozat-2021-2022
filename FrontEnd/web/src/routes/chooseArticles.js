import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';


export default function CreateArticle(props){
  
    const [ArticleNameList, setArticleNameList] = useState([]);
    const [MessageError, setMessageError] = useState('');

    const GotUserId = useRef(null);
    
    Axios.defaults.withCredentials = true;

    const [showError, setShowError] = useState(false);

    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

    const [showNotFound, setShowNotFound] = useState(false);

    const handleCloseNotFound = () => setShowNotFound(false);
    const handleShowNotFound = () => setShowNotFound(true);

      useEffect(() => {
          Axios.get('http://localhost:3001/api/login/user').then((response) => {
              if(response.data.loggedIn === true){
                  GotUserId.current = response.data.user[0].UserId;
              }
          }).then(() => {
            Axios.get('http://localhost:3001/api/get/article/allById', {
          headers: {
            'content-type': "application/json",
            'userId': GotUserId.current
          }
        }).then((response) => {
          setArticleNameList(response.data);
        }).catch((error) => {
            if(error.response.data.message === 'Not found'){
              handleShowNotFound();
            }
            else{
              setMessageError(error.response.data.message);
              handleShowError();
            }
        })
          });
      }, []);

      let navigate = useNavigate();
      const routeChange = (gotId) =>{
        navigate('/editArticle', {state:{id: gotId}});
      }

      const routeChangeCreateArticle = () => {
        navigate('/createArticle');
      }
      
    return(
        <div>
          {ArticleNameList.map((val) => {
                      return(
                        <div className="card">
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
                            <Card.Footer className="bg-dark bg-opacity-25">
                              <Card.Text>Created at: {val.ArticleCreatedAt}</Card.Text>
                            </Card.Footer>
                          </Card>

                          <div className="text-center mb-3">
                            <Button variant="primary" onClick={() => {routeChange(val.ArticleId)}}>Select article for editing</Button>
                          </div>
                        </div>
                      )
                  })}

              <Modal className="text-danger" show={showError} onHide={handleCloseError}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{MessageError}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {handleCloseError();}}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal className="text-primary" show={showNotFound} onHide={handleCloseNotFound}>
                <Modal.Header closeButton>
                    <Modal.Title>Oops</Modal.Title>
                </Modal.Header>
                <Modal.Body>It seems you do not have any articles</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => {handleCloseNotFound(); routeChangeCreateArticle();}}>
                    Let's go and create one
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
