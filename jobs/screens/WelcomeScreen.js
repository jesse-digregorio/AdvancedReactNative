import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import Expo from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp' },
  { text: 'Set your location, then swipe away.'}
];

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={style.viewStyle}>
        <Slides data={SLIDE_DATA} />
      </View>
    );
  }
}

const style = {
  viewStyle: {
    paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
    flex: 1
  }
}

export default WelcomeScreen;
