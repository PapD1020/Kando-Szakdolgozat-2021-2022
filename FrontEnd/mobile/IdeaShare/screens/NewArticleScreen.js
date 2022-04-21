import React, { useState, setState, createContext} from 'react';
import { render } from 'react-dom';
import { ImageBackground, View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Platform, SafeAreaView } from 'react-native';
import Header from "../components/NewArticle/Header";
import ArticleDataForm from '../components/NewArticle/ArticleDataForm';

const NewArticleScreen = ({/*navigation,*/ userName}) => {
    return(
          <ScrollView style={styles.container} /* contentContainerStyle={{flexGrow: 1}}*/>
            <Header userName={userName} />
            <ArticleDataForm/>
          </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      //paddingTop: getStatusBarHeight(),
    },
  });


export default NewArticleScreen;