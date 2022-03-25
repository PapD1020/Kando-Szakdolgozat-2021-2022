import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import Axios from 'axios';

export default function ProfileUpdate(){

    //Id vigygálata, átadása
    //Validációja a beviteli mezőknek

    const [UserUnUpd, setUserUnUpd] = useState('');
    const [UserPPUpd, setUserPPUpd] = useState('');
    const [UserPwUpd, setUserPwUpd] = useState('');
    const [UserFNUpd, setUserFNUpd] = useState('');
    const [UserSNUpd, setUserSNUpd] = useState('');
    const [UserEmailUpd, setUserEmailUpd] = useState('');
    const [LoginStatus, setLoginStatus] = useState('');
    var useId = () => {
        
    }

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        submitUserDataUpd();
    };

    Axios.defaults.withCredentials = true;

    //check every time we refresh the page if a user is logged in
    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
            //ellenőrzésre
            //console.log("Are we logged in: " + JSON.stringify(response));
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0].UserUn);
                GotUserId = response.data.user[0].UserId;
                alert("response.data.user[0].UserId: " + response.data.user[0].UserId + " " + "UserId: " + GotUserId);
            }
        });
    }, []);

    //POST - USERS
    const submitUserDataUpd = (userId) => {
  
    //postName - backend variable name
        Axios.put(`http://localhost:3001/api/update/user/userId`, { //URL for our api (node.js backend)
        //userUn must be the same as in back-end index.js req.body.userUn !!!
        userId: GotUserId,
        userUn: UserUnUpd,
        userPP: UserPPUpd,
        userPw: UserPwUpd,
        userFN: UserFNUpd,
        userSN: UserSNUpd,
        userEmail: UserEmailUpd,
        userCreatedAt: date,
        userUpdatedAt: date

        }).then((response) => 
            console.log("Update user response: " + JSON.stringify(response))
        );
        alert("Successfully updated as maga a változó: " + GotUserId);
        alert("Successfully updated as: " + userId);
    };

    return(
        <div>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label>User name:</label>
                <input type="text" className="form-control" {
                    ...register("userUnUpd", {
                        minLength: 6,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                    })
                }onChange={(e) => {
                    setUserUnUpd(e.target.value);
                }}/>
                
                {errors?.userUnUpd?.type === "minLength" && <div><h5>Your user name is too short.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                {errors?.userUnUpd?.type === "maxLength" && <div><h5>Your user name is too long.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                {errors?.userUnUpd?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
            </div>
            
            <div className="form-group">
                <label>User profile picture:</label>
                <input type="url" className="form-control" {
                    ...register("userPPUpd", {
                        minLength: 8,
                        maxLength: 100,
                    })
                }onChange={(e) => {
                    setUserPPUpd(e.target.value);
                }}/>

                {errors?.userPPUpd?.type === "minLength" && <div><h5>The URL is too short.</h5><p>Your URL length must be between 8 and 100 characters.</p></div>}
                {errors?.userPPUpd?.type === "maxLength" && <div><h5>The URL is too long.</h5><p>Your URL length must be between 8 and 100 characters.</p></div>}
            </div>

            <div className="form-group">
                <label>User password: </label>
                <input type="password" className="form-control" {
                    ...register("userPwUpd", {
                        minLength: 8,
                        maxLength: 16,
                    })
                }onChange={(e) => {
                    setUserPwUpd(e.target.value);
                }}/>

                {errors?.userPwUpd?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                {errors?.userPwUpd?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
            </div>

            <div className="form-group">
                <label>User first name:</label>
                <input type="text" className="form-control" {
                    ...register("userFNUpd", {
                        minLength: 3, //Mennyi legyen?
                        maxLength: 20, //Mennyi legyen?
                    })
                }onChange={(e) => {
                    setUserFNUpd(e.target.value);
                }}/>

                {errors?.userFNUpd?.type === "minLength" && <div><h5>Your first name is too short.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
                {errors?.userFNUpd?.type === "maxLength" && <div><h5>Your first name is too long.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
            </div>

            <div className="form-group">
                <label>User second name:</label>
                <input type="text" className="form-control" {
                    ...register("userSNUpd", {
                        minLength: 3, //Mennyi legyen?
                        maxLength: 20, //Mennyi legyen?
                    })
                }onChange={(e) => {
                    setUserSNUpd(e.target.value);
                }}/>

                {errors?.userSNUpd?.type === "minLength" && <div><h5>Your second name is too short.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                {errors?.userSNUpd?.type === "maxLength" && <div><h5>Your second name is too long.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
            </div>

            <div className="form-group">
                <label>User email: </label>
                <input type="email" className="form-control" {
                    ...register("userEmailUpd", {
                        //vmi must contain @ ellenőrzés stb
                    })
                }onChange={(e) => {
                    setUserEmailUpd(e.target.value);
                }}/>
            </div>

            <input type="submit" /> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
        </form>

        <h1>{LoginStatus}</h1>
    </div>
    );  
}