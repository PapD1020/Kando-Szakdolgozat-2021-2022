import React from 'react'
import {Outlet} from 'react-router-dom'
import SignIn from './components/SignIn'

const useAuth = () => {
    const user = {loggedIn: false}
    return user && user.loggedIn;
}

function ProtectedRoutes() {

    const isAuth = useAuth();

  return isAuth ? <Outlet /> : <SignIn />;

}

export default ProtectedRoutes