import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from 'react-router-dom';
import {Nav, Navbar, Container, NavDropdown} from "react-bootstrap";
import Axios from 'axios';
import React, {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import { Modal, Button} from "react-bootstrap";
import { Overlay, Tooltip } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import picture1 from "./pictures/picture1.jpg";
import picture3 from "./pictures/picture3.png";

export default function App(){
  
  const [LoginStatus, setLoginStatus] = useState('');
  const [LoginName, setLoginName] = useState('');

  const [UserUnLogin, setUserUnLogin] = useState('');
  const [UserPwLogin, setUserPwLogin] = useState('');

  const [ProfileP, setProfileP] = useState('');

  const [UserUnReg, setUserUnReg] = useState('');
  const [UserPPReg, setUserPPReg] = useState('');
  const [UserPwReg, setUserPwReg] = useState('');
  const [UserFNReg, setUserFNReg] = useState('');
  const [UserSNReg, setUserSNReg] = useState('');
  const [UserDobReg, setUserDobReg] = useState('');
  const [UserEmailReg, setUserEmailReg] = useState('');

  const [Message, setMessage] = useState('');
  const [MessageError, setMessageError] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');

  const [IsAdmin, setIsAdmin] = useState(false);

  const adminFalse = () => setIsAdmin(false);
  const adminTrue = () => setIsAdmin(true);

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

  Axios.defaults.withCredentials = true;

      useEffect(() => {
        checkLoginStatus()
    });

    const checkLoginStatus = () => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
          if(response.data.loggedIn === true){
              setLoginStatus(true);
              setProfileP(response.data.user[0].UserPP);
              setLoginName(response.data.user[0].UserUn);
              if(response.data.user[0].UserPL === 9){
                adminTrue();
              }
          }
      });
    }

    const submitUserDataReg = () => {

          Axios.post('http://localhost:3001/api/register/user', { 
          userUn: UserUnReg,
          userPP: UserPPReg,
          userPw: UserPwReg,
          userFN: UserFNReg,
          userSN: UserSNReg,
          userDob: UserDobReg,
          userEmail: UserEmailReg,
          userCreatedAt: date,
          userUpdatedAt: date
          }).then((response) => {
            setMessage(response.data.message)
            handleShowSucReg()
          }).catch((error) => {
            setMessageError(error.response.data.message);
            handleShowError();
          })
      };

    const submitUserDataLogin = () => {
  
      Axios.post('http://localhost:3001/api/login/user', {
      userUn: UserUnLogin, userPw: UserPwLogin
      }).then((response) => {

          if(!response.data.auth){ 
              setErrorMessage(response.data.message);
              setLoginStatus(false);
          }
          else{
              localStorage.setItem("token", response.data.token);
              if(response.data.result[0].UserPL === 9){
                adminTrue();
              }
              checkLoginStatus();
              handleClose();
              routeChangeArticles();
          }
      }).catch((error) => {
        setErrorMessage(error.response.data.message)
        handleCloseError();
      })
  };

  const logout = () =>{

    Axios.get("http://localhost:3001/api/user/logout").then((response) => {
      if(response.data.cookiesDestroyed === true){
        localStorage.removeItem("token");
        if(response.data.loggedIn === false){
          setLoginStatus(false);
          adminFalse();
          routeChange();
        }
      }
    }).catch((error) => {
      setMessageError(error.response.data.message);
      handleShowError();
    });
  }

  let navigate = useNavigate();
  const routeChange = () =>{
    navigate('/');
  }

  const routeChangeArticles = () => {
    navigate('/articles');
  }

  const{
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const{
    register: register2,
    handleSubmit: handleSubmit2,
    formState:{errors: errors2}
  } = useForm();

  const onSubmit = () => {
      submitUserDataLogin();
  };

  const onSubmitReg = () => {
    submitUserDataReg();
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showReg, setShowReg] = useState(false);

  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true);

  const [showSucReg, setShowSucReg] = useState(false);

  const handleCloseSucReg = () => setShowSucReg(false);
  const handleShowSucReg = () => setShowSucReg(true);

  const [showLogout, setShowLogout] = useState(false);

  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);

  const [showError, setShowError] = useState(false);

  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  return(
    <div>
      <Navbar className='shadow-lg' sticky='top' collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="/">IdeaShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!LoginStatus && (
            <Nav>
              <Nav.Link onClick={handleShow}>Login</Nav.Link>
              <Nav.Link onClick={handleShowReg}>Registration</Nav.Link>
            </Nav>
            )}

            {LoginStatus && (
              <Nav>
                <Nav.Link href="/articles">Articles</Nav.Link>
                <Nav.Link href="/createArticle">Create Article</Nav.Link>
                <Nav.Link href="/chooseArticle">Edit Article</Nav.Link>
                <Nav.Link href="/profilePage">Profile Page</Nav.Link>
              </Nav>
            )}

            {IsAdmin && (
              <NavDropdown title="Admin page" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/userlist">Users' list</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="articlelist">Articles' list</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="commentlist">Comments' list</NavDropdown.Item>
            </NavDropdown>
            )}
          </Nav>

          <Nav>
          {LoginStatus && (
                <Navbar.Brand>
                  <img
                    alt=""
                    src={ProfileP}
                    width="35"
                    height="35"
                    className="d-inline-block align-top rounded"
                  />{' '}
                </Navbar.Brand>
              )}

            {LoginStatus && (
            <NavDropdown title={LoginName} id="basic-nav-dropdown">
              <NavDropdown.Item href="profilePage">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleShowLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login to your IdeaShare account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="ms-3">
            <div className="col-md-auto">
                <h1 className="display-1 m-3">Login</h1>
            </div>
                <div className="container">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="form-group">
                                    <label className="display-5 mb-3">Username:</label>
                                    <input className="form-control p-2 mb-3" type="text" {
                                        ...register("userName", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 30,
                                            //pattern: /^([A-ZÁÉÚŐÓÜÖÍ]([a-záéúőóüöí.]+\s?)){2,}$/
                                        })
                                    } onChange={(e) =>{
                                        setUserUnLogin(e.target.value);
                                    }} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="errordiv text-danger mb-2">
                                    {errors?.userName?.type === "required" && <div className=""><h5>This field is required!</h5><p>Your must enter your user name.</p></div>}
                                    {errors?.userName?.type === "minLength" && <div className=""><h5>Your user name is too short.</h5><p>Your user name length must be between 3 and 30 characters.</p></div>}
                                    {errors?.userName?.type === "maxLength" && <div className=""><h5>Your user name is too long.</h5><p>Your user name length must be between 3 and 30 characters.</p></div>}
                                    {errors?.userName?.type === "pattern" && <div className=""><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="form-group">
                                    <label className="display-5 mb-3 mt-3">Password: </label>
                                    <input type="password" className="mb-3 p-2 form-control"{
                                        ...register("userPw", {
                                            required: true,
                                            minLength: 8,
                                            maxLength: 16
                                        })
                                    } onChange={(e) => {
                                        setUserPwLogin(e.target.value);
                                    }}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="errordiv text-danger mb-2">
                                    {errors?.userPw?.type === "required" && <div><h5>This field is required!</h5><p>Your must enter your password.</p></div>}
                                    {errors?.userPw?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                    {errors?.userPw?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-auto">
                                <input className="btn btn-outline-primary" type="submit" value={"Login"}/>
                            </div>
                            <div className="col-sm-auto">
                                <div className="fit p-2" ref={target} onClick={() => setShowTooltip(!showTooltip)}>
                                    Help <AiOutlineQuestionCircle/>
                                </div>

                                <Overlay target={target.current} show={showTooltip} placement="bottom">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            <span>Your user name length must be between 3 and 30 characters.<br></br>
                                            Your password length must be between 8 and 16 characters.</span>
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                        </div>

                        <div className="row mt-2 mb-3">
                            <div className="col">
                               <div className="text-danger">
                                {ErrorMessage && (
                                    <p>{ErrorMessage}</p>
                                )}
                               </div>
                            </div>
                        </div>
                    </form>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div>
        <Modal show={showReg} fullscreen={true} onHide={() => setShowReg(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Creating your IdeaShare account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="ms-3">
              <div className="col-lg-auto">
                  <h1 className="display-1 m-3">Registration</h1>
              </div>

                <div className="container">
                    <form className="" onSubmit={handleSubmit2(onSubmitReg)}>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-5 mb-3">Username:</label>
                                    <input className="form-control p-2 mb-3" type="text" {
                                        ...register2("userUnReg", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 30,
                                            //pattern: /^([A-ZÁÉÚŐÓÜÖÍ]([a-záéúőóüöí.]+\s?)){2,}$/
                                        })
                                    } onChange={(e) =>{
                                        setUserUnReg(e.target.value);
                                    }} />
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors2?.userUnReg?.type === "required" && <div><h5>This field is required!</h5><p>Your must have a user name.</p></div>}
                                    {errors2?.userUnReg?.type === "minLength" && <div><h5>Your user name is too short.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                    {errors2?.userUnReg?.type === "maxLength" && <div><h5>Your user name is too long.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                    {errors2?.userUnReg?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                </div>
                            </div>
                            
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-5 mb-3">Password:</label>
                                    <input className="form-control p-2 mb-3" type="password" {
                                        ...register2("userPwReg", {
                                            required: true,
                                            minLength: 8,
                                            maxLength: 16
                                        })
                                    } onChange={(e) =>{
                                        setUserPwReg(e.target.value);
                                    }} />
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors2?.userPwReg?.type === "required" && <div><h5>This field is required!</h5><p>Your must have a password</p></div>}
                                    {errors2?.userPwReg?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                    {errors2?.userPwReg?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-5 mt-3">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Profile picture:</label>
                                    <input className="form-control p-2 mb-3" type="URL" {
                                        ...register2("userPPReg", {
                                            minLength: 10,
                                            maxLength: 500,
                                        })
                                    } onChange={(e) =>{
                                        setUserPPReg(e.target.value);
                                    }} />
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors2?.userPPReg?.type === "minLength" && <div><h5>The URL is too short.</h5><p>Your URL length must be between 10 and 500 characters.</p></div>}
                                    {errors2?.userPPReg?.type === "maxLength" && <div><h5>The URL is too long.</h5><p>Your URL length must be between 10 and 500 characters.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-5 mt-3">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Email:</label>
                                    <input className="form-control p-2 mb-3" type="email" {
                                        ...register2("userEmailReg", {
                                            required: true,
                                            maxLength: 40,
                                        })
                                    } onChange={(e) =>{
                                        setUserEmailReg(e.target.value);
                                    }} />
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors2?.userEmailReg?.type === "required" && <div><h5>This field is required!</h5></div>}
                                    {errors2?.userEmailReg?.type === "maxLength" && <div><h5>Your email's length is too long.</h5><p>Your email must not exceed 40 characters.</p></div>}
                                </div>
                            </div>
                            
                        </div>

                        <div className="row">
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="display-6 mb-3">First name:</label>
                                    <input type="text" className="mb-3 p-2 form-control"{
                                        ...register2("userFNReg", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 20,
                                        })
                                    } onChange={(e) => {
                                        setUserFNReg(e.target.value);
                                    }}/>
                                </div>

                                <div className="errordiv text-danger mb-4">
                                    {errors2?.userFNReg?.type === "required" && <div><h5>This field is required!</h5></div>}
                                    {errors2?.userFNReg?.type === "minLength" && <div><h5>Your first name is too short.</h5><p>Your first name length must be between 3 and 20 characters.</p></div>}
                                    {errors2?.userFNReg?.type === "maxLength" && <div><h5>Your first name is too long.</h5><p>Your first name length must be between 3 and 20 characters.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Second name:</label>
                                    <input type="text" className="mb-3 p-2 form-control"{
                                        ...register2("userSNReg", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 20,
                                        })
                                    } onChange={(e) => {
                                        setUserSNReg(e.target.value);
                                    }}/>
                                </div>

                                <div className="errordiv text-danger mb-4">
                                    {errors2?.userSNReg?.type === "required" && <div><h5>This field is required!</h5></div>}
                                    {errors2?.userSNReg?.type === "minLength" && <div><h5>Your second name is too short.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                    {errors2?.userSNReg?.type === "maxLength" && <div><h5>Your second name is too long.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Date of birth:</label>
                                    <input type="date" className="mb-3 p-2 form-control"{
                                        ...register2("userDobReg", {
                                            required: true,
                                        })
                                    } onChange={(e) => {
                                        setUserDobReg(e.target.value);
                                    }}/>
                                </div>

                                <div className="errordiv text-danger mb-4">
                                    {errors2?.userDobReg?.type === "required" && <div><h5>This field is required!</h5></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-sm-auto">
                                <input className="btn btn-outline-primary" type="submit" value={"Register"}/>
                            </div>
                        </div>
                    </form>
                </div>
              </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseReg}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {!LoginStatus && (
        <div className='container'>
          <div className='col'>
            <div className='m-5'>
              <Carousel variant='dark' fade>
                <Carousel.Item>
                  <img style={{objectFit: 'cover', objectPosition: 'center'}}
                    className="d-block w-100 h-100"
                    src={picture1}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>Share you ideas</h3>
                    <p>Change the world for the better.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                  <img style={{objectFit: 'cover', objectPosition: 'center'}}
                    className="d-block w-100 h-100"
                    src={picture3}
                    alt="Third slide"
                  />
  
                  <Carousel.Caption> 
                    <h3>Together we can do anything.</h3>
                    <p>Meet with likeminded people.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        )}

        <Modal show={showSucReg} onHide={handleCloseSucReg}>
          <Modal.Header closeButton>
            <Modal.Title>{Message} as</Modal.Title>
          </Modal.Header>
          <Modal.Body>{UserUnReg}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {handleCloseReg(); handleCloseSucReg(); handleShow()}}>
              Let's go to the login page
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showLogout} onHide={handleCloseLogout}>
          <Modal.Header closeButton>
            <Modal.Title>Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to log out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {handleCloseLogout(); logout();}}>
              Logout
            </Button>
            <Button variant="secondary" onClick={() => {handleCloseLogout()}}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

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

      <Outlet />
    </div>
  );
};