import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

export default function Article(){
    const [ArticleName, setArticleName] = useState('');
    const [ArticleSmDescr, setArticleSmDescr] = useState('');
    const [ArticleMDescr, setArticleMDescr] = useState('');
    const [ArticleImg, setArticleImg] = useState('');
    const [ArticleStatus, setArticleStatus] = useState('');

    const [ArticleNameList, setArticleNameList] = useState([]); //'' hibás, [] kell használni

    const [NewArticleStatus, setNewArticleStatus] = useState('');

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    //On page load get articles
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/article', {
      headers: {
        'content-type': "application/json",
        'item': 1
      }
    }).then((response) => {
      
      setArticleNameList(response.data);
      console.log("Új articles get: " + response.data);
    });
    }, []);

    //GET - POST
    //Refresh Article data
    const refreshArticleData = () => {

        Axios.get('http://localhost:3001/api/get/article', {
          headers: {
            'content-type': "application/json",
            'item': 1
          }
        }).then((response) => {
    
        setArticleNameList(response.data);
        //console.log(response.data); //console logging the SELECT * FROM article to the frontend terminal
        });
    };

    //POST - POST
    //Request the submit button
    const submitArticleData = () => {
      //articleName - backend variable name
      Axios.post('http://localhost:3001/api/insert/article', { //URL for our api (node.js backend)
          articleName: ArticleName,
          articleSmDescr: ArticleSmDescr,
          articleMDescr: ArticleMDescr,
          articleImg: ArticleImg,
          articleStatus: ArticleStatus,
          articleCreatedAt: date,
          articleUpdatedAt: date
      });
        
    setArticleNameList([
        ...ArticleNameList,
        {
          ArticleName: ArticleName,
          ArticleSmDescr: ArticleSmDescr,
          ArticleMDescr: ArticleMDescr,
          ArticleImg: ArticleImg,
          ArticleStatus: ArticleStatus,
          ArticleCreatedAt: date,
          ArticleUpdatedAt: date
        }, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem articleName: ArticleName
    ]);
    
    };

    //DELETE - POST
    const deleteArticle = (article) =>{
      Axios.delete(`http://localhost:3001/api/delete/article/${article}`); // with altgr+7 you can add variables to it

      alert("Successfuly deleted. Please click on the refresh button.")
      //kell frissítés, hogy eltünjön a törölt, submitos nem működik
    };

    //PUT - POST
    const updateArticleStatus = (article) =>{

      Axios.put('http://localhost:3001/api/update/article', {
          articleName: article,
          articleStatus: NewArticleStatus,
          articleUpdatedAt: date
      });

      console.log("Article ArticleUpdatedAt: " + date);

      setNewArticleStatus("");
      alert("Successfuly changed! Please click on the refresh button.");
    };

    return(
        <div className="smallContainer">
          <div className='form'>
            <h3>POST</h3>
                <label>ArticleName</label>
                <input type="text" name="articleName" onChange={(e) => {
                  setArticleName(e.target.value);
                }}></input>

                <label>ArticleSmDescr</label>
                <input type="text" name="articleSmDescr" onChange={(e) => {
                  setArticleSmDescr(e.target.value);
                }}></input>

                <label>ArticleMDescr</label>
                <input type="text" name="articleMDescr" onChange={(e) => {
                  setArticleMDescr(e.target.value);
                }}></input>

                <label>ArticleImg</label>
                <input type="text" name="articleImg" onChange={(e) => {
                  setArticleImg(e.target.value);
                }}></input>

                <label>ArticleStatus</label>
                <input type="number" name="articleStatus" onChange={(e) => {
                  setArticleStatus(e.target.value);
                }}></input>

                <button className="btn" onClick={submitArticleData}>Add article</button>
                <button className="btn" onClick={refreshArticleData}>Refresh article data</button>

                <div className="cardContainer">
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

                          <button onClick={() => {deleteArticle(val.ArticleName)}}>Delete Article</button>

                          <input type="number" className="updateInput" onChange={(e) => {
                            setNewArticleStatus(e.target.value);
                          }}></input>

                          <button onClick={() => {updateArticleStatus(val.ArticleName)}}>Update Article</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>
    );
}