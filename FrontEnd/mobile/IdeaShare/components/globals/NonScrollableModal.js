import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDataForm from '../Settings/UserDataForm';
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

const NonScrollableModal = ({isVisible,onSwipeComplete}) => {

  const [beginLoadData, setBeginLoadData] = useState(false);

    return (
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        onSwipeComplete={onSwipeComplete}
        swipeDirection={['down']}
        style={styles.modal}
        onBackButtonPress={() => onSwipeComplete()}
        onBackdropPress={() => onSwipeComplete()}
        animationInTiming = {400}
        animationOutTiming = {700}
        onModalShow = {() => setBeginLoadData(true) }
        onModalHide = {() => setBeginLoadData(false) }
        >
        <View style={styles.scrollableModal}>
              <UserDataForm beginLoadData={beginLoadData}/>
        </View>
        <Toast config={toastConfig}/>
      </Modal>
    )
}





const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default NonScrollableModal;