import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, StyleSheet, TouchableHighlight, Pressable, FlatList } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';

const OptionList = () => {



    return(
        <View style={styles.container}>
            <Text style={styles.item}>Text</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:10,
    },
    item: {
        color: 'black',
    }
});

export default OptionList