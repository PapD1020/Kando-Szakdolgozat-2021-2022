import React from 'react';

//import SecureStore from 'expo-secure-store';
import AuthNavigation from './AuthNavigation';


export default function App() {
    return <AuthNavigation />
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



  