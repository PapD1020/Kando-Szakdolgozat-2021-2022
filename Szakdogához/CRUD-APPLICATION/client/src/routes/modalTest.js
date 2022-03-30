import React, {useState, useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';

export default function CreateArticle(){

    const [ArticleNameUpd, setArticleNameUpd] = useState('');
    const [ArticleSmDescrUpd, setArticleSmDescrUpd] = useState('');
    const [ArticleMDescrUpd, setArticleMDescrUpd] = useState('');
    const [ArticleImgUpd, setArticleImgUpd] = useState('');
    const [ArticleTypeUpd, setArticleTypeUpd] = useState('');
    //articleType
  
    const [ArticleNameList, setArticleNameList] = useState([]);
    
    const [LoginStatus, setLoginStatus] = useState('');

    const GotUserId = useRef(null);
    const GotArticleId = useRef(null);

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
        //submitArticleData();
    };

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
          console.log("Új articles get: " + response.data);
        });
          });
      }, []);

      
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

                          <button>Edit</button>
                        </div>
                      )
                  })}

            <h1>{LoginStatus}</h1>
        </div>
    );
}

//Modal pop up test. Works!
/*
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
class App extends Component {
  state = {
    isOpen: false
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  render() {
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <Button variant="primary" onClick={this.openModal}>
            Launch demo modal
          </Button>
        </div>
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default App;
*/