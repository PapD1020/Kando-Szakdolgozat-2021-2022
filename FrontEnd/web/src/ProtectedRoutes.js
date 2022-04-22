import  Axios  from "axios";
import { useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import App from "./App";


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
                setAuthStatus(false);
                console.log("Auth status eldöntés után: " + AuthStatus);
                alert("Session terminated. You have been logged out.");
            }
            console.log("isUserAuth response: " + JSON.stringify(response.data));
            console.log(response.data.isUserAuth);
        });
    }, []);

    return AuthStatus ? <Outlet/> : <App />;
}