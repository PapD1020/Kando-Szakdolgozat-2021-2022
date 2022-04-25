import React from 'react';
import {StatusBar} from 'react-native';

//import SecureStore from 'expo-secure-store';
import AuthNavigation from './AuthNavigation';
import Toast, { BaseToast, SuccessToast, ErrorToast, InfoToast } from 'react-native-toast-message';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: 'yellowgreen', height: 'auto', width: 'auto', margin: 20}}
      contentContainerStyle={{ padding: 10}}
      text2NumberOfLines={20}
      text1Style={{
        fontSize: 15,
        //fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
    {...props}
    style={{ borderLeftColor: 'tomato', height: 'auto',  width: 'auto', margin: 20 }}
    contentContainerStyle={{ padding: 10}}
    text2NumberOfLines={20}
    text1Style={{
      fontSize: 15,
      //fontWeight: '400'
    }}
    text2Style={{
      fontSize: 15,
      fontWeight: '400'
    }}
    />
  ),

  info: (props) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: 'blue', height: 'auto', width: 'auto', margin: 20}}
      contentContainerStyle={{ padding: 10}}
      text2NumberOfLines={20}
      text1Style={{
        fontSize: 15,
        //fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
}

export default function App() {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#4d4a42"
          barStyle='light-content'
          //showHideTransition={statusBarTransition}
          hidden={false} />
        <AuthNavigation />
        <Toast config={toastConfig}/>
      </>
    ) 
  }

////default
 {/*export default function App() {
  return (
    <View style={styles.container}>
      <AuthScreen />
        <Text>${onLoggedIn()}</Text>
      <StatusBar style="auto" />
    </View> 
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/}



/////example
/* function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  
  function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  } */
  


  /////working
/*   const Stack = createNativeStackNavigator();
  
  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator
         initialRouteName="Auth"
        screenOptions={{
        headerShown: false
        }}
        >
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } */
  
  ///export default App;



  