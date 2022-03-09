import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

export default function Users(){
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
  
    //postName - backend variable name
    Axios.post('http://localhost:3001/api/insert/users', { //URL for our api (node.js backend)
    userUn: UserUn,
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
    <div >
          <div className='form'>

                <div className="cardContainer">
                  {UsersNameList.map((val) => {
                      return(
                        <div className="card">
                          
                          <p>Username:<input type="text" name="userUn" value={val.UserUn} onChange={(e) => {
                                setUserUn(e.target.value); }}></input> </p>

                          <p>Password:<input type="password" name="userPw" value={val.UserPw} onChange={(e) => {
                                setUserUn(e.target.value); }}></input></p>
                         
                          <p>First name: <input type="text" name="userFN" value={val.UserFN} onChange={(e) => {
                            setUserFN(e.target.value)}}></input></p>
                          
                          <p>second name: <input type="text" name="userSN" value={val.UserSN} onChange={(e) => { 
                            setUserSN(e.target.value) }}></input> </p>

                          <p>Date of birth:  <input type="date" name="userDob" value={val.UserDob} onChange={(e) => {
                            setUserDob(e.target.value)}}></input></p>
                          <p>Email: <input type="email" name="userEmail" value={val.UserEmail} onChange={(e) => {
                            setUserEmail(e.target.value); }}></input></p>
                          <p>created at: {val.UserCreatedAt}</p>
                          <p>updated at: {val.UserUpdatedAt}</p>

                          <button onClick={() => {deleteUser(val.UserUn)}}>Delete User</button>
                          <button onClick={() => {updateUserEmail(val.UserUn)}}>Update User</button>
                          
                          <button onClick={() => {refreshUserData(val.UserUn)}}>Refresh User data</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>
  );
}