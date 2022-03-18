import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthScreen, SettingsScreen, HomeScreen, NewArticleScreen } from './screens';

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
}


const Tab = createMaterialBottomTabNavigator();


export const SignedInStack = ({userName}) => {  
    return (
      <NavigationContainer>
     {/*    <Stack.Navigator
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
        </Stack.Navigator> */}
        <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        activeColor="#4d4a42"
       // inactiveColor="#3e2465"
        /*barStyle={{ backgroundColor: '#694fad' }}*/>
          <Tab.Screen
            name="Home"
            children={props =><HomeScreen {...props} userName={userName}/>}
            options={{
              tabBarColor:"#c9c8b3",
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
            />
          <Tab.Screen
            name="Create New"
            children={props => <NewArticleScreen {...props} userName={userName} />}
            options={{
              tabBarColor:"#c9c8b3",
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="plus-thick" color={color} size={26} />
              ),
            }}
            />
            <Tab.Screen
            name="PostCreate"
            children={props => <SettingsScreen {...props} userName={userName} />}
            options={{
              tabBarColor:"#c9c8b3",
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
            />
        </Tab.Navigator>
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