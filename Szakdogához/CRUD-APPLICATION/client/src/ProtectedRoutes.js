import  Axios  from "axios";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Login from "./routes/login";


export default function ProtectedRoutes(){

    const [AuthStatus, setAuthStatus] = useState(false);
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user/auth', {headers: {
            "x-access-token": localStorage.getItem("token")
        }}).then((response) => {
            alert("Auth status eldöntés előtt: " + AuthStatus);
            if(response.data.isUserAuth === true){
                setAuthStatus(response.data.isUserAuth);
                alert("Auth status eldöntés után: " + AuthStatus);
            }
            console.log("isUserAuth response: " + JSON.stringify(response.data));
            console.log(response.data.isUserAuth);
        });
    }, [AuthStatus]);

    return AuthStatus ? <Outlet/> : <Login />;
}