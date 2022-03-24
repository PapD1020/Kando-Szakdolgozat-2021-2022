import React from "react";
import "./topbar.css";
import {Outlet, Link} from 'react-router-dom';
import { NotificationsNone, Language, Settings, Accessibility,AccountTree} from "@material-ui/icons";

export default function Topbar() {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">Admin Panel</span>
          </div>

          <div className="topMiddle">
         
               
                  
                  
                  
                  <Link to="/articleslist"><AccountTree/> </Link> {" "}
                  
                  <Link to="/userlist"><Accessibility/></Link> {" "}
                  
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