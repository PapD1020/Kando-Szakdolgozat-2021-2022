import React, { useState, setState, createContext} from 'react';
import { render } from 'react-dom';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, SafeAreaView } from 'react-native';
import Header from "../components/Settings/Header";
import OptionList from '../components/Settings/OptionList';

const SettingsScreen = ({/*navigation,*/ userName}) => {
    return(
        <SafeAreaView style={styles.container}>
            <Header userName={userName} />
            <OptionList />
        </SafeAreaView>
        

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      //paddingTop: getStatusBarHeight(),
    },
  });


export default SettingsScreen;