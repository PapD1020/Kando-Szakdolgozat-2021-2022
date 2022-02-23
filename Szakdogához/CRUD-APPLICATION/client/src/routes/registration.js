import React, {useState} from "react";
import '../App.css';

export default function Registration(){

    const [UsernameReg, setUsernameReg] = useState('');
    const [UserPwReg, setUserPwReg] = useState('');
    const [UserFNReg, setUserFNReg] = useState('');
    const [UserSNReg, setUserSNReg] = useState('');
    const [UserDOBReg, setUserDOBReg] = useState('');
    const [UserEmailReg, setUserEmailReg] = useState('');

    return(
        <div className="smallContainer">
          <div className='form'>
            <h3>Registration</h3>
                <label>UserUn</label>
                <input type="text" name="userUn"></input>

                <label>UserPw</label>
                <input type="password" name="userPw"></input>

                <label>UserFN</label>
                <input type="text" name="userFN"></input>

                <label>UserSN</label>
                <input type="text" name="userSN"></input>

                <label>UserDOB</label>
                <input type="date" name="userDob"></input>

                <label>UserEmail</label>
                <input type="email" name="userEmail"></input>

                <button>Register</button>
            </div>
        </div>
    );
}