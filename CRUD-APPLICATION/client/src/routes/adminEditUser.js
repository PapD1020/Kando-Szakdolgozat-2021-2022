import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";

export default function EditUser() {

  const [UserUnUpd, setUserUnUpd] = useState('');
  const [UserPPUpd, setUserPPUpd] = useState('');
  const [UserFNUpd, setUserFNUpd] = useState('');
  const [UserSNUpd, setUserSNUpd] = useState('');
 
  const [UserPLUpd, setUserPLUpd] = useState('');
  const [UserEmailUpd, setUserEmailUpd] = useState('');

  const location = useLocation();

  const [LoginStatus, setLoginStatus] = useState(false);

  const [OneUserList, setOneUserList] = useState([]);

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
        //getChoosenArticleById();
        console.log('useEffect asd');
      }
    });
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/get/user/${location.state.id}`).then((response) => {
      setOneUserList(response.data);
      modalOpen();
      console.log("One user get: " + JSON.stringify(response));
    })
 
}, []);

  /*
  const getChoosenArticleById = () => {
    alert("függvény meghívva")
    Axios.get('http://localhost:3001/api/get/article/oneById1', {
      headers: {
        'content-type': "application/json",
        'articleId1': location.state.id
      }
    }).then((response) => {
      setOneArticleList(response.data);
      console.log("One article get: " + JSON.stringify(response));
    })
  }
  */

  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/userlist');
  }

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = (data) => {
      alert(JSON.stringify(data));
      submitUserData();
  };

  const submitUserData = () => {

    //articleName - backend variable name
    Axios.put('http://localhost:3001/api/update/user', { //URL for our api (node.js backend)
      userId: location.state.id,
      userUn: UserUnUpd,
      userPP: UserPPUpd,
      userFN: UserFNUpd,
      userSN: UserSNUpd,
     
      userPL: UserPLUpd,
      userEmail: UserEmailUpd,
      userUpdatedAt: date
    });
  };

  const UserPLView=(UserPL)=>{
    if(UserPL==-2){UserPL = "Törölt"}
    if(UserPL==-1){UserPL = "Felfüggesztett"}
    if(UserPL==0){UserPL = "Inaktív"}
    if(UserPL==1){UserPL = "Aktív"}
    if(UserPL==9){UserPL = "Admin"}

  
    return UserPL;
  }

  return (
    <div>
      <h1>Logged in as: {LoginStatus}</h1>
      <h1>Sent ArticleId from chooseArticles.js page: {location.state.id}</h1>
        <button>Get choosen article by id</button>
        <div>
          {OneUserList.map((val) => {
            return(
              <div>
                    <Modal show={ModalState} onHide={modalClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>You are editing {val.UserUn} article</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        {OneUserList.map((val) => {
                                return(
                                  <form onSubmit={handleSubmit(onSubmit)}>
        
                                  <div className="form-group">
                                      <label>User name:</label>
                                      <input type="text" className="form-control" defaultValue={val.UserUn}{
                                          ...register("userUnUpd", {
                                              minLength: 6,
                                              maxLength: 20,
                                              pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                                          })
                                      }onChange={(e) => {
                                          setUserUnUpd(e.target.value);
                                      }}/>
                                      
                                      {errors?.userUnUpd?.type === "minLength" && <div><h5>Your user name is too short.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                      {errors?.userUnUpd?.type === "maxLength" && <div><h5>Your user name is too long.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                      
                                  </div>
                                  
                                  <div className="form-group">
                                      <label>User profile picture:</label>
                                      <input type="url" className="form-control" defaultValue={val.UserPP}{
                                          ...register("userPPUpd", {
                                            required: true,
                                          })
                                      }onChange={(e) => {
                                          setUserPPUpd(e.target.value);
                                      }}/>
                      
                                  </div>
                      
                                 {/* <div className="form-group">
                                      <label>User password: </label>
                                      <input type="password" className="form-control" defaultValue={val.UserPw}{
                                          ...register("userPwUpd", {
                                              minLength: 8,
                                              maxLength: 16,
                                          })
                                      }onBlur={(e) => {
                                          setUserPwUpd(e.target.value);
                                      }}/>
                      
                                      {errors?.userPwUpd?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                      {errors?.userPwUpd?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                  </div> */}
                      
                                  <div className="form-group">
                                      <label>User first name:</label>
                                      <input type="text" className="form-control" defaultValue={val.UserFN}{
                                          ...register("userFNUpd", {
                                              minLength: 3, //Mennyi legyen?
                                              maxLength: 20, //Mennyi legyen?
                                          })
                                      }onChange={(e) => {
                                          setUserFNUpd(e.target.value);
                                      }}/>
                      
                                      {errors?.userFNUpd?.type === "minLength" && <div><h5>Your first name is too short.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
                                      {errors?.userFNUpd?.type === "maxLength" && <div><h5>Your first name is too long.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
                                  </div>
                      
                                  <div className="form-group">
                                      <label>User second name:</label>
                                      <input type="text" className="form-control" defaultValue={val.UserSN}{
                                          ...register("userSNUpd", {
                                              minLength: 3, //Mennyi legyen?
                                              maxLength: 20, //Mennyi legyen?
                                          })
                                      }onChange={(e) => {
                                          setUserSNUpd(e.target.value);
                                      }}/>
                      
                                      {errors?.userSNUpd?.type === "minLength" && <div><h5>Your second name is too short.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                      {errors?.userSNUpd?.type === "maxLength" && <div><h5>Your second name is too long.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                  </div>
                      
                                  <div className="form-group">
                                      <label>User email: </label>
                                      <input type="email" className="form-control" defaultValue={val.UserEmail}{
                                          ...register("userEmailUpd", {
                                              //vmi must contain @ ellenőrzés stb
                                          })
                                      }onChange={(e) => {
                                          setUserEmailUpd(e.target.value);
                                      }}/>
                                  </div>

                                  

                                  <div className="form-group">
                                      <label>User PermissonL:</label>
                                      <select id="status" className="form-control" required {
                                          ...register("userPL", {
                                              required: true,
                                          })
                                      } onChange={(e) => {
                                        setUserPLUpd(e.target.value);
                                      }}>
                                          <option defaultValue={val.UserPL}>{UserPLView(val.UserPL)}</option>
                                          <option value="-2">Törlés</option>
                                          <option value="-1">Felfüggesztett</option>
                                          <option value="0">Inaktív</option>
                                          <option value="1">Aktív</option>
                                          <option value="9">Admin</option>
                                      </select>
                                  </div>
                      
                                  <input type="submit" onClick={() => {
                                      if(UserUnUpd === ""){setUserUnUpd(val.UserUn)}
                                      if(UserPPUpd === ""){setUserPPUpd(val.UserPP)}   
                                      if(UserFNUpd === ""){setUserFNUpd(val.UserFN)}
                                      if(UserSNUpd === ""){setUserSNUpd(val.UserSN)}                                    
                                      if(UserPLUpd === ""){setUserPLUpd(val.UserPL)}
                                      if(UserEmailUpd === ""){setUserEmailUpd(val.UserEmail)}

                                                        
                          
                                  }}/> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
                              </form>
                      
                                  ) 
                                })}
                      </Modal.Body>
                    
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                          modalClose();
                          routeChange();

                        }}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
              </div>
              )
            })}
          </div>

          
    </div>

  )
}