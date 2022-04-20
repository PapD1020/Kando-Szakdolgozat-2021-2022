import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import { Card, Button } from 'react-bootstrap';

export default function CreateArticle(props){
  
    const [ArticleNameList, setArticleNameList] = useState([]);
    
    const [LoginStatus, setLoginStatus] = useState('');

    const GotUserId = useRef(null);
    

    Axios.defaults.withCredentials = true;

      //check every time we refresh the page if a user is logged in
      useEffect(() => {
          Axios.get('http://localhost:3001/api/login/user').then((response) => {
          //ellenőrzésre
          //console.log("Are we logged in: " + JSON.stringify(response));
              if(response.data.loggedIn === true){
                  setLoginStatus(response.data.user[0].UserUn);
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
        });
          });
      }, []);

      
      let navigate = useNavigate();
      const routeChange = (gotId) =>{
        navigate('/editArticle', {state:{id: gotId}});
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

                          <div className="text-center">
                            <Button variant="primary" onClick={() => {routeChange(val.ArticleId)}}>Select article for editing</Button>
                          </div>
                        </div>
                      )
                  })}
        </div>
    );
}
