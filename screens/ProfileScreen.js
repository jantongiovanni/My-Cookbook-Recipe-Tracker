import React, {Component} from 'react';
import { View, Button, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class ProfileScreen extends Component {


  render() {
    return (
      <View style = {styles.container}>
        <Button title="Sign Out"
          style={{paddingTop: 20}}
          onPress={() => firebase.auth().signOut() }/>
      </View>
    );
  }
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
