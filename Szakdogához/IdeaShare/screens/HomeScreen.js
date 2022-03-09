import React, { useState, useMemo } from 'react';
import { StyleSheet, Dimensions, Text, FlatList, View, SafeAreaView, Image, TouchableNativeFeedback, TouchableHighlight, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

import { Rating, AirbnbRating } from 'react-native-ratings';


import Posts from '../components/Home/Posts';
import Header from '../components/Home/Header';
//import Comments from '../components/Home/Comments';

const HomeScreen = ({navigation, userName}) => {
  const {landscape} = useDeviceOrientation();
  const [isPanelActive, setIsPanelActive] = useState(false);

 
  return (
    <SafeAreaView style={styles.container}>
      
      {/* <Comments isPanelActive={isPanelActive} setIsPanelActive={setIsPanelActive}/> */}
      <Header userName={/* route.params.paramKey*/userName} {...navigation} />
      <Posts />
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: getStatusBarHeight(),
  },
});

export default HomeScreen;
