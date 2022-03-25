import React, { useState } from "react";
import { Text, Image, StyleSheet, Pressable } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import * as ImagePicker from 'expo-image-picker';


const Comments = (isPanelActive, setIsPanelActive) =>{
     //swipepanel
     const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        zIndex : 100,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });

     //const [isPanelActive, setIsPanelActive] = useState(true);

    const openPanel = () => {
        //setIsPanelActive(true);
    };

    const closePanel = () => {
       // setIsPanelActive(false);
    };

    //imagePicker
    const [pickedImagePath, setPickedImagePath] = useState('');
            
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({});
        setPickedImagePath(result.uri);
    };
    const openCamera = async () => {
        
        let result = await ImagePicker.launchCameraAsync({});
        setPickedImagePath(result.uri);
        
    };

    return(
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
            <Pressable
                onPress={openCamera}
                style={styles.pressable}
                >
                <Text
                    style={styles.button_text}
                >
                    Upload Photo
                </Text>
            </Pressable>

            <Pressable
                onPress={pickImage}
                style={styles.pressable}
                >
                <Text
                    style={styles.button_text}
                >
                    Upload Image
                </Text>
            </Pressable>
            
            {
            pickedImagePath !== '' && <Image 
                source={{uri: pickedImagePath}} 
                style={styles.photoshot}
            />
            }
        </SwipeablePanel>
    )
}

const styles = StyleSheet.create({
pressable:{
    height: 50,
    backgroundColor: '#009688',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 30,
},
button_text:{
    color: '#ffffff',
    fontSize: 20,
},
photoshot:{
    aspectRatio : 1,
    width: '100%',
    borderRadius: 20,
    flex:1,
    marginBottom: 5,
},
});

export default Comments;