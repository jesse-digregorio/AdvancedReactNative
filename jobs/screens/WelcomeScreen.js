import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage, Platform } from 'react-native';
import { AppLoading } from 'expo';
import Expo from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to find jobs.', color: '#009688' },
  { text: 'Set your location, then swipe away.', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = 'no facebook plz'; //await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      //return <AppLoading />;
      return ( <Text>this is effed</Text>);
    }

    return (
      <View style={style.viewStyle}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
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
