import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import Axios from 'axios';

export default function Login(){

    const [UserUnLogin, setUserUnLogin] = useState('');
    const [UserPwLogin, setUserPwLogin] = useState('');

    const [LoginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

    const{
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const onSubmit = (data) => {
        //alert(JSON.stringify(data));
        submitUserDataLogin();
    }; // your form submit function which will invoke after successful validation

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

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>User name:</label>
                    <input type="text" className="form-control"{
                        ...register("userName", {
                            required: true,
                            minLength: 3,
                            maxLength: 30,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    } onChange={(e) => {
                        setUserUnLogin(e.target.value);
                    }}/>
                    
                    {errors?.userName?.type === "required" && <div><h5>This field is required!</h5><p>Your must enter your user name.</p></div>}
                    {errors?.userName?.type === "minLength" && <div><h5>Your user name is too short.</h5><p>Your user name length must be between 3 and 30 characters.</p></div>}
                    {errors?.userName?.type === "maxLength" && <div><h5>Your user name is too long.</h5><p>Your user name length must be between 3 and 30 characters.</p></div>}
                    {errors?.userName?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" className="form-control"{
                        ...register("userPw", {
                            required: true,
                            minLength: 8,
                            maxLength: 16
                        })
                    } onChange={(e) => {
                        setUserPwLogin(e.target.value);
                    }}/>

                    {errors?.userPw?.type === "required" && <div><h5>This field is required!</h5><p>Your must enter your password.</p></div>}
                    {errors?.userPw?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                    {errors?.userPw?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 100 characters.</p></div>}
                </div>


                <h1>{LoginStatus}</h1>
                
                <input type="submit" value={"Login"}/> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
            </form>
        </div>
    );
}