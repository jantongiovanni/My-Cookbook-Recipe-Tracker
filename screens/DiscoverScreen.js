import React, { Component } from 'react';
import {
  Image,
  View,
  FlatList,
  } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation'

import RecipeListPlaceholderComponent from '../components/RecipeListPlaceholder';
//import {recipes, fullRecipes} from '../data/DataArray';
//import {getRecipes} from '../data/MockDataAPI';

//Access Firebase data
import {db} from '../constants/firebase';
import firebase from 'firebase';

class DiscoverScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });
  //limitation of firestore queries makes != operations impossile.
  //necessary to split into seperate queries and combine on the client side
  state = {
    isDataFetched1: false,
    isDataFetched2: false,
    itemArr: [],
    itemArr2: []
  }

  componentDidMount = () => {
  try {
    // Cloud Firestore: Initial Query
    this.retrieveData();
  }
  catch (error) {
    console.log(error);
  }
};

retrieveData = async () => {
    console.log("Retrieving Discover Data");
    try{
      var user = firebase.auth().currentUser.uid;
      console.log("discover user: " + user);
      const initialQuery = await db.collection("recipes").where("uid", "<", user).where("isPublic", "==", true);
      const secondQuery = await db.collection("recipes").where("uid", ">", user).where("isPublic", "==", true);
      await initialQuery.onSnapshot( snapshot => {
      this.setState({ itemArr : snapshot.docs.map(document => document.data()), isDataFetched1: true});
      });
      await secondQuery.onSnapshot( snapshot => {
      this.setState({ itemArr2 : snapshot.docs.map(document => document.data()), isDataFetched2: true});
      });
    }
    catch (error) {
      console.log(error);
    }
};

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
  {item.image === null ? (
    <Image
      source={require('../assets/images/icon.png')} style={{flex:2, width: undefined, height: undefined}}
      resizeMode="cover"/>
  ) : (
    <Image
      source={{uri: item.image}} style={{flex:2,  width: undefined, height: undefined}}
      resizeMode="cover"/>
  )}
    <View style={{flex:4, justifyContent: 'center'}}>
      <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>{item.title}</PlayfairText>
      <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >{item.time}</RobotoText>
    </View>
  </TouchableScale>
);

render () {
  const {isDataFetched1, isDataFetched2} = this.state;
    return (
      <View style={{flex: 1, paddingTop: 12,}}>
      {isDataFetched1 && isDataFetched2 ? (
        <FlatList
          // ListHeaderComponent = {
          //   <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingLeft: 10, alignSelf:'flex-start'}}>Discover</PlayfairText>
          // }

          data={ this.state.itemArr.concat(this.state.itemArr2) }
          renderItem={this.renderRecipes}
          keyExtractor={(item, index) => index.toString()}
        />
        ) : (
          <RecipeListPlaceholderComponent/>
        )}
      </View>
    )
}
}
export default withNavigation(DiscoverScreen)
