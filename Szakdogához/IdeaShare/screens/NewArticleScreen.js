import React, { useState, setState, createContext} from 'react';
import { render } from 'react-dom';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, SafeAreaView } from 'react-native';
import Header from "../components/NewArticle/Header";
import ArticleDataForm from '../components/NewArticle/ArticleDataForm';

const NewArticleScreen = ({/*navigation,*/ userName}) => {
    return(
        <SafeAreaView style={styles.container}>
            <Header userName={userName} />
            <ArticleDataForm></ArticleDataForm>
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


export default NewArticleScreen;