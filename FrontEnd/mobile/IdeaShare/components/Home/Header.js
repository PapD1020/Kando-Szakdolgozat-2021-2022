import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({userName/*, ...navigation*/}) => {
    return(
        <View style={styles.HeaderContainer}>
            <UName userName={userName}/>
            {/* <SettingsButton  {...navigation}/> */}
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

/*const SettingsButton = ({...navigation}) => {
    return(
        <View style={styles.SettingsContainer}>
            <TouchableHighlight 
            underlayColor={'rgba(0,0,0,0.3)'}
                style={styles.SettingsButton}
                onPress={() => navigation.navigate('Settings', {paramKey: "1",})}>
                    <Image 
                        source={require("../../public/images/gear.png")} 
                        style={styles.SettingsImage}
                    />
            </TouchableHighlight>
        </View>
    )
}
*/
const styles = StyleSheet.create({
    HeaderContainer: {
        flex:1,
        flexDirection: "row",
        height: '10%',
        fontSize: 40,
        color: '#4d4a42',
        backgroundColor: "#cec8b0",//'#8aacc8',
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

    SettingsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 100,
    },
    SettingsButton: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 100,
    },
    SettingsImage: {
        aspectRatio : 1,
        width: '100%',
    }
});

export default Header