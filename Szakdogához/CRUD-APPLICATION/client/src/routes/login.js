import React, {useState} from "react";
import '../App.css';
import Axios from 'axios';

export default function Login(){

    const [UserUnLogin, setUserUnLogin] = useState('');
    const [UserPwLogin, setUserPwLogin] = useState('');

    return(
        <div className="smallContainer">
          <div className='form'>
            <h3>Login</h3>
                <label>UserUn</label>
                <input type="text" name="userUn" onChange={(e) => {
                    setUserUnLogin(e.target.value);
                }}></input>

                <label>UserPw</label>
                <input type="password" name="userPw" onChange={(e) => {
                    setUserPwLogin(e.target.value);
                }}></input>

                <button>Login</button>
            </div>
        </div>
    );
}