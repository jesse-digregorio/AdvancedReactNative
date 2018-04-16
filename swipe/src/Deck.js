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

  getCardStyle() {
    return {
      ...this.state.position.getLayout(),
      transform: [{
        rotate: '45deg'
      }]
    };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
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
