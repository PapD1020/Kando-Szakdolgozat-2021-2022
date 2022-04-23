import  Axios  from "axios";
import { useEffect, useState} from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes(){

    const [Auth, setAuth] = useState(false);
    const [Done,setDone] = useState(false);
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user/auth', {headers: {
            "x-access-token": localStorage.getItem("token")
        }}).then((response) => {
  
            if(response.data.isUserAuth === undefined){
                if(response.data.auth === false){
                    setAuth(response.data.auth);
                    setDone(true);
                }
            }
            else{
                if(response.data.isUserAuth === true){
                    setAuth(response.data.isUserAuth);
                    setDone(true);
                }
            }
        })
    }, []);

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