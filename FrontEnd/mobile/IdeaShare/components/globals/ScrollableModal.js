import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modalbox';
import {Easing} from 'react-native-reanimated';

import Comments from "../Home/Comments";
import Profile from "../Home/Profile";


const ScrollableModal = ({isVisible,onSwipeComplete,id,content}) => {

    return (
        <Modal
          style={[styles.container,
                  content=='comments' ?
                    styles.height400
                  : content=='profile' ?
                    styles.heightFull
                  :
                    styles.height400 ]}
          swipeToClose={true}
          backButtonClose={true}
          swipeArea={130} // The height in pixels of the swipeable area, window height by default
          swipeThreshold={1} // The threshold to reach in pixels to close the modal
          isOpen={isVisible}
          onClosed={onSwipeComplete}
          backdropOpacity={0.4}
          position={'bottom'}
          easing={Easing.bezierFn(0.3, 0, 0, 1)}
          animationDuration={400}
        >
          { content == 'comments' ?
            <Comments articleId={id}/>
          : content == 'profile' &&
            <Profile userId={id}/>
          }
        </Modal>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
   // height: 400,
    backgroundColor: "#f2f1e1",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  height400: {
    height: 400,
  },
  heightFull: {
    flex:1,
  }
});

export default ScrollableModal;