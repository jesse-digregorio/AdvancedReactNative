import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder
} from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);

    const panResponder = PanResponder.create({

    });

    this.state = { panResponder };
    // while this is convention (putting panResponder in state) according to SG,
    // we will never call .setState on panResponder.
    // it could just as easily be placed directly in the object like so:
    //    this.panResponder = { panResponder };
    // We are only putting it in state, because that is the current convention.
    //
  }

  renderCards() {
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  }


  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
