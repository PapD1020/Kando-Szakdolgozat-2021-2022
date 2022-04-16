import React, {useEffect, useState, useRef} from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import Axios from 'axios';
import { Overlay, Tooltip } from 'react-bootstrap';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {useNavigate} from "react-router-dom";

export default function Login(){

    const [UserUnLogin, setUserUnLogin] = useState('');
    const [UserPwLogin, setUserPwLogin] = useState('');

    const [LoginStatus, setLoginStatus] = useState(false);

    const [ErrorMessage, setErrorMessage] = useState('');

    const GotUserId = useRef('');

    Axios.defaults.withCredentials = true;

    const{
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const onSubmit = () => {
        submitUserDataLogin();
        //routeChange();
    };

    const submitUserDataLogin = () => {
  
        Axios.post('http://localhost:3001/api/login/user', { 
        userUn: UserUnLogin, userPw: UserPwLogin
        }).then((response) => {

            if(!response.data.auth){ 
                setErrorMessage(response.data.message);
                setLoginStatus(false);
                console.log("Login user response.data: " + JSON.stringify(response.data));
            }
            else{
                localStorage.setItem("token", response.data.token);
                setLoginStatus(true);
            }
        });
    };

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

    const [show, setShow] = useState(false);
    const target = useRef(null);

    let navigate = useNavigate();
    const routeChange = () =>{
      navigate('/articles');
    }
    
    return(
        
        <div className="ms-3">
            <div className="col-md-auto">
                <h1 className="display-1 m-3">Login</h1>
            </div>

            {!LoginStatus && (
                <div className="container">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="form-group">
                                    <label className="display-5 mb-3">Username:</label>
                                    <input className="form-control p-2 mb-3" type="text" {
                                        ...register("userName", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 30,
                                            //pattern: /^([A-ZÁÉÚŐÓÜÖÍ]([a-záéúőóüöí.]+\s?)){2,}$/
                                        })
                                    } onChange={(e) =>{
                                        setUserUnLogin(e.target.value);
                                    }} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="errordiv text-danger mb-2">
                                    {errors?.userName?.type === "required" && <div className=""><h5>This field is required!</h5><p>Your must enter your user name.</p></div>}
                                    {errors?.userName?.type === "minLength" && <div className=""><h5>Your user name is too short.</h5><p>Your user name length must be between 3 and 30 characters.</p></div>}
                                    {errors?.userName?.type === "maxLength" && <div className=""><h5>Your user name is too long.</h5><p>Your user name length must be between 3 and 30 characters.</p></div>}
                                    {errors?.userName?.type === "pattern" && <div className=""><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="form-group">
                                    <label className="display-5 mb-3 mt-3">Password: </label>
                                    <input type="password" className="mb-3 p-2 form-control"{
                                        ...register("userPw", {
                                            required: true,
                                            minLength: 8,
                                            maxLength: 16
                                        })
                                    } onChange={(e) => {
                                        setUserPwLogin(e.target.value);
                                    }}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="errordiv text-danger mb-2">
                                    {errors?.userPw?.type === "required" && <div><h5>This field is required!</h5><p>Your must enter your password.</p></div>}
                                    {errors?.userPw?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                    {errors?.userPw?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-sm-auto">
                                <input className="btn btn-outline-primary" type="submit" value={"Login"}/>
                            </div>
                            <div className="col-sm-auto">
                                <div className="fit p-2" ref={target} onClick={() => setShow(!show)}>
                                    Help <AiOutlineQuestionCircle/>
                                </div>

                                <Overlay target={target.current} show={show} placement="bottom">
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