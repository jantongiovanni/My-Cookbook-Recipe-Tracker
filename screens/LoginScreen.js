import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';

class LoginScreen extends Component {

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: '150393592512-bvm9l2qfa6mkmadldrl0kkoaagpee8dg.apps.googleusercontent.com',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <Button title="Sign In With Google"
          onPress={() => this.signInWithGoogleAsync() }/>
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
