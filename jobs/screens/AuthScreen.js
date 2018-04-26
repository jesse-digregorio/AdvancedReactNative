import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

// The Auth Screen - I don't want to make a facebook account
// just to do Auth via facebook. I'll be watching, but not doing,
// the lessons.

class AuthScreen extends Component {

  componentDidMount() {
    this.props.facebookLogin();
  }

  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
      </View>
    );
  }
}

export default connect(null, actions)(AuthScreen);
