import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-fb7e2.cloudfunctions.net';
const createUserURI = `${ROOT_URL}/createUser`;
const requestPassURI = `${ROOT_URL}/requestOneTimePassword`;

class SignUpForm extends Component {
  // constructor(props) {
  //   super(props);
  //   state = { phone: '' };
  // }
  // the line below is equivalent to the above constructor - StephenG
  state = { phone: '' };

  // handleSubmit = () => {
  //   // going to change this to use the async await system
  //
  //   axios.post(createUserURI, { phone: this.state.phone })
  //     .then(() => {
  //       axios.post(requestPassURI, { phone: this.state.phone })
  //     });
  // }

  handleSubmit = async () => {
    try {
      console.log(createUserURI); console.log(requestPassURI);
      await axios.post(createUserURI, { phone: this.state.phone });
      await axios.post(requestPassURI, { phone: this.state.phone });
    }
    catch (err) {
      console.log(err);
    }
  }

// the classic way of declaring this function, below, would
// require us to do a '.bind(this)' where it is provided to a
// component (e.g. the Button below), in order to ensure using 'this' inside the
// function, refers to the correct context.
//    The above way, using and arrow function, removes the need
//    to do the 'bind(this)'. But is the same in all other
//    aspects.
  // handleSubmit() {
  //
  // }

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
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }

}

export default SignUpForm;
