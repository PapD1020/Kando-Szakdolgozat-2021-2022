import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, Dimensions, StyleSheet, TouchableHighlight, Platform, Pressable, FlatList } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { AuthContext } from '../../components/Context';

function Header ({userName, ...navigation}) {
const { signOut } = useContext(AuthContext);
    return(
        <View style={styles.HeaderContainer}>
            <UName userName={userName}/>
            <LogoutButton  {...navigation}/>
        </View>
    )
}


const UName = ({userName}) => {

    return(
        <View style={styles.TextContainer}>
            <Text style={styles.Text}>{userName}</Text>
        </View>
    )
}


const LogoutButton = ({...navigation}) => {

    const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://192.168.1.51:5000';

    const onSubmitHandler = () => {
        
        signOut();
    };

    return(
        <View style={styles.LogoutContainer}>
            <TouchableHighlight 
                underlayColor={'rgba(0,0,0,0.3)'}
                style={styles.LogoutButton}
                onPress={onSubmitHandler}>
                    <Image 
                        source={require("../../public/images/power-off.png")} 
                        style={styles.LogoutImage}
                    />
            </TouchableHighlight>
        </View>
    )
}


const styles = StyleSheet.create({
    HeaderContainer: {
        flex:1,
        flexDirection: "row",
        height: '10%',
        fontSize: 40,
        color: '#4d4a42',
        backgroundColor: '#cec8b0'
    },

    TextContainer: {
        flex: 5,
        //justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        paddingLeft: 10,
    },
    Text: {
        fontSize: 40,
        color: '#4d4a42',
        margin:0,
        //textAlign: 'center',
    },

    LogoutContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 100,
    },
    LogoutButton: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 100,
    },
    LogoutImage: {
        aspectRatio : 1,
        width: '100%',
    }
});

export default Header