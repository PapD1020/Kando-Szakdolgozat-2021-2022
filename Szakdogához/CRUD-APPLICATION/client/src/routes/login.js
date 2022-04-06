import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import Axios from 'axios';
import { Alert, Button } from 'react-bootstrap';

export default function Login(){

    const [UserUnLogin, setUserUnLogin] = useState('');
    const [UserPwLogin, setUserPwLogin] = useState('');

    const [LoginStatus, setLoginStatus] = useState(false);

    const [ErrorMessage, setErrorMessage] = useState('');

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

            if(!response.data.auth){ //ha nem vagyunk authentikálva
                //setLoginStatus(response.data.message);
                setErrorMessage(response.data.message);
                setLoginStatus(false);
                console.log("Login user response.data: " + JSON.stringify(response.data));
            }
            else{
                console.log("Bejelentkezve");
                console.log(JSON.stringify(response.data));
                //setLoginStatus("Successfully logged in as: " + response.data[0].UserUn); //it will be an array !!! a jwt óta nem sima res.send(result) van, amivel ez működne, hanem res.json({auth: true, token: token, result: result});

                console.log("token: " + JSON.stringify(response.data.token));
                localStorage.setItem("token", response.data.token); //a local storegabe mentjük a tokent, máshogy is lehetne. data.token - meg kell nézni console.loggaé, hogy hogy kell rá hivatkozni.
                setLoginStatus(true);
                //alert("Successfully logged in as: " + response.data[0].UserUn); jwt óta nem jó, backendben nem sime res.send(result) van, hanem res.json({auth: true, token: token, result: result});
            }
        });
    };

    const userAuthenticated = () => {
        Axios.get('http://localhost:3001/api/login/user/auth', {headers: {
            "x-access-token": localStorage.getItem("token")
        }}).then((response) => {
            alert("Authenticated");
            console.log("isUserAuth response: " + JSON.stringify(response.data));
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

    const [showState, setShowState] = useState(true);

    const [showStateDanger, setShowStateDanger] = useState(true);

    /* Valamiért fölösleges Alert hez
    const closeAlert = () => setShowState(false);

    const openAlert = () => setShowState(true);
    */
    return(
        
        <div>
            {!LoginStatus && (
            <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="display-6 mb-3">User name:</label>
                    <input type="text" className="p-2 mb-5 form-control"{
                        ...register("userName", {
                            required: true,
                            minLength: 3,
                            maxLength: 30,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    } onChange={(e) => {
                        setUserUnLogin(e.target.value);
                    }}/>
                    
                    <div className="errordiv">
                        {errors?.userName?.type === "required" && <div className=""><h5>This field is required!</h5><p>Your must enter your user name.</p></div>}
                        {errors?.userName?.type === "minLength" && <div className=""><h5>Your user name is too short.</h5><p>Your user name length must be between 3 and 30 characters.</p></div>}
                        {errors?.userName?.type === "maxLength" && <div className=""><h5>Your user name is too long.</h5><p>Your user name length must be between 3 and 30 characters.</p></div>}
                        {errors?.userName?.type === "pattern" && <div className=""><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                    </div>
                </div>

                <div className="form-group">
                    <label className="display-6 mb-3">Password: </label>
                    <input type="password" className="form-control mb-3"{
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
                <input type="submit" value={"Login"}/>
            </form>
            )}

            {LoginStatus && (
                <button onClick={userAuthenticated}>Check if authenticated</button>
            )}
                

            {LoginStatus && (
                <Alert show={showState} variant="success">
                <Alert.Heading>Log in successfull!</Alert.Heading>
                <p>
                    Welcome {LoginStatus} !
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowState(false)} variant="outline-success">
                        Ok
                    </Button>
                </div>
                </Alert>
            )}

            {ErrorMessage && (
                <Alert show={showStateDanger} variant="danger">
                <Alert.Heading>Log in unsuccessfull!</Alert.Heading>
                <p>
                    {ErrorMessage}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowStateDanger(false)} variant="outline-success">
                        Close
                    </Button>
                </div>
                </Alert>
            )}
        </div>
    );
}