import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import Axios from 'axios';

export default function CreateArticle(props){

    const [ArticleNameUpd, setArticleNameUpd] = useState('');
    const [ArticleSmDescrUpd, setArticleSmDescrUpd] = useState('');
    const [ArticleMDescrUpd, setArticleMDescrUpd] = useState('');
    const [ArticleImgUpd, setArticleImgUpd] = useState('');
    const [ArticleTypeUpd, setArticleTypeUpd] = useState('');
    //articleType
  
    const [ArticleNameList, setArticleNameList] = useState([]);
    
    const [LoginStatus, setLoginStatus] = useState('');

    const GotUserId = useRef(null);
    

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
        navigate('/editArticle', {state:{id: gotId, asd: "asd"}});
      }

      /*
      const gotSelectedArticleId = (id) =>{
        alert("Első got selected id: " + id);
        return id;
      }
      */
      
    return(
        <div>
          {ArticleNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>Article name: {val.ArticleName}</h1>
                          <h2>Article small description: {val.ArticleSmDescr}</h2>
                          <p>Article main description: {val.ArticleMDescr}</p>
                          <p>Article image: {val.ArticleImg}</p>
                          <p>Article status: {val.ArticleStatus}</p>
                          <p>Article created at: {val.ArticleCreatedAt}</p>
                          <p>Article updated at: {val.ArticleUpdatedAt}</p>

                          <button onClick={() => {routeChange(val.ArticleId)}}>Select article for editing</button>

                        </div>
                      )
                  })}

            <h1>{LoginStatus}</h1>
        </div>
    );
}
