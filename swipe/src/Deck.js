import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

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
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('swipe right');
        }
        else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('swipe left');
        }
        else {
          this.resetPosition();
        }
      }
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

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();

  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
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
