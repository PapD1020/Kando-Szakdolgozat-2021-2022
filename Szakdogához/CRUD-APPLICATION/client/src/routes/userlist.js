import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

import '../css/userlist.css';
import { Row, Table } from "react-bootstrap";

export default function UsersList(){
    const [UserUn, setUserUn] = useState('');
    const [UserPw, setUserPw] = useState('');
    const [UserFN, setUserFN] = useState('');
    const [UserSN, setUserSN] = useState('');
    const [UserDob, setUserDob] = useState('');
    const [UserEmail, setUserEmail] = useState('');

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
    <div className="userList">
                        
                        <thead>
                                <tr>
                                    <th>User username</th>
                                    <th>User password</th>
                                    <th>User first name</th>
                                    <th>User second name</th>
                                    <th>User date of birth</th>
                                    <th>User email</th>
                                    <th>User created at</th>
                                    <th>User updated at</th>
                                </tr>
                          </thead>
                         
                  {UsersNameList.map((val) => {
                      return(

                            <Table responsive>
                           
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
                          <button onClick={() => {deleteUser(val.UserUn)}}>Delete User</button>

                          <input type="text" className="updateInput" onChange={(e) => {
                            setNewUserEmail(e.target.value);
                          }}></input>

                          <button onClick={() => {updateUserEmail(val.UserUn)}}>Update User</button>
                          </td>
                          </tr> 
                          </tbody>
                          </Table>
                      
                      )
                  })}
                
          
        </div>
  );
}