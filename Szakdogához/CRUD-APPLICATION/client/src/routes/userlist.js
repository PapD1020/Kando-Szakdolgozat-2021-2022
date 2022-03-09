import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';
import {Outlet, Link} from 'react-router-dom';
import '../css/userlist.css';
import * as ReactBootStrap from "react-bootstrap";

export default function UsersList(){
 

    const [UsersNameList, setUsersNameList] = useState([]);

    const [NewUserEmail, setNewUserEmail] = useState('');

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    //On page load get users
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/users').then((response) => {
  
      setUsersNameList(response.data);
    });
    }, []);

    //GET - USERS
    const refreshUserData = () => {
      Axios.get('http://localhost:3001/api/get/users').then((response) => {
  
      setUsersNameList(response.data);
    });
  };
  
  
  
  //DELETE - USERS
  const deleteUser = (user) =>{
    Axios.delete(`http://localhost:3001/api/delete/users/${user}`); // with altgr+7 you can add variables to it
  
    alert("Successfuly deleted. Please click on the refresh button.")
    //kell frissítés, hogy eltünjön a törölt, submitos nem működik
  };
  //
  const users = (user) =>{
    Axios.patch(`http://localhost:3000/users/${user}`); // with altgr+7 you can add variables to it
  
  };
  
  //PUT - USERS
  const updateUserEmail = (user) =>{
    Axios.put('http://localhost:3001/api/update/users', {
      userUn: user,
      userEmail: NewUserEmail,
      userUpdatedAt: date
    });
    setNewUserEmail("");
    alert("Successfuly changed! Please click on the refresh button.");
  };

  return(
            <div >
                    <ReactBootStrap.Table> 
                        <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>First name</th>
                                    <th>Second name</th>
                                    <th>Date of birth</th>
                                    <th>Email</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                </tr>
                          </thead>
                         
                  {UsersNameList.map((val) => {
                   
                      return(
                              
                          <tbody>
                            <tr>
                              <td>{val.UserUn}</td>    
                              <td>{val.UserPw}</td>  
                              <td>{val.UserFN}</td>  
                              <td>{val.UserSN}</td>  
                              <td>{val.UserDob}</td>  
                              <td>{val.UserEmail}</td>  
                              <td>{val.UserCreatedAt}</td>  
                              <td>{val.UserUpdatedAt}</td> 
                            
                           <td>
                          

                          <button onClick={() => {users(val.UserUn)}}>Settings</button>
                          <button onClick={() => {deleteUser(val.UserUn)}}>Delete User</button>
                          
                          
                          </td>
                          </tr> 
                          </tbody>
                         
                      
                      )
                  })}
               </ReactBootStrap.Table>    
          
        </div>
  );
}