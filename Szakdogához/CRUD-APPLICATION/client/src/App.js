import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from 'react-router-dom';
import {Nav, Navbar, Container, NavDropdown} from "react-bootstrap";
import Axios from 'axios';
import React, {useEffect, useState, useRef} from "react";

export default function App(){

  //Authot vagy logint? Tokent vagy cookiet?
  
  const [LoginStatus, setLoginStatus] = useState('');

  const AuthStatus = useRef(false);

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
        //cookies.remove("userId"); lehet import kell hozzá, most back endben próbálom
        alert("cookies destroyed muhahahahahahahah!!!!");
      }
      else{
        alert("not destroyed.");
      }
    })
  }

  return(
    <div>
      <div className='App'>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand className=''>IdeaShare</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">

              <Nav className="me-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/registration">Registration</Nav.Link>
                <Nav.Link href="/articles">Articles</Nav.Link>
                <Nav.Link href="/createArticle">Create Article</Nav.Link>
                <Nav.Link href="/chooseArticle">Edit Article</Nav.Link>
                <Nav.Link href="/profilePage">Profile Page</Nav.Link>
              </Nav>

              {LoginStatus && (
                <NavDropdown title={LoginStatus} id="basic-nav-dropdown">
                  <NavDropdown.Item href="profilePage">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}

              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Outlet />
        </div>
    </div>
  );
};