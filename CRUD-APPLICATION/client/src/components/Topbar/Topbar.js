import React from "react";
import "./topbar.css";
import {Outlet, Link} from 'react-router-dom';
import { NotificationsNone, Language, Settings, Accessibility,AccountTree} from "@material-ui/icons";
import { Button,Nav,Navbar, NavDropdown } from "react-bootstrap";

export default function Topbar() {
  let user=JSON.parse(localStorage.getItem('token'))
  function logOut(){
    localStorage.clear();

  }
    return (
      <div >
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="">Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Nav className="mr-auto nav_bar_wrapper">
            
              
                  <Link to="/articles"><Button>Home</Button></Link> 
                  <Link to="/articleslist"><Button>Articleslist</Button></Link> 
                  
                  <Link to="/userlist"><Button>Userlist</Button></Link> 
                  
             
                  <Link to="/login"><Button>Login</Button></Link> 
                  <Link to="/registration"><Button>Registration</Button></Link>
              

            

          </Nav>
          
          <Nav className="justify-content-end">
              <Link to="/profilePage"><img src=""/* {val.UserPP} */ alt=""/* {val.UserPP}  */className="topAvatar" /></Link>
              <NavDropdown title="">
                <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
              </NavDropdown>
          </Nav>
          
        </Navbar>
       
      </div>
    );
  }