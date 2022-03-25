 import React, {useState, useEffect} from "react";
 import '../App.css';
import Axios from 'axios';
 import * as ReactBootStrap from "react-bootstrap";
 import { Button,Modal } from "react-bootstrap";

 export default function UsersList(){
 
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);

  
   
  var UserUn ='';
  var UserPw ='';
  var UserPP ='';

  var UserFN ='';
  var UserSN ='';
  var UserDob ='';
  var UserPL ='';
  var UserEmail='';

  

    const [UsersNameList, setUsersNameList] = useState([]);

    const [NewUserEmail, setNewUserEmail] = useState('');
     const [UsersNameSettings, setUsersNameSettings] = useState([]);
    const current = new Date();
     const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    //On page load get users
   useEffect(() => {

  Axios.get('http://localhost:3001/api/get/user').then((response) => {
     setUsersNameList(response.data);
    });
    }, []);


     const UserSetting = (userId) =>{
       setShow(true);
    Axios.get(`http://localhost:3001/api/get/user/${userId}`).then((response) => {
  
     setUsersNameSettings(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
     })};
     
    //GET - USERS
    const refreshUserData = () => {
      Axios.get('http://localhost:3001/api/get/user').then((response) => {
      setUsersNameList(response.data);
    });
   };
  
  
  
   //DELETE - USERS
  const deleteUser = (user) =>{
    Axios.delete(`http://localhost:3001/api/delete/user/${user}`); // with altgr+7 you can add variables to it
  
   alert("Successfuly deleted. Please click on the refresh button.")
    //kell frissítés, hogy eltünjön a törölt, submitos nem működik
  };

   const users = (user) =>{
    Axios.patch(`http://localhost:3000/users/${user}`); // with altgr+7 you can add variables to it
  
   };
  
  //PUT - USERS
  const updateUser = (userid) =>{
     Axios.put('http://localhost:3001/api/update/user', {
      userId: userid,
      userUn: UserUn,
      userPP: UserPP,
      userPw: UserPw,
      userFN: UserFN,
      userSN: UserSN,
      userDob: UserDob,
      userPL: UserPL,
      userEmail: UserEmail,
      userUpdatedAt: date
    });
  
    alert("Successfuly changed! Please click on the refresh button.");
    setShow(false);
    refreshUserData();
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
                          
                           <p>Username:<input type="text" name="userUn" defaultValue={val.UserUn} 
                           onBlur={(e) => {UserUn=e.target.value }}></input> </p>

                           <p>Password:<input type="password" name="userPw" defaultValue={val.UserPw}
                            onBlur={(e) => {UserPw=e.target.value }}></input></p>
                         
                          <p>First name: <input type="text" name="userFN" defaultValue={val.UserFN} 
                          onBlur={(e) => {UserFN=e.target.value}}></input></p>
                          
                          <p>Second name: <input type="text" name="userSN" defaultValue={val.UserSN} 
                          onBlur={(e) => {UserSN=e.target.value}}></input> </p>

                          <p>Date of birth:  <input type="date" name="userDob" defaultValue={val.UserDob} 
                          onBlur={(e) => {UserDob=e.target.value}}></input></p>

                          <p>Image:  <input type="text" name="userPP" defaultValue={val.UserPP} 
                          onBlur={(e) => {UserPP=e.target.value}}></input></p>

                          <p>Permisson Level:  <input type="number" name="UserPL" defaultValue={val.UserPL} 
                          onBlur={(e) => {UserPL=e.target.value}}></input></p>

                          <p>Email: <input type="email" name="userEmail" defaultValue={val.UserEmail} 
                          onBlur={(e) => {UserEmail=e.target.value}}></input></p>
                           <p>created at: {val.UserCreatedAt}</p>
                          <p>updated at: {val.UserUpdatedAt}</p>

                          
                           <Button onClick={() => {
                             if ( UserUn === "" ) { UserUn = val.UserUn }
                             if ( UserPw=== "" ) { UserPw = val.UserPw }
                             if ( UserFN === "" ) { UserFN = val.UserFN }
                             if ( UserSN === "" ) { UserSN = val.UserSN }
                             if ( UserDob === "" ) { UserDob= val.UserDob}
                             if ( UserPL === "" ) { UserPL = val.UserPL}
                             if ( UserPP === "" ) { UserPP = val.UserPP}
                             if ( UserEmail === "" ) { UserEmail = val.UserEmail}
                             
                             updateUser(val.UserId)
                             
                             
                             }}>Update User</Button>
                           
                          
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
                                    <th>Image</th>
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
                              <td >{val.UserPw}</td>  
                               <td>{val.UserFN}</td>  
                            <td>{val.UserSN}</td>  
                              <td>{val.UserDob}</td>  
                              <td>{val.UserPL}</td>  
                               <td><img src={val.UserPP} style={{ width: "80%" }} alt={val.UserPP} /></td>
                             <td>{val.UserEmail}</td>  
                            <td>{val.UserCreatedAt}</td>  
                               <td>{val.UserUpdatedAt}</td> 
                           
                           <td>
                          

                           <td><Button onClick={() => {UserSetting(val.UserId)}}>Settings</Button></td>
                           <td><Button onClick={() => {deleteUser(val.UserUn)}}>Delete User</Button></td>
                          
                          
                          </td>
                          </tr> 
                          </tbody>
                         
                      
                       )
                   })}
               </ReactBootStrap.Table>    
          
      </div>
   );
 } 