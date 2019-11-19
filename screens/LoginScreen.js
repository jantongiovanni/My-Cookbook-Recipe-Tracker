import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import {db} from '../constants/firebase';
import firebase from 'firebase';

class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.user.id) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            //googleUser.getAuthResponse().id_token);
            googleUser.idToken,
            googleUser.accessToken
          );
        // Sign in with credential from the Google user.
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
          console.log("user signed in");
          if(result.additionalUserInfo.isNewUser){
            userRef = db.collection('users').doc(result.user.uid);
            const userData = {
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              name: result.additionalUserInfo.profile.name,
              created_at: Date.now()
            }
            userRef.set(userData);
          } else {
            userRef = db.collection('users').doc(result.user.uid);
            userRef.update({
              last_logged_in: Date.now()
            })
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in to Firebase.');
      }
    }.bind(this)
  );
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: '150393592512-bvm9l2qfa6mkmadldrl0kkoaagpee8dg.apps.googleusercontent.com',
        iosClientId: '150393592512-r7bkp13oig46g88u8i7nedh4m34rcbsg.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
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
