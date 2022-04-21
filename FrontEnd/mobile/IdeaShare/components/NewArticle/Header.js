import React, {useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from '../../components/Context';

function Header ({userName, ...navigation}) {
const { signOut } = useContext(AuthContext);
    return(
        <View style={styles.HeaderContainer}>
            <UName userName={userName}/>
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