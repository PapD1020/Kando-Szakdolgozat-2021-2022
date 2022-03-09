import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthScreen, SettingsScreen, HomeScreen } from './screens';

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
}


export const SignedInStack = ({userName}) => {  
    return (
      <NavigationContainer>
        <Stack.Navigator
         initialRouteName="Home"
        screenOptions={screenOptions}
        >
          <Stack.Screen
            name="Home">
            {props => <HomeScreen {...props} userName={userName} />}
          </Stack.Screen>
          <Stack.Screen
            name="Settings">
            {props => <SettingsScreen {...props} userName={userName} />}
            </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


export const SignedOutStack = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator
     initialRouteName="Auth"
    screenOptions={screenOptions}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
  
}


export default SignedInStack