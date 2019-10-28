import React, { Component } from 'react';
import {
  LayoutAnimation,
  UIManager,
  Platform,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation'
import {recipes, fullRecipes} from '../data/DataArray';
import {getRecipes} from '../data/MockDataAPI';

class ListItem extends Component {

  onPressRecipe = item => {
    this.props.navigation.navigate('Details', {item});
  };

  renderRecipes = ({item}) => (
    <TouchableScale
      style={{height: 100, marginBottom: 16, marginLeft:10, marginRight:10, backgroundColor: 'white', flexDirection:'row'}}
      activeScale={0.95}
      tension={150}
      friction={7}
      useNativeDriver
      onPress={() => this.onPressRecipe(item)}
    >
      <Image
        source={{uri: item.photo_url}} style={{flex:2,  width: undefined, height: undefined}}
        resizeMode="cover"/>
      <View style={{flex:4, justifyContent: 'center'}}>
        <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>{item.title}</PlayfairText>
        <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >{item.time} minutes</RobotoText>
      </View>
    </TouchableScale>
  );

    render () {
        const recipesArray = getRecipes();
        console.log(recipesArray);
        return (
          <View style={{flex: 1, paddingTop: 12,}}>
            <FlatList
              ListHeaderComponent = {
                <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingLeft: 10, alignSelf:'flex-start'}}>Your Recipes</PlayfairText>
              }

              data={ recipesArray }
              renderItem={this.renderRecipes}
              keyExractor={item => `${item.recipeId}`}
            />
          </View>
        )
    }
}
export default withNavigation(ListItem)
console.disableYellowBox = true;
