 import React, {useState, useEffect} from "react";
 import '../App.css';
import Axios from 'axios';
 import {Outlet, Link} from 'react-router-dom';
 import '../css/userlist.css';
 import * as ReactBootStrap from "react-bootstrap";
 import { Button,Modal } from "react-bootstrap";

 export default function UsersList(){
 
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);

  const [UserUn, setUserUn] = useState('');
  const [UserPw, setUserPw] = useState('');
   const [UserFN, setUserFN] = useState('');
   const [UserSN, setUserSN] = useState('');
   const [UserDob, setUserDob] = useState('');
   const [UserPL, setUserPL] = useState('');
   
 const [UserEmail, setUserEmail] = useState('');
  

    const [UsersNameList, setUsersNameList] = useState([]);

    const [NewUserEmail, setNewUserEmail] = useState('');
     const [UsersNameSettings, setUsersNameSettings] = useState([]);
    const current = new Date();
     const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    //On page load get users
   useEffect(() => {

  Axios.get('http://localhost:3001/api/get/users').then((response) => {
     setUsersNameList(response.data);
    });
    }, []);


     const UserSetting = (userId) =>{
       setShow(true);
    Axios.get(`http://localhost:3001/api/get/users/${userId}`).then((response) => {
  
     setUsersNameSettings(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
     })};
     
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

   const users = (user) =>{
    Axios.patch(`http://localhost:3000/users/${user}`); // with altgr+7 you can add variables to it
  
   };
  
  //PUT - USERS
  const updateUser = (userid) =>{
     Axios.put('http://localhost:3001/api/update/users', {
      userId: userid,
      userUn: UserUn,
      userPw: UserPw,
      userFN: UserFN,
      userSN: UserSN,
      userDob: UserDob,
      userPL: UserPL,
      userEmail: UserEmail,
      userUpdatedAt: date
    });
    setUserEmail("");
    alert("Successfuly changed! Please click on the refresh button.");
    setShow(false);
   };

   return(
   <div >
     <Modal show={show} onHide={handleClose} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>User Settings</Modal.Title>
    </Modal.Header>
    <Modal.Body>
          {UsersNameSettings.map((val) => {
                      return(
                        <div >
                          
                           <p>Username:<input type="text" name="userUn" placeholder={val.UserUn} onChangeCapture={(e) => {
                                 setUserUn(e.target.value); }}></input> </p>

                           <p>Password:<input type="password" name="userPw" placeholder={val.UserPw} onChangeCapture={(e) => {
                                 setUserPw(e.target.value); }}></input></p>
                         
                          <p>First name: <input type="text" name="userFN" placeholder={val.UserFN} onChangeCapture={(e) => {
                            setUserFN(e.target.value)}}></input></p>
                          
                          <p>Second name: <input type="text" name="userSN" placeholder={val.UserSN} onChangeCapture={(e) => { 
                             setUserSN(e.target.value) }}></input> </p>

                          <p>Date of birth:  <input type="date" name="userDob" placeholder={val.UserDob} onChangeCapture={(e) => {
                            setUserDob(e.target.value)}}></input></p>
                          <p>Permisson Level:  <input type="date" name="UserPL" placeholder={val.UserPL} onChangeCapture={(e) => {
                            setUserPL(e.target.value)}}></input></p>
                          <p>Email: <input type="email" name="userEmail" placeholder={val.UserEmail} onChangeCapture={(e) => {
                           setUserEmail(e.target.value); }}></input></p>
                           <p>created at: {val.UserCreatedAt}</p>
                          <p>updated at: {val.UserUpdatedAt}</p>

                          
                           <Button onClick={() => {updateUser(val.UserId)}}>Update User</Button>
                           
                          
                         </div>
                       )
                  })}
            </Modal.Body>
   
           </Modal>
             <Button className="btn" onClick={refreshUserData}>Refresh User data</Button>
                    <ReactBootStrap.Table> 
                         <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>First name</th>
                                     <th>Second name</th>
                                    <th>Date of birth</th>
                                    <th>Permisson</th>
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
                              <td>{val.UserPL}</td>  
                             <td>{val.UserEmail}</td>  
                            <td>{val.UserCreatedAt}</td>  
                               <td>{val.UserUpdatedAt}</td> 
                           
                           <td>
                          

                          <Button onClick={() => {UserSetting(val.UserId)}}>Settings</Button>
                          <Button onClick={() => {deleteUser(val.UserUn)}}>Delete User</Button>
                          
                          
                          </td>
                          </tr> 
                          </tbody>
                         
                      
                       )
                   })}
               </ReactBootStrap.Table>    
          
      </div>
   );
 } 