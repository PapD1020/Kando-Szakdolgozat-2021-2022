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

  const [ErrorMessage, setErrorMessage] = useState('');
  const [SuccessfullMessage, setSuccessfullMessage] = useState('');

  Axios.defaults.withCredentials = true;

      //check every time we refresh the page if a user is logged in
      useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
            //ellenőrzésre
            //console.log("Are we logged in: " + JSON.stringify(response));
            if(response.data.loggedIn === true){
                setLoginStatus(true);
                setLoginName(response.data.user[0].UserUn);
            }
        });
    }, []);

    const checkLoginStatus = () => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
          //ellenőrzésre
          //console.log("Are we logged in: " + JSON.stringify(response));
          if(response.data.loggedIn === true){
              setLoginStatus(true);
              setLoginName(response.data.user[0].UserUn);
          }
      });
    }

    const submitUserDataLogin = () => {
  
      Axios.post('http://localhost:3001/api/login/user', { 
      userUn: UserUnLogin, userPw: UserPwLogin
      }).then((response) => {

          if(!response.data.auth){ 
              setErrorMessage(response.data.message);
              setLoginStatus(false);
              console.log("Login user response.data: " + JSON.stringify(response.data));
          }
          else{
              localStorage.setItem("token", response.data.token);
              checkLoginStatus();
              setSuccessfullMessage(response.data.message);
              handleClose();
              routeChangeArticles();
          }
      });
  };


  const logout = () =>{

    Axios.get("http://localhost:3001/api/user/logout").then((response) => {
      if(response.data.cookiesDestroyed === true){
        localStorage.removeItem("token");
        if(response.data.loggedIn === false){
          setLoginStatus(false);
          routeChange();
        }
      }
      else{
        alert("not destroyed.");
      }
    })
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

const onSubmit = () => {
    submitUserDataLogin();
};

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  return(
    <div>
      <Navbar sticky='top' collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="/">IdeaShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!LoginStatus && (
            <Nav>
              <Nav.Link onClick={handleShow}>Login</Nav.Link>
              <Nav.Link href="/registration">Registration</Nav.Link>
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

            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
          {LoginStatus && (
            <NavDropdown title={LoginName} id="basic-nav-dropdown">
              <NavDropdown.Item href="profilePage">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
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

                        <div className="row">
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
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                  <img style={{objectFit: 'cover', objectPosition: 'center'}}
                    className="d-block w-100 h-100"
                    src={picture3}
                    alt="Third slide"
                  />
  
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        )}

      <Outlet />

    </div>
  );
};