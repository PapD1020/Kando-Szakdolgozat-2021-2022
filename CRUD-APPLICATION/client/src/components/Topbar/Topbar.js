import React from "react";
import "./topbar.css";
import {Outlet, Link} from 'react-router-dom';
import { NotificationsNone, Language, Settings, Accessibility,AccountTree} from "@material-ui/icons";
import { Button,Nav,Navbar, NavDropdown,Container } from "react-bootstrap";

export default function Topbar() {
  //let user=JSON.parse(localStorage.getItem('token'))
  function logOut(){
    localStorage.clear();

  }
    return (
      <div >
  
      <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
      <Navbar.Brand href="#home">Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
                    <Link to="/articles"><Button>Home</Button></Link> 
                    <Link to="/articleslist"><Button>Articleslist</Button></Link> 
                    
                    <Link to="/userlist"><Button>Userlist</Button></Link> 
                    
              
                    <Link to="/login"><Button>Login</Button></Link> 
                    <Link to="/registration"><Button>Registration</Button></Link>

          
        </Nav>
        <Nav>
        <Link to="/profilePage"><img src=""/* {val.UserPP} */ alt=""/* {val.UserPP}  */className="topAvatar" /></Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
     
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
      </Navbar>
</div>
    );
  }