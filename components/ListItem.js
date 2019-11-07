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
//import {recipes, fullRecipes} from '../data/DataArray';
//import {getRecipes} from '../data/MockDataAPI';

//Access Firebase data
import {db} from '../constants/firebase';
//https://levelup.gitconnected.com/react-native-firebase-cloud-firestore-implementing-infinite-scroll-lazy-loading-with-flatlist-a9e942cf66c6

class ListItem extends Component {

  state = {
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
};

retrieveData = async () => {
    console.log("Retrieving Data");
    try{
      const initialQuery = await db.collection('recipes');
      //console.log("Initial Query: " + initialQuery);
      const docSnapshot = await initialQuery.get();
      //console.log("Doc snapshot " + docSnapshot);
      const documentData = docSnapshot.docs.map(document => document.data());
      //console.log("doc data: " +  documentData);
      //const lastItem = documentData[0].title;
      //console.log("last item: " +  lastItem);
      this.setState({
        itemArr: documentData
      })
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
      <Image
        source={{uri: item.photo_url}} style={{flex:2,  width: undefined, height: undefined}}
        resizeMode="cover"/>
      <View style={{flex:4, justifyContent: 'center'}}>
        <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>{item.title}</PlayfairText>
        <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >{item.time}</RobotoText>
      </View>
    </TouchableScale>
  );

    render () {
        return (
          <View style={{flex: 1, paddingTop: 12,}}>
            <FlatList
              ListHeaderComponent = {
                <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingLeft: 10, alignSelf:'flex-start'}}>Your Recipes</PlayfairText>
              }

              data={ this.state.itemArr }
              renderItem={this.renderRecipes}
            />
          </View>
        )
    }
}
export default withNavigation(ListItem)
console.disableYellowBox = true;
