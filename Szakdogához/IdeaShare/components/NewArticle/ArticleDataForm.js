import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, Dimensions, StyleSheet, TouchableHighlight, Pressable, FlatList } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';

const ArticleDataForm = () => {



    return(
        <View style={styles.container}>
            <Text style={styles.item}>Text</Text>
            <TextInput style={styles.input} placeholder="Email" autoCapitalize="none"></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:13,
    },
    item: {
        color: 'black',
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#0077c2',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
        color: 'black',

    },
});

export default ArticleDataForm