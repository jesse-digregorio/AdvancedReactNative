import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import Expo from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to find jobs.', color: '#009688' },
  { text: 'Set your location, then swipe away.', color: '#03A9F4' }
];



class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <View style={style.viewStyle}>
        <Slides
          data={SLIDE_DATA}
          onComplete={this.onSlidesComplete}
        />
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
