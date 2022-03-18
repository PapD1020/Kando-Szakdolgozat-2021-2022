import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import Axios from 'axios';

export default function Registration(){

    const [UserUnReg, setUserUnReg] = useState('');
    const [UserPPReg, setUserPPReg] = useState('');
    const [UserPwReg, setUserPwReg] = useState('');
    const [UserFNReg, setUserFNReg] = useState('');
    const [UserSNReg, setUserSNReg] = useState('');
    const [UserDobReg, setUserDobReg] = useState('');
    const [UserEmailReg, setUserEmailReg] = useState('');

    const [LoginStatus, setLoginStatus] = useState('');

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        submitUserDataReg();
    };

    Axios.defaults.withCredentials = true;

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
    const submitUserDataReg = () => {
  
    //postName - backend variable name
        Axios.post('http://localhost:3001/api/register/user', { //URL for our api (node.js backend)
        //userUn must be the same as in back-end index.js req.body.userUn !!!
        userUn: UserUnReg,
        userPP: UserPPReg,
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
<div>

<form onSubmit={handleSubmit(onSubmit)}>

    <div className="form-group">
        <label>User name:</label>
        <input type="text" className="form-control" {
            ...register("userUnReg", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
            })
        }onChange={(e) => {
            setUserUnReg(e.target.value);
        }}/>
        
        {errors?.userUnReg?.type === "required" && <div><h5>This field is required!</h5><p>Your must have a user name.</p></div>}
        {errors?.userUnReg?.type === "minLength" && <div><h5>Your user name is too short.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
        {errors?.userUnReg?.type === "maxLength" && <div><h5>Your user name is too long.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
        {errors?.userUnReg?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
    </div>
    
    <div className="form-group">
        <label>User profile picture:</label>
        <input type="url" className="form-control" {
            ...register("userPPReg", {
                minLength: 8,
                maxLength: 100,
            })
        }onChange={(e) => {
            setUserPPReg(e.target.value);
        }}/>

        {errors?.userPPReg?.type === "minLength" && <div><h5>The URL is too short.</h5><p>Your URL length must be between 8 and 100 characters.</p></div>}
        {errors?.userPPReg?.type === "maxLength" && <div><h5>The URL is too long.</h5><p>Your URL length must be between 8 and 100 characters.</p></div>}
    </div>

    <div className="form-group">
        <label>User password: </label>
        <input type="password" className="form-control" {
            ...register("userPwReg", {
                required: true,
                minLength: 8,
                maxLength: 16,
            })
        }onChange={(e) => {
            setUserPwReg(e.target.value);
        }}/>

        {errors?.userPwReg?.type === "required" && <div><h5>This field is required!</h5><p>Your must have a password</p></div>}
        {errors?.userPwReg?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
        {errors?.userPwReg?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
    </div>

    <div className="form-group">
        <label>User first name:</label>
        <input type="text" className="form-control" {
            ...register("userFNReg", {
                required: true, //kötelező legyen?
                minLength: 3, //Mennyi legyen?
                maxLength: 20, //Mennyi legyen?
            })
        }onChange={(e) => {
            setUserFNReg(e.target.value);
        }}/>

        {errors?.userFNReg?.type === "required" && <div><h5>This field is required!</h5></div>}
        {errors?.userFNReg?.type === "minLength" && <div><h5>Your first name is too short.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
        {errors?.userFNReg?.type === "maxLength" && <div><h5>Your first name is too long.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
    </div>

    <div className="form-group">
        <label>User second name:</label>
        <input type="text" className="form-control" {
            ...register("userSNReg", {
                required: true, //kötelező legyen?
                minLength: 3, //Mennyi legyen?
                maxLength: 20, //Mennyi legyen?
            })
        }onChange={(e) => {
            setUserSNReg(e.target.value);
        }}/>

        {errors?.userSNReg?.type === "required" && <div><h5>This field is required!</h5></div>}
        {errors?.userSNReg?.type === "minLength" && <div><h5>Your second name is too short.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
        {errors?.userSNReg?.type === "maxLength" && <div><h5>Your second name is too long.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
    </div>

    <div className="form-group">
        <label>User date of birth: </label>
        <input type="date" className="form-control" {
            ...register("userDobReg", {
                required: true, //kötelező legyen?
            })
        }onChange={(e) => {
            setUserDobReg(e.target.value);
        }}/>

        {errors?.userDobReg?.type === "required" && <div><h5>This field is required!</h5></div>}
    </div>

    <div className="form-group">
        <label>User email: </label>
        <input type="email" className="form-control" {
            ...register("userEmailReg", {
                required: true, //kötelező legyen?
                //vmi must contain @ ellenőrzés stb
            })
        }onChange={(e) => {
            setUserEmailReg(e.target.value);
        }}/>

        {errors?.userEmailReg?.type === "required" && <div><h5>This field is required!</h5></div>}
    </div>

    <input type="submit" /> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
</form>

<h1>{LoginStatus}</h1>
</div>
);  
}
