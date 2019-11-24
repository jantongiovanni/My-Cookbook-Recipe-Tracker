import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView
  } from 'react-native';
  import { withNavigation } from 'react-navigation'

import CarouselRender from '../components/Carousel/CarouselRender';
import DiscoverScreen from '../screens/DiscoverScreen';
import SearchBar from '../components/SearchBar';
import LargeRecipeCard from '../components/LargeRecipeCard';
//import CarouselItem from '../components/CarouselItem';
//import Carousel from 'react-native-snap-carousel';

class HomeContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });
  render () {
      return (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <SearchBar/>
            <LargeRecipeCard/>
            <CarouselRender/>
            <DiscoverScreen/>
          </ScrollView>
        </SafeAreaView>
      )};
}
export default withNavigation(HomeContainer);
