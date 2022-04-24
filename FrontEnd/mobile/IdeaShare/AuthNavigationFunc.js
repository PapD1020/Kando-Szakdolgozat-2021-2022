import React, { useMemo} from 'react';
import { Alert } from 'react-native';
import {SignedInStack, SignedOutStack } from './navigation';
import { AuthContext } from './components/globals/Context';
import {useStateIfMounted} from 'use-state-if-mounted';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigation = () => {

    const createTwoButtonAlert = (value) =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg" +value,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

 /*   AsyncStorage.getItem('isLoggedIn').then((value) => {
         if(value && value === 'YES') {
            AsyncStorage.getItem('token').then((token) => {
                AsyncStorage.getItem('name').then((name) => {
                setUserToken(token);
                setUserName(name);
                })

            })
         } else {
 
         }
       })
       
    })*/
AsyncStorage.getItem('token').then((token) => {
        setUserToken(null);
        })

    const [userToken, setUserToken] = useStateIfMounted(null);
    const [userName, setUserName] = useStateIfMounted(null);   

    const authContext = useMemo(() => ({
        signIn: (token,name) => {
         /*   const items = [['token', token], ['name', name]];
            AsyncStorage.multiSet(items, () => {
            });*/
            AsyncStorage.setItem('token', token).then(()=>{
                AsyncStorage.setItem('name', name).then(()=>{
                   AsyncStorage.setItem('isLoggedIn', 'YES');
                });
            });
            setUserToken(token);  
            setUserName(name); 
            //setIsLoading(false);
        },
        signOut: () => {
            AsyncStorage.setItem('token', token).then(()=>{
                AsyncStorage.setItem('name', name).then(()=>{
                   AsyncStorage.setItem('isLoggedIn', 'YES');
                });
            });
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
                <SignedOutStack userName={userName}/>

            )
        
        }
        </AuthContext.Provider>
    )
}


export default AuthNavigation