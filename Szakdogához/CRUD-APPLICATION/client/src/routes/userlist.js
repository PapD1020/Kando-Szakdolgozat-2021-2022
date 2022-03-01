import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

import '../css/userlist.css';

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
  
  //POST - USERS
  const submitUserData = () => {
  
    
    
  
  setUsersNameList([
      ...UsersNameList,
      {
        UserUn: UserUn,
        UserPw: UserPw,
        UserFN: UserFN,
        UserSN: UserSN,
        UserDob: UserDob,
        UserEmail: UserEmail,
        UserCreatedAt: date,
        UserUpdatedAt: date
      }, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem postName: PostName
    ]);
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
    <div className="lista">
          <div className='form'>
            <h3>USERSList</h3>

                
                  {UsersNameList.map((val) => {
                      return(
                        
 
                        <div className="table">
                          
                          <h1>User username: {val.UserUn}</h1>
                          <p>User password: {val.UserPw}</p>
                          <h2>User first name: {val.UserFN}</h2>
                          <p>User second name: {val.UserSN}</p>
                          <p>User date of birth: {val.UserDob}</p>
                          <p>User email: {val.UserEmail}</p>
                          <p>User created at: {val.UserCreatedAt}</p>
                          <p>User updated at: {val.UserUpdatedAt}</p>

                          <button onClick={() => {deleteUser(val.UserUn)}}>Delete User</button>

                          <input type="text" className="updateInput" onChange={(e) => {
                            setNewUserEmail(e.target.value);
                          }}></input>

                          <button onClick={() => {updateUserEmail(val.UserUn)}}>Update User</button>
                        </div>
                      )
                  })}
                
          </div>
        </div>
  );
}