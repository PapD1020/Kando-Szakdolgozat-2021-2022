import React, {useState} from "react";
import '../App.css';

export default function Login(){

    return(
        <div className="smallContainer">
          <div className='form'>
            <h3>Login</h3>
                <label>UserUn</label>
                <input type="text" name="userUn"></input>

                <label>UserPw</label>
                <input type="password" name="userPw"></input>

                <button>Login</button>
            </div>
        </div>
    );
}