import React, { useState } from 'react';
import styles from '../styles/styles';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Image,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeableCard = ({ item, removeCard, swipedDirection }) => {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  let swipeDirection = '';
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 285) {
        swipeDirection = 'Derecha';
      } else if (gestureState.dx < -SCREEN_WIDTH + 285) {
        swipeDirection = 'Izquierda';
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 285 &&
        gestureState.dx > -SCREEN_WIDTH + 285
      ) {
        swipedDirection('--');
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 285) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 285) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          backgroundColor: item.backgroundColor,
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}>
      <View style={{ width: '100%', height: '55%', flex: 1, alignContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: '100%', height: '55%', resizeMode: 'stretch', borderRadius: 7 }} source={ require('../assets/foto.jpg') } />
      </View>
      <Text style={styles.cardTitleStyle}> {item.cardTitle} </Text>
    </Animated.View>
  );
};

export default SwipeableCard;