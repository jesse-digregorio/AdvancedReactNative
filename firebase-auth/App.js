import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

export default class App extends React.Component {

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyDwm7PMRHr42FUeQWYcjSZAC_azT6S8VHI",
      authDomain: "one-time-password-fb7e2.firebaseapp.com",
      databaseURL: "https://one-time-password-fb7e2.firebaseio.com",
      projectId: "one-time-password-fb7e2",
      storageBucket: "one-time-password-fb7e2.appspot.com",
      messagingSenderId: "148425740617"
    };
    firebase.initializeApp(config);

  }


  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
