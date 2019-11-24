import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import {app} from '../constants/firebase';

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    app.auth().onAuthStateChanged(
      function(user) {
        if(user) {
          console.log("user");
          this.props.navigation.navigate('Discover');
        } else {
          console.log("no user");
          this.props.navigation.navigate('Login');
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <View style = {styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
