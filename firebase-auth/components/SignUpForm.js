import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';


class SignUpForm extends Component {
  // constructor(props) {
  //   super(props);
  //   state = { phone: '' };
  // }
  // the line below is equivalent to the above constructor - StephenG
  state = { phone: '' };

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
