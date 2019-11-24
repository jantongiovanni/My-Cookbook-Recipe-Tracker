import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView
  } from 'react-native';
  import { withNavigation } from 'react-navigation'

import ListItem from '../components/ListItem';
import ProfileScreen from '../screens/ProfileScreen';

class HomeContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });
  render () {
      return (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <ProfileScreen/>
            <ListItem/>
          </ScrollView>
        </SafeAreaView>
      )};
}
export default withNavigation(HomeContainer);
