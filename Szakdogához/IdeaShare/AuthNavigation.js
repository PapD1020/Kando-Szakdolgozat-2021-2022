import React, { useEffect, useMemo, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {SignedInStack, SignedOutStack } from './navigation';
import { AuthContext } from './components/Context';
import {useStateIfMounted} from 'use-state-if-mounted';

const AuthNavigation = () => {

    const [userToken, setUserToken] = useStateIfMounted(null);
    const [userName, setUserName] = useStateIfMounted(null);   

    const authContext = useMemo(() => ({
        signIn: (token,name) => {
            setUserToken(token);  
            setUserName(name); 
            //setIsLoading(false);
        },
        signOut: () => {
            setUserToken(null);
            //setIsLoading(false);
        },
        signUp: ({token}) => {
            setUserToken(token);
            //setIsLoading(false);
        },
    }));


    return(
        
        //return <>{currentUser ? <SignedInStack />: <SignedOutStack />}</>
        <AuthContext.Provider value={authContext}>
            { userToken != null ? (
                <SignedInStack userName={userName}/>
                
            ):(
                <SignedInStack userName={userName}/>

            )
        
        }
        </AuthContext.Provider>
    )
}


export default AuthNavigation