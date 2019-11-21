import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createSharedElementStackNavigator, SharedElement } from 'react-navigation-shared-element';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CreateRecipe from '../screens/CreateRecipeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';

import {app} from '../constants/firebase';
import {springyFadeIn} from '../transitions/springyFadeIn';

const RootStack = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Home: HomeScreen,
    Details: DetailScreen,
    Create: CreateRecipe,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f6b425',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AuthSwitchNav = createSwitchNavigator ({
  Loading: LoadingScreen,
  Login: LoginScreen,
})

const AppSwitchNav = createSwitchNavigator ({
  Auth: AuthSwitchNav,
  App : RootStack
})

const AppContainer = createAppContainer(AppSwitchNav);

//const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
