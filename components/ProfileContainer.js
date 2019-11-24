import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity
  } from 'react-native';
import { withNavigation } from 'react-navigation'
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

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
        { key: 'first', title: 'Your Recipes' },
        { key: 'second', title: 'Saved' },
      ],
    };

  _renderTabBar = props => {
  const inputRange = props.navigationState.routes.map((x, i) => i);

  return (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route, i) => {
        const color = Animated.color(
          Animated.round(
            Animated.interpolate(props.position, {
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === i ? 255 : 0
              ),
            })
          ),
          0,
          0
        );

        return (
          <TouchableOpacity
            key={i}
            style={styles.tabItem}
            onPress={() => this.setState({ index: i })}>
            <Animated.Text style={{ color }}>{route.title}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


  render () {
      return (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <ProfileScreen/>
            <TabView
              navigationState={this.state}
              renderTabBar={this._renderTabBar}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
