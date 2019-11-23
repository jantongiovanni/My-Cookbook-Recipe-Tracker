import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {FontAwesome5} from '@expo/vector-icons';

//import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CreateRecipe from '../screens/CreateRecipeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ListItem from '../components/ListItem';

//import {springyFadeIn} from '../transitions/springyFadeIn';

// const RootStack = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Details: DetailScreen,
//     Create: CreateRecipe,
//   },
//   {
//     initialRouteName: 'Home',
//     /* The header config from HomeScreen is now here */
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#f6b425',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     },
//   },
//   {
//     transitionConfig: () => springyFadeIn(),
//   }
// );

const TabNav = createBottomTabNavigator(
  {
    Discover:{
      screen: DiscoverScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="home" size={24} color="#CDCCCE" />
      }
    },
    Create:{
      screen: CreateRecipe,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="plus" size={24} color="#CDCCCE" />
      }
    },
    Recipes:{
      screen: ListItem,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="user" size={24} color="#CDCCCE" />
      }
    },

  },
  {
      tabBarOptions: {
        showLabel: false
      }
  }
)


const AuthSwitchNav = createSwitchNavigator ({
  Loading: LoadingScreen,
  Login: LoginScreen,
})

const AppSwitchNav = createSwitchNavigator ({
  Auth: AuthSwitchNav,
  App : TabNav
})

const AppContainer = createAppContainer(AppSwitchNav);

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <AppContainer />
      </View>
    );
  }
}
