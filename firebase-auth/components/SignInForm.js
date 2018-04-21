import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-fb7e2.cloudfunctions.net';
const verifyOneTimePasswordUri = `${ROOT_URL}/verifyOneTimePassword`;

class SignInForm extends Component {
  state = {
    phone: '',
    code: '',
    token: null
  };

  handleSubmit = async () => {
    try {
      console.log(verifyOneTimePasswordUri);
      await axios.post(verifyOneTimePasswordUri,
        {
          phone: this.state.phone,
          code: this.state.code
        });
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
        <FormLabel>Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>
        <Button onPress={this.handleSubmit} title="Sign In" />
      </View>
    );
  }

}

export default SignInForm;
