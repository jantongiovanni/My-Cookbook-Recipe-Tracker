import React from 'react';
import { SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {FontAwesome5} from '@expo/vector-icons';

//import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CreateRecipe from '../screens/CreateRecipeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileContainer from '../components/ProfileContainer';
//import ListItem from '../components/ListItem';
//import AddButton from '../components/AddButton';
import HomeContainer from '../components/HomeContainer';
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

const DiscoverStack = createStackNavigator(
  {
      Discover: {screen: HomeContainer},
      Details: {screen: DetailScreen}
  }
);

const RecipeStack = createStackNavigator(
  {
      Recipes: {screen: ProfileContainer},
      Details: {screen: DetailScreen}
  }
);

const TabNav = createBottomTabNavigator(
  {
    Discover:{
      screen: DiscoverStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <FontAwesome5 name="home" size={24} color={tintColor} />
    }
  },

    Add: {
      screen: CreateRecipe,
      navigationOptions: {
          tabBarIcon: () => <FontAwesome5 name="plus-circle" size={40} color="#f6b425"
          style={{
            shadowColor: "#f6b425",
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 3,
            zIndex: 999
          }}/>
      }
    },
    Recipes:{
      screen: RecipeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <FontAwesome5 name="user" size={24} color={tintColor} />
      }
    },

  },
  {
      lazy: false,
      tabBarOptions: {
        showLabel: false,
        activeTintColor: "#161f3d",
        inactiveTintColor: "#b8bbc4",
      },
  },
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
      <SafeAreaView style={{flex:1}}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}
