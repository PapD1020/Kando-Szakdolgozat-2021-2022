import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { Card } from 'react-bootstrap';

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
    Axios.get(`http://localhost:3001/api/get/user/${location.state.id}`).then((response) => {
      setOneUserList(response.data);
      modalOpen();
      console.log("One user get: " + JSON.stringify(response));
    })
 
}, []);



  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/userlist');
  }

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = () => {
      
      submitUserData();
      routeChange();
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
        <div>
          {OneUserList.map((val) => {
            return(
              <div className=''>
                <Card style={{backgroundImage: `url(${val.UserPP})`, backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  color: 'white'
                  }} className="text-center m-5 bg-dark">
                    <Card.Header className="bg-dark bg-opacity-50">{val.UserUn}</Card.Header>
                    
                    <Card.Footer className="bg-dark bg-opacity-25">Created at: {val.UserCreatedAt}</Card.Footer>
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
                        <Modal.Title>You are editing {val.UserUn} user</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        {OneUserList.map((val) => {
                                return(
                                  <div className="container">
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <div className="form-group">
                                          <label className="display-6 mb-3">User name:</label>
                                          <input type="text" className="form-control p-2 mb-3" defaultValue={val.UserUn}{
                                              ...register("userUnUpd", {
                                                  minLength: 6,
                                                  maxLength: 20,
                                                  pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                                              })
                                          }onChange={(e) => {
                                              setUserUnUpd(e.target.value);
                                          }}/>
                                          <div className="errordiv text-danger mb-2">
                                            {errors?.userUnUpd?.type === "minLength" && <div><h5>Your user name is too short.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                            {errors?.userUnUpd?.type === "maxLength" && <div><h5>Your user name is too long.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                          </div>
                                      </div>
                                    </div>
                                  <div className="col-lg-3">  
                                    <div className="form-group">
                                        <label className="display-6 mb-3">User first name:</label>
                                        <input type="text" className="mb-3 p-2 form-control" defaultValue={val.UserFN}{
                                            ...register("userFNUpd", {
                                                minLength: 3, //Mennyi legyen?
                                                maxLength: 20, //Mennyi legyen?
                                            })
                                        }onChange={(e) => {
                                            setUserFNUpd(e.target.value);
                                        }}/>
                                      <div className="errordiv text-danger mb-2">
                                        {errors?.userFNUpd?.type === "minLength" && <div><h5>Your first name is too short.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
                                        {errors?.userFNUpd?.type === "maxLength" && <div><h5>Your first name is too long.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4">   
                                    <div className="form-group">
                                        <label className="display-6 mb-3">User second name:</label>
                                        <input type="text" className="mb-3 p-2 form-control" defaultValue={val.UserSN}{
                                            ...register("userSNUpd", {
                                                minLength: 3, //Mennyi legyen?
                                                maxLength: 20, //Mennyi legyen?
                                            })
                                        }onChange={(e) => {
                                            setUserSNUpd(e.target.value);
                                        }}/>
                                      <div className="errordiv text-danger mb-2">
                                        {errors?.userSNUpd?.type === "minLength" && <div><h5>Your second name is too short.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                        {errors?.userSNUpd?.type === "maxLength" && <div><h5>Your second name is too long.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                     </div>
                                    </div>                                   
                                  </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-lg-7">
                                      <div className="form-group">
                                        <label className="display-6 mb-3">User profile picture:</label>
                                        <input type="url" class="mb-3 p-2 form-control" defaultValue={val.UserPP}{
                                            ...register("userPPUpd", {
                                              required: true,
                                            })
                                        }onChange={(e) => {
                                            setUserPPUpd(e.target.value);
                                        }}/>
                        
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <div className="form-group">
                                          <label className="display-6 mb-3">User email: </label>
                                          <input type="email" className="form-control p-2 mb-3" defaultValue={val.UserEmail}{
                                              ...register("userEmailUpd", {
                                                  //vmi must contain @ ellenőrzés stb
                                              })
                                          }onChange={(e) => {
                                              setUserEmailUpd(e.target.value);
                                          }}/>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                  <div className="col-sm-auto">
                                    <div className="col-lg-3">
                                  <div className="form-group">
                                      <label className="display-6 mb-3">User PermissonL:</label>
                                      <select id="permisson" required {
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
                                    </div>
                                    </div>
                                  </div>
                                  
                                  <div className="row mt-3 mb-5">
                                    <div className="col-sm-auto">
                                    <Button className='mt-5' variant='primary' type="submit" onClick={() => {
                                      if(UserUnUpd === ""){setUserUnUpd(val.UserUn)}
                                      if(UserPPUpd === ""){setUserPPUpd(val.UserPP)}   
                                      if(UserFNUpd === ""){setUserFNUpd(val.UserFN)}
                                      if(UserSNUpd === ""){setUserSNUpd(val.UserSN)}                                    
                                      if(UserPLUpd === ""){setUserPLUpd(val.UserPL)}
                                      if(UserEmailUpd === ""){setUserEmailUpd(val.UserEmail)}
                                      
                                      }}>
                                      Update
                                      </Button>
                                
                                  </div>                 
                              </div>   {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
                            </form>
                          </div>
                                  ) 
                                })}
                      </Modal.Body>
                    
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                          modalClose();

                        }}>
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