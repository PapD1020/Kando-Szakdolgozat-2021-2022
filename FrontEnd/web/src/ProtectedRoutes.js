import  Axios  from "axios";
import { useEffect, useState} from "react";
import { Outlet, Navigate } from "react-router-dom";
import App from "./App";


export default function ProtectedRoutes(){

    //const AuthStatus = useRef(false);

    const [Auth, setAuth] = useState(false);
    const [Done,setDone] = useState(false);
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user/auth', {headers: {
            "x-access-token": localStorage.getItem("token")
        }}).then((response) => {
            console.log("isUserAuth response: " + JSON.stringify(response.data));
            console.log("isUserAuth response isUserAuth: " + JSON.stringify(response.data.isUserAuth));
            console.log("isUserAuth response auth: " + JSON.stringify(response.data.auth));
  
            if(response.data.isUserAuth === undefined){
                if(response.data.auth === false){
                    console.log("ifben1: " + response.data.auth);
                    setAuth(response.data.auth);
                    setDone(true);
                }
            }
            else{
                if(response.data.isUserAuth === true){
                    console.log("ifben2: " + response.data.isUserAuth);
                    setAuth(response.data.isUserAuth);
                    setDone(true);
                }
            }
        })
    }, []);
    console.log("authstatus: "+Auth);
    return Done === true ?
             Auth ? <Outlet/> : <Navigate to="/" />
             :
             <Wait/>
             ;
}

function Wait (){
    return (
        <></>
    )
}