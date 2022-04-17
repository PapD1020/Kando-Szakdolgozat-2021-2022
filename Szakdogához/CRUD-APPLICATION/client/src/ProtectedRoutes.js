import  Axios  from "axios";
import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Login from "./routes/login";


export default function ProtectedRoutes(){

    //const AuthStatus = useRef(false);

    const [AuthStatus, setAuthStatus] = useState(false);
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user/auth', {headers: {
            "x-access-token": localStorage.getItem("token")
        }}).then((response) => {
            console.log("Auth status eldöntés előtt: " + AuthStatus.current);
            if(response.data.isUserAuth === true){
                setAuthStatus(response.data.isUserAuth);
                //AuthStatus.current = response.data.isUserAuth;
                console.log("Auth status eldöntés után: " + AuthStatus);
            }
            else{
                console.log("Auth status eldöntés után: " + AuthStatus);
                alert("Session terminated. You have been logged out.");
            }
            console.log("isUserAuth response: " + JSON.stringify(response.data));
            console.log(response.data.isUserAuth);
        });
    }, []);

    return AuthStatus ? <Outlet/> : <Login />;
}