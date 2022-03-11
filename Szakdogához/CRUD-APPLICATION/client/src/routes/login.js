import React, {useState} from "react";
import '../App.css';
import Axios from 'axios';

export default function Login(){

    const [UserUnLogin, setUserUnLogin] = useState('');
    const [UserPwLogin, setUserPwLogin] = useState('');

    const [LoginStatus, setLoginStatus] = useState('');

    const submitUserDataLogin = () => {
  
        //postName - backend variable name
        Axios.post('http://localhost:3001/api/login/user', { //URL for our api (node.js backend)
        //userUn must be the same as in back-end index.js req.body.userUn !!!
        userUn: UserUnLogin, userPw: UserPwLogin
        }).then((response) => {

            if(response.data.message){
                setLoginStatus(response.data.message);
                console.log("Login user response.data: " + JSON.stringify(response.data));
            }
            else{
                setLoginStatus("Successfully logged in as: " + response.data[0].UserUn); //it will be an array
                alert("Successfully logged in as: " + response.data[0].UserUn);
            }
        });
    };

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

                <button className="btn" onClick={submitUserDataLogin}>Login</button>
            </div>

            <h1>{LoginStatus}</h1>
        </div>
    );
}