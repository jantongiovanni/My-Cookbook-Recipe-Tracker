import React, { PureComponent } from 'react';
import {
  Image,
  View,
  FlatList,
  } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation'

import RecipeListPlaceholderComponent from '../components/Placeholders/RecipeListPlaceholder';
import {db} from '../constants/firebase';
import firebase from 'firebase';
//https://levelup.gitconnected.com/react-native-firebase-cloud-firestore-implementing-infinite-scroll-lazy-loading-with-flatlist-a9e942cf66c6

class SavedScreen extends React.PureComponent {

  state = {
    isDataFetched: false,
    itemArr: []
  }

  componentDidMount = () => {
  try {
    // Cloud Firestore: Initial Query
    this.retrieveData();
  }
  catch (error) {
    console.log(error);
  }
  const { navigation } = this.props;
   this.focusListener = navigation.addListener('didFocus', () => {
     // The screen is focused
     // Call any action
     console.log("screen is focused")
   });
};

retrieveData = async () => {
    console.log("Retrieving Data: Saved Recipes");
    try{
      var user = firebase.auth().currentUser.uid;
      console.log("user: " + user);
      const initialQuery = await db.collection("saved_recipes").where("uid", "==", user);
      await initialQuery.onSnapshot( snapshot => {
        this.setState({ itemArr : snapshot.docs.map(document => document.data()), isDataFetched: true });
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
      style={{height: 100, marginBottom: 16, marginLeft:10, marginRight:10, backgroundColor: '#f7f7f7', flexDirection:'row'}}
      activeScale={0.95}
      tension={150}
      friction={7}
      useNativeDriver
      onPress={() => this.onPressRecipe(item)}
    >
    {!item.hasOwnProperty("image") ? (
      <Image
        source={require('../assets/images/icon.png')} style={{flex:2, width: undefined, height: undefined}}
        resizeMode="center"/>
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
      const {isDataFetched, itemArr} = this.state;
        return (
          <View style={{flex: 1, paddingTop: 12, backgroundColor: '#f7f7f7'}}>
          {isDataFetched ? (
            itemArr.length > 0 ? (
            <FlatList
              ListHeaderComponent = {
                <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingLeft: 10, alignSelf:'flex-start'}}>Saved Recipes</PlayfairText>
              }

              data={ this.state.itemArr }
              renderItem={this.renderRecipes}
              keyExtractor={(item, index) => index.toString()}
            />
            ):(
              <View style={{alignItems:'center', justifyContent:'center'}}>
              <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingHorizontal: 10, alignSelf:'flex-start'}}>This is where your saved recipes will go</PlayfairText>
              </View>
            )
          ) : (
            <RecipeListPlaceholderComponent title='Saved Recipes'/>
          )}
          </View>
        )
    }
}
export default withNavigation(SavedScreen)
console.disableYellowBox = true;
