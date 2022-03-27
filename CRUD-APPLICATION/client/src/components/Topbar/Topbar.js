import React from "react";
import "./topbar.css";
import {Outlet, Link} from 'react-router-dom';
import { NotificationsNone, Language, Settings, Accessibility,AccountTree} from "@material-ui/icons";
import { Button } from "react-bootstrap";

export default function Topbar() {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">Admin Panel</span>
          </div>

          <div className="topMiddle">
         
      
                  <Link to="/articleslist"><Button>Articleslist</Button></Link> {" "}
                  
                  <Link to="/userlist"><Button>Userlist</Button></Link> {" "}
                  
                  {/* <Link to="/all">All</Link>  */}
                
               
            </div>
          <div className="topRight">
                  <Link to="/login">Login</Link> | {" "}
                  <Link to="/registration">Registration</Link> | {" "}
            <div className="topbarIconContainer">
              <Settings />
            </div>
            
            <Link to="/profilePage"><img src="" alt="" className="topAvatar" /></Link>
          </div>
        </div>
      </div>
    );
  }