import React, {useState, useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import Axios from 'axios';
import { Overlay, Tooltip } from 'react-bootstrap';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {useNavigate} from "react-router-dom";

export default function Registration(){

    const [UserUnReg, setUserUnReg] = useState('');
    const [UserPPReg, setUserPPReg] = useState('');
    const [UserPwReg, setUserPwReg] = useState('');
    const [UserFNReg, setUserFNReg] = useState('');
    const [UserSNReg, setUserSNReg] = useState('');
    const [UserDobReg, setUserDobReg] = useState('');
    const [UserEmailReg, setUserEmailReg] = useState('');

    const [ErrorMessage, setErrorMessage] = useState('');

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
            console.log("Register user response: " + JSON.stringify(response)),
            alert("Successfully registered as: " + UserUnReg),
            routeChange()
        );
    };

    const [show, setShow] = useState(false);
    const target = useRef(null);

    let navigate = useNavigate();
    const routeChange = () =>{
      navigate('/login');
    }

    return(
        
        <div className="ms-3">
            <div className="col-lg-auto">
                <h1 className="display-1 m-3">Registration</h1>
            </div>

            {!LoginStatus && (
                <div className="container">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-5 mb-3">Username:</label>
                                    <input className="form-control p-2 mb-3" type="text" {
                                        ...register("userUnReg", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 30,
                                            //pattern: /^([A-ZÁÉÚŐÓÜÖÍ]([a-záéúőóüöí.]+\s?)){2,}$/
                                        })
                                    } onChange={(e) =>{
                                        setUserUnReg(e.target.value);
                                    }} />
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors?.userUnReg?.type === "required" && <div><h5>This field is required!</h5><p>Your must have a user name.</p></div>}
                                    {errors?.userUnReg?.type === "minLength" && <div><h5>Your user name is too short.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                    {errors?.userUnReg?.type === "maxLength" && <div><h5>Your user name is too long.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                    {errors?.userUnReg?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                </div>
                            </div>
                            
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-5 mb-3">Password:</label>
                                    <input className="form-control p-2 mb-3" type="password" {
                                        ...register("userPwReg", {
                                            required: true,
                                            minLength: 8,
                                            maxLength: 16
                                        })
                                    } onChange={(e) =>{
                                        setUserPwReg(e.target.value);
                                    }} />
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors?.userPwReg?.type === "required" && <div><h5>This field is required!</h5><p>Your must have a password</p></div>}
                                    {errors?.userPwReg?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                    {errors?.userPwReg?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-5 mt-3">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Profile picture:</label>
                                    <input className="form-control p-2 mb-3" type="URL" {
                                        ...register("userPPReg", {
                                            minLength: 8,
                                            maxLength: 100,
                                        })
                                    } onChange={(e) =>{
                                        setUserPPReg(e.target.value);
                                    }} />
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors?.userPPReg?.type === "minLength" && <div><h5>The URL is too short.</h5><p>Your URL length must be between 8 and 100 characters.</p></div>}
                                    {errors?.userPPReg?.type === "maxLength" && <div><h5>The URL is too long.</h5><p>Your URL length must be between 8 and 100 characters.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-5 mt-3">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Email:</label>
                                    <input className="form-control p-2 mb-3" type="email" {
                                        ...register("userEmailReg", {
                                            required: true,
                                            maxLength: 40,
                                        })
                                    } onChange={(e) =>{
                                        setUserEmailReg(e.target.value);
                                    }} />
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors?.userEmailReg?.type === "required" && <div><h5>This field is required!</h5></div>}
                                    {errors?.userEmailReg?.type === "maxLength" && <div><h5>Your email's length is too long.</h5><p>Your email must not exceed 40 characters.</p></div>}
                                </div>
                            </div>
                            
                        </div>

                        <div className="row">
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="display-6 mb-3">First name:</label>
                                    <input type="text" className="mb-3 p-2 form-control"{
                                        ...register("userFNReg", {
                                            required: true, //kötelező legyen?
                                            minLength: 3, //Mennyi legyen?
                                            maxLength: 20, //Mennyi legyen?
                                        })
                                    } onChange={(e) => {
                                        setUserFNReg(e.target.value);
                                    }}/>
                                </div>

                                <div className="errordiv text-danger mb-4">
                                    {errors?.userFNReg?.type === "required" && <div><h5>This field is required!</h5></div>}
                                    {errors?.userFNReg?.type === "minLength" && <div><h5>Your first name is too short.</h5><p>Your first name length must be between 3 and 20 characters.</p></div>}
                                    {errors?.userFNReg?.type === "maxLength" && <div><h5>Your first name is too long.</h5><p>Your first name length must be between 3 and 20 characters.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Second name:</label>
                                    <input type="text" className="mb-3 p-2 form-control"{
                                        ...register("userSNReg", {
                                            required: true, //kötelező legyen?
                                            minLength: 3, //Mennyi legyen?
                                            maxLength: 20, //Mennyi legyen?
                                        })
                                    } onChange={(e) => {
                                        setUserSNReg(e.target.value);
                                    }}/>
                                </div>

                                <div className="errordiv text-danger mb-4">
                                    {errors?.userSNReg?.type === "required" && <div><h5>This field is required!</h5></div>}
                                    {errors?.userSNReg?.type === "minLength" && <div><h5>Your second name is too short.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                    {errors?.userSNReg?.type === "maxLength" && <div><h5>Your second name is too long.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Date of birth:</label>
                                    <input type="date" className="mb-3 p-2 form-control"{
                                        ...register("userDobReg", {
                                            required: true, //kötelező legyen?
                                        })
                                    } onChange={(e) => {
                                        setUserDobReg(e.target.value);
                                    }}/>
                                </div>

                                <div className="errordiv text-danger mb-4">
                                    {errors?.userDobReg?.type === "required" && <div><h5>This field is required!</h5></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-sm-auto">
                                <input className="btn btn-outline-primary" type="submit" value={"Register"}/>
                            </div>
                            <div className="col-sm-auto">
                                <div className="fit p-2" ref={target} onClick={() => setShow(!show)}>
                                    Help <AiOutlineQuestionCircle/>
                                </div>

                                <Overlay target={target.current} show={show} placement="right">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            <span>Your user name length must be between 3 and 30 characters.<br></br>
                                            Your password length must be between 8 and 16 characters.</span>
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                               <div className="text-danger">
                                {ErrorMessage && (
                                    <p>{ErrorMessage}</p>
                                )}
                               </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
