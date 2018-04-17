import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class DeckExplore extends Component {
  constructorOLD(props) {
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

  getInitialState: function() {
    return {
      pan: new Animated.ValueXY();
    };
  }

  componentWillMount: function() {
    this._animatedValueX = 0;
    this._animatedValueY = 0;
    this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
    this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.pan, {
          toValue: 0
        }).start();
      }
    });
  }

  componentWillUnmount: function() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getStyle: function() {
  return [
    styles.square,
    {
      transform: [
        {
          translateX: this.state.pan.x
        },
        {
          translateY: this.state.pan.y
        },
        {
          rotate: this.state.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]})
        }
        ]
      },
      {
        opacity: this.state.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
      }
    ];
  }

  renderEXAMPLE: function() {
    return (
      <View style={styles.container}>
      <Animated.View
        style={this.getStyle()}
        {...this._panResponder.panHandlers}
      />
    </View>
    );
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{
        rotate: rotate
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
            {...this.state._panResponder.panHandlers}
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

export default DeckExplore;
