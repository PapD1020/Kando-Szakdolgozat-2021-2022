import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from 'react-router-dom';
import {Nav, Navbar, Container } from "react-bootstrap";
import Axios from 'axios';
import React, {useEffect, useState} from "react";

export default function App(){

  //Authot vagy logint? Tokent vagy cookiet?
  
  const [LoginStatus, setLoginStatus] = useState('');
  
  useEffect(() => {
    Axios.get('http://localhost:3001/api/login/user').then((response) => {
        //ellenőrzésre
        //console.log("Are we logged in: " + JSON.stringify(response));
        if(response.data.loggedIn === true){
            setLoginStatus(response.data.user[0].UserUn);
        }
    });
}, []);
  

  return(
    <div className='App'>
      <Navbar bg="primary" variant="dark">
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
                <Navbar.Text>
                  Signed in as: {LoginStatus}
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};