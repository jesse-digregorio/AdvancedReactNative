import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder
} from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new  Animated.ValueXY();

    const panResponder = PanResponder.create({
      // should this pan responder respond to the current gesture?
      // returns true or false
      onStartShouldSetPanResponder: () => true,

      // is a callback. will be called any time the user drags their finger
      // across the screen.
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })

      },

      // when the user removes their finger from the screen
      onPanResponderRelease: () => {}
    });

    this.state = { panResponder, position };
    // while this is convention (putting panResponder in state) according to SG,
    // we will never call .setState on panResponder.
    // it could just as easily be placed directly in the object like so:
    //    this.panResponder = { panResponder };
    // We are only putting it in state, because that is the current convention.
    //
    // same for position, added in lesson 20
  }

  renderCards() {
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  }


  render() {
    return (
      <Animated.View 
        style={this.state.position.getLayout()}
        {...this.state.panResponder.panHandlers}>
        {this.renderCards()}
      </Animated.View>
    );
  }
}

export default Deck;
