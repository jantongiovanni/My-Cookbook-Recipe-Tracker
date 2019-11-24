import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Dimensions
  } from 'react-native';
import { withNavigation } from 'react-navigation'
import { TabView, SceneMap } from 'react-native-tab-view';

import ListItem from '../components/ListItem';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen'

const FirstRoute = () => (
  <ListItem/>
);

const SecondRoute = () => (
  <SavedScreen/>
);


class HomeContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  state = {
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
    };


  render () {
      return (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <ProfileScreen/>
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                first: FirstRoute,
                second: SecondRoute,
              })}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
            />
          </ScrollView>
        </SafeAreaView>
      )};
}
export default withNavigation(HomeContainer);
