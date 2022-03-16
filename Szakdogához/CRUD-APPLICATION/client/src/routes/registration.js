import React, {useState} from "react";
import '../App.css';
import Axios from 'axios';

export default function Registration(){

    const [UserUnReg, setUserUnReg] = useState('');
    const [UserPP, setUserPP] = useState('');
    const [UserPwReg, setUserPwReg] = useState('');
    const [UserFNReg, setUserFNReg] = useState('');
    const [UserSNReg, setUserSNReg] = useState('');
    const [UserDobReg, setUserDobReg] = useState('');
    const [UserEmailReg, setUserEmailReg] = useState('');

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    Axios.defaults.withCredentials = true;

    //POST - USERS
    const submitUserDataReg = () => {
  
    //postName - backend variable name
        Axios.post('http://localhost:3001/api/register/user', { //URL for our api (node.js backend)
        //userUn must be the same as in back-end index.js req.body.userUn !!!
        userUn: UserUnReg,
        userPP: UserPP,
        userPw: UserPwReg,
        userFN: UserFNReg,
        userSN: UserSNReg,
        userDob: UserDobReg,
        userEmail: UserEmailReg,
        userCreatedAt: date,
        userUpdatedAt: date
        }).then((response) => 
            console.log("Register user response: " + JSON.stringify(response))
        );

        alert("Successfully registered as: " + UserUnReg);
    };

    return(
        <div className="smallContainer">
          <div className='form'>
            <h3>Registration</h3>
                <label>UserUn</label>
                <input type="text" name="userUnReg" onChange={(e) => {
                    setUserUnReg(e.target.value);
                }}></input>

                <label>UserPP</label>
                <input type="text" name="userUnReg" onChange={(e) => {
                    setUserPP(e.target.value);
                }}></input>

                <label>UserPw</label>
                <input type="password" name="userPwReg" onChange={(e) => {
                    setUserPwReg(e.target.value);
                }}></input>

                <label>UserFN</label>
                <input type="text" name="userFNReg" onChange={(e) => {
                    setUserFNReg(e.target.value);
                }}></input>

                <label>UserSN</label>
                <input type="text" name="userSNReg" onChange={(e) => {
                    setUserSNReg(e.target.value);
                }}></input>

                <label>UserDOB</label>
                <input type="date" name="userDobReg" onChange={(e) => {
                    setUserDobReg(e.target.value);
                }}></input>

                <label>UserEmail</label>
                <input type="email" name="userEmailReg" onChange={(e) => {
                    setUserEmailReg(e.target.value);
                }}></input>

                <button className="btn" onClick={submitUserDataReg}>Register</button>
            </div>
        </div>
    );
}
