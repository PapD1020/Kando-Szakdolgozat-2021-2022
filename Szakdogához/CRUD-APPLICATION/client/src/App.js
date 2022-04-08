import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from 'react-router-dom';
import {Nav, Navbar, Container, NavDropdown} from "react-bootstrap";
import Axios from 'axios';
import React, {useEffect, useState, useRef} from "react";

export default function App(){

  //Authot vagy logint? Tokent vagy cookiet?
  const [AuthStatus, setAuthStatus] = useState(false);
  const [LoginName, setLoginName] = useState();

  const checkLoginStatus = () => {

    Axios.get("http://localhost:3001/api/login/user/auth",
    {headers:{
      "x-access-token": localStorage.getItem("token")
    }}).then((response) => {
      setAuthStatus(response.data.isUserAuth);
      setLoginName(response.data.UserUn);
      alert("user auth response: " + JSON.stringify(response.data))
    });
  }

  useEffect(() => {
    checkLoginStatus();
  })

  const logout = () =>{
    localStorage.removeItem("token");
  }

  return(
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

          {AuthStatus && (
            <NavDropdown title={LoginName} id="basic-nav-dropdown">
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
  );
};