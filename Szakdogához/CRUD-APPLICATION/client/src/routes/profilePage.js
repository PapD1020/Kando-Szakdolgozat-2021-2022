import React, {useEffect, useState} from "react";
import '../App.css';
import Axios from 'axios';

export default function ProfileUpdate(){

    //Id vigygálata, átadása
    //Validációja a beviteli mezőknek

    const [UserUnUpd, setUserUnUpd] = useState('');
    const [UserPPUpd, setUserPPUpd] = useState('');
    const [UserPwUpd, setUserPwUpd] = useState('');
    const [UserFNUpd, setUserFNUpd] = useState('');
    const [UserSNUpd, setUserSNUpd] = useState('');
    const [UserEmailUpd, setUserEmailUpd] = useState('');
    const [LoginStatus, setLoginStatus] = useState('');

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    Axios.defaults.withCredentials = true;

    //check every time we refresh the page if a user is logged in
    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
            //ellenőrzésre
            //console.log("Are we logged in: " + JSON.stringify(response));
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0].UserUn);
            }
        });
    }, []);

    //POST - USERS
    const submitUserDataUpd = (userId) => {
  
    //postName - backend variable name
        Axios.put(`http://localhost:3001/api/update/user/${userId}`, { //URL for our api (node.js backend)
        //userUn must be the same as in back-end index.js req.body.userUn !!!
        userUn: UserUnUpd,
        userPP: UserPPUpd,
        userPw: UserPwUpd,
        userFN: UserFNUpd,
        userSN: UserSNUpd,
        userEmail: UserEmailUpd,
        userCreatedAt: date,
        userUpdatedAt: date
        }).then((response) => 
            console.log("Update user response: " + JSON.stringify(response))
        );

        alert("Successfully updated as: ");
    };

    return(
        <div className="smallContainer">
          <div className='form'>
            <h3>Profile data</h3>
            <h2>Logged in as: {LoginStatus}</h2>
                <label>UserUn</label>
                <input type="text" name="userUnUpd" onChange={(e) => {
                    setUserUnUpd(e.target.value);
                }}></input>

                <label>UserPP</label>
                <input type="text" name="userUnUpd" onChange={(e) => {
                    setUserPPUpd(e.target.value);
                }}></input>

                <label>UserPw</label>
                <input type="password" name="userPwUpd" onChange={(e) => {
                    setUserPwUpd(e.target.value);
                }}></input>

                <label>UserFN</label>
                <input type="text" name="userFNUpd" onChange={(e) => {
                    setUserFNUpd(e.target.value);
                }}></input>

                <label>UserSN</label>
                <input type="text" name="userSNUpd" onChange={(e) => {
                    setUserSNUpd(e.target.value);
                }}></input>

                <label>UserEmail</label>
                <input type="email" name="userEmailUpd" onChange={(e) => {
                    setUserEmailUpd(e.target.value);
                }}></input>

                <button className="btn" onClick={submitUserDataUpd}>Update</button>
            </div>
        </div>
    );
}