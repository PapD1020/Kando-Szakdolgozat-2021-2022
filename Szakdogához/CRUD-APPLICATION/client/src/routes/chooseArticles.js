import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import { Card } from 'react-bootstrap';

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
                  //GotArticleId.current = response.data.article[0].ArticleId;
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
          console.log("Új articles get: " + response);
        });
          });
      }, []);

      
      let navigate = useNavigate();
      const routeChange = (gotId) =>{
        alert("Második selected got id: " + gotId);
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
                            </Card.Body>
                            <Card.Footer className="bg-dark bg-opacity-25">Created at: {val.ArticleCreatedAt}</Card.Footer>
                          </Card>

                          <button onClick={() => {routeChange(val.ArticleId)}}>Select article for editing</button>

                        </div>
                      )
                  })}

            <h1>{LoginStatus}</h1>
        </div>
    );
}
