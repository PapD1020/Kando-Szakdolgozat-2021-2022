import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from 'react-router-dom';
import {Nav, Navbar, Container, NavDropdown} from "react-bootstrap";
import Axios from 'axios';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function App(){
  
  const [LoginStatus, setLoginStatus] = useState('');

      //check every time we refresh the page if a user is logged in
      useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
            //ellenőrzésre
            //console.log("Are we logged in: " + JSON.stringify(response));
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0].UserUn);
            }
        });
    }, []);


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
    navigate('/login');
  }

  return(
    <div>
      <Navbar sticky='top' collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
        <Navbar.Brand>IdeaShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!LoginStatus && (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
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
            <NavDropdown title={LoginStatus} id="basic-nav-dropdown">
              <NavDropdown.Item href="profilePage">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};