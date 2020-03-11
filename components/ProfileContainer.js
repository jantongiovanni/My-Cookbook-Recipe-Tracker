import React, { Component } from 'react';
import {
  ScrollView,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  } from 'react-native';
import { withNavigation } from 'react-navigation'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
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

renderTabBar(props) {
  return (
  <TabBar
    style={{backgroundColor: '#f7f7f7', elevation: 10, borderColor: '#000000', borderBottomWidth: 0, height:50}}
    labelStyle={{color: 'black', fontSize: 14, fontWeight: 'normal'}}
    {...props}
    indicatorStyle={{backgroundColor: 'black', height: 2}}
  />
  );
}

render () {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor:'#f7f7f7'}}>
        <ScrollView style={{flex: 1, backgroundColor:'#f7f7f7'}} contentContainerStyle={{flexGrow:1}}>
          <ProfileScreen/>
          <TabView
            lazy
            navigationState={this.state}
            renderTabBar={this.renderTabBar}
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{
              width: Dimensions.get('window').width,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    )};
}
export default withNavigation(HomeContainer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
