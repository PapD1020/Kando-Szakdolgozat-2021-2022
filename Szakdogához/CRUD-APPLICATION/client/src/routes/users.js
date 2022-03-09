import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

export default function Users(){
    const [UserUn, setUserUn] = useState('');
    const [UserPP, setUserPP] = useState('');
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

    Axios.get('http://localhost:3001/api/get/user').then((response) => {
  
      setUsersNameList(response.data);
    });
    }, []);

    //GET - USERS
    const refreshUserData = () => {
      Axios.get('http://localhost:3001/api/get/user').then((response) => {
  
      setUsersNameList(response.data);
    });
  };
  
  //POST - USERS
  const submitUserData = () => {
  
    //postName - backend variable name
    Axios.post('http://localhost:3001/api/insert/user', { //URL for our api (node.js backend)
    userUn: UserUn,
    userPP: UserPP,
    userPw: UserPw,
    userFN: UserFN,
    userSN: UserSN,
    userDob: UserDob,
    userEmail: UserEmail,
    userCreatedAt: date,
    userUpdatedAt: date
  });
    
  
  setUsersNameList([
      ...UsersNameList,
      {
        UserUn: UserUn,
        userPP: UserPP,
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
    Axios.delete(`http://localhost:3001/api/delete/user/${user}`); // with altgr+7 you can add variables to it
  
    alert("Successfuly deleted. Please click on the refresh button.")
    //kell frissítés, hogy eltünjön a törölt, submitos nem működik
  };
  
  //PUT - USERS
  const updateUserEmail = (user) =>{
    Axios.put('http://localhost:3001/api/update/user', {
      userUn: user,
      userEmail: NewUserEmail,
      userUpdatedAt: date
    });
    setNewUserEmail("");
    alert("Successfuly changed! Please click on the refresh button.");
  };

  return(
    <div className="smallContainer">
          <div className='form'>
            <h3>USERS</h3>
                <label>UserUn</label>
                <input type="text" name="userUn" onChange={(e) => {
                  setUserUn(e.target.value);
                }}></input>

                <label>UserPP</label>
                <input type="text" name="userPP" onChange={(e) => {
                  setUserPP(e.target.value);
                }}></input>

                <label>UserPw</label>
                <input type="password" name="userPw" onChange={(e) => {
                  setUserPw(e.target.value);
                }}></input>

                <label>UserFN</label>
                <input type="text" name="userFN" onChange={(e) => {
                  setUserFN(e.target.value);
                }}></input>

                <label>UserSN</label>
                <input type="text" name="userSN" onChange={(e) => {
                  setUserSN(e.target.value);
                }}></input>

                <label>UserDOB</label>
                <input type="date" name="userDob" onChange={(e) => {
                  setUserDob(e.target.value);
                }}></input>

                <label>UserEmail</label>
                <input type="email" name="userEmail" onChange={(e) => {
                  setUserEmail(e.target.value);
                }}></input>

                <button className="btn" onClick={submitUserData}>Add User</button>
                <button className="btn" onClick={refreshUserData}>Refresh User data</button>

                <div className="cardContainer">
                  {UsersNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>User username: {val.UserUn}</h1>
                          <p>User profile picture: {val.UserPP}</p>
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
        </div>
  );
}