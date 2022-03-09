import React, { useState, setState, createContext, useContext} from 'react';
import { ImageBackground, Image, Dimensions, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, useWindowDimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AuthContext } from '../components/Context';
import {useStateIfMounted} from 'use-state-if-mounted';


//const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://192.168.1.51:5000';
//const API_URL = Platform.OS === 'ios' ? 'http://localhost:3001' : 'http://192.168.0.107:3001';

const API_URL = Platform.OS === 'ios' ? 'https://nodejs-server-test-app.herokuapp.com' : 'https://nodejs-server-test-app.herokuapp.com';


function AuthScreen ({navigation}) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useStateIfMounted(false);
    const [getmessage, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);  

    const { signIn } = useContext(AuthContext);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Email' : email,
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setMessage(jsonRes.message);
                    /* navigation.navigate('Home', {
                        paramKey: jsonRes.userName,
                      }); */
                      signIn(token, jsonRes.userName);
                    setIsError(false);
                }else{
                    setIsError(true);
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    onLoggedIn(jsonRes.token);
                    setIsError(false);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + getmessage;
    }

    const windowHeight = useWindowDimensions().height;

    return (
        <View style={[{ minHeight: Math.round(windowHeight), height:Dimensions.get('screen').height }]}>
        <View style={styles.background}>
            <LinearGradient style = {styles.titleGradient} colors={['#8aacc8','#8aacc8','#8aacc8']}>
           <View style={styles.titleCntainer}>
                <Text style={styles.titleText}>IdeaShare</Text>
            </View>
            </LinearGradient>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                    <View style={styles.form}>
                        <View style={styles.inputs}>
                            <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                            {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}
                            <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{getmessage ? getMessage() : null}</Text>
                            <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                                <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                            </TouchableOpacity>
                        </View>    
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Image style={styles.footerImg} source={require('../public/images/bulb.png')}></Image>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleGradient: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: getStatusBarHeight(),
        //backgroundColor: '#009688',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '100%',
        marginBottom: 20,
    },
    titleText: {
        fontSize: 50,
        color: '#eeffff',
    },
    background: {
        backgroundColor: '#eeffff'/*'#bbdefb'*/,
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    cardContainer: {
        flex: 7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#eeffff',
        width: '80%',
        //marginTop: '40%',
        borderRadius: 20,
        maxHeight: 380,
        //paddingBottom: '27%',
        paddingBottom: '27%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: '#8aacc8',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#0077c2',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
        color: 'black',

    },
    button: {
        width: '80%',
        backgroundColor: '#8aacc8',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 5,
        borderColor: '#8aacc8'/*'#0077c2'*/,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: '#8aacc8',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    footer: {
        flex: 5,
       // alignItems: 'center',
       // justifyContent: 'center',
       // backgroundColor: 'red',
        width: '100%'
    },
    footerImg:{
        marginBottom: -50,
        marginLeft: -50,
        flex:1,
        aspectRatio: 1,
    },
});

export default AuthScreen;