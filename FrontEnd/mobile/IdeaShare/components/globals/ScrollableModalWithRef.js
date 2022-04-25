import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modalbox';
import {Easing} from 'react-native-reanimated';

import Comments from "../Home/Comments";
import Profile from "../Home/Profile";


const ScrollableModal = React.forwardRef((props,ref) => {

    return (
        <Modal
          style={[styles.container,
                  props.content == 'comments' ?
                    styles.height400
                  : props.content == 'profile' ?
                    styles.heightFull
                  :
                    styles.height400 ]}
          swipeToClose={true}
          backButtonClose={true}
          swipeArea={130} // The height in pixels of the swipeable area, window height by default
          swipeThreshold={1} // The threshold to reach in pixels to close the modal
          backdropOpacity={0.4}
          /*backdrop={props.content == 'comments' ?
                      true
                    : props.content == 'profile' ?
                      false
                    :
                      true }*/
          onClosed={props.onSwipeComplete}
          position={'bottom'}
          easing={Easing.bezierFn(0.3, 0, 0, 1)}
          animationDuration={400}
          ref={ref}
        >
          { props.content == 'comments' ?
            <Comments articleId={props.id}/>
          : props.content == 'profile' &&
            <Profile userId={props.id}/>
          }
        </Modal>
    );
}
)
const styles = StyleSheet.create({
  container: {
    margin: 0,
   // height: 400,
    backgroundColor: "#f2f1e1",
  },
  height400: {
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heightFull: {
    flex: 1,
  }
});

export default ScrollableModal;