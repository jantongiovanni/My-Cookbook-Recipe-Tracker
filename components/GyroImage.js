import React, { Component }from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Gyroscope, Accelerometer } from "expo-sensors";
const { width: screenWidth } = Dimensions.get('window')
const { height: screenHeight} = Dimensions.get('window')

export default class GyroImage extends Component {
  constructor() {
    super();
    // this.state = {
    //   x: 0,
    //   y: 0,
    //   z: 0,
    // };
    this.state = {
      accelerometerData: {},
    };
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

    _subscribe = () => {
    this._subscription = Gyroscope.addListener(accelerometerData => {
      this.setState({ accelerometerData });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  // componentWillMount() {
  //   // Normal RxJS functions
  //   accelerometer
  //       .subscribe(({x, y, z}) => this.setState({
  //         x: x,
  //         y: y,
  //         z: z,
  //       }));
  // }


  render() {
    let { x, y, z } = this.state.accelerometerData;
    console.log("x: " + round(x) + "y: " + round(y) + "z: " + round(z));
    return (
      <Image style={{left: round(x) + round(y), top: round(z)}}
                   source={require('../assets/images/Italian-Sausage-Poutine.jpg')}/>
    )
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 10;
}
