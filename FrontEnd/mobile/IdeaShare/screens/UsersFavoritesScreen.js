import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

//import { Rating, AirbnbRating } from 'react-native-ratings';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

import Articles from '../components/UsersFavorites/Articles';
import Header from '../components/UsersFavorites/Header';


const UsersFavoritesScreen = () => {
  const {landscape} = useDeviceOrientation();
 
  const [searchedStr, setSearchedStr] = useState('');

  const searchArticle = (str) => {
    setSearchedStr(str);
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Header searchArticle={searchArticle}/>
      <Articles searchedStr={searchedStr}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cec8b0",
    //paddingTop: getStatusBarHeight(),
  },
});

export default UsersFavoritesScreen;
