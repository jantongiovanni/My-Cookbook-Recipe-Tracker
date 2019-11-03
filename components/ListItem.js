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
import {recipes, fullRecipes} from '../data/DataArray';
import {getRecipes} from '../data/MockDataAPI';

//Access Firebase data
import {db} from '../constants/firebase';
const itemArr = [];

const itemsRef = db.collection('recipes').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        console.log("photo url: " + data.photo_url);
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});
console.log("itemsRef Object: " + itemsRef);
//console.log("itemsRef Json: " + toJson(), itemsRef);


class ListItem extends Component {

  state =

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
      //const recipesArray = getRecipes();

      // const itemsRef = Object.values(db.collection('recipes').get().then(function(querySnapshot) {
      //     querySnapshot.forEach(function(doc) {
      //         // doc.data() is never undefined for query doc snapshots
      //         //console.log(doc.id, " => ", doc.data());
      //         //const mydata = doc.data();
      //         //console.log("photo url: " + doc.data().photo_url);
      //         //const dataArr = Object.values(mydata);
      //         //console.log("dataArr " + dataArr);
      //         //
      //         itemArr.push({
      //           recipeId: doc.id,
      //           title: doc.data().title,
      //           photo_url: doc.data().photo_url,
      //           time: doc.data().time,
      //           ingredients: doc.data().ingredients,
      //           description: doc.data().description,
      //           notes: doc.data().notes,
      //           instructions: doc.data().instructions,
      //           makes: doc.data().makes,
      //         });
      //
      //         console.log("const: " + itemArr);
      //     });
      // })
      // .catch(function(error) {
      //     console.log("Error getting documents: ", error);
      // }));

      console.log("render: " + itemArr);
        return (
          <View style={{flex: 1, paddingTop: 12,}}>
            <FlatList
              ListHeaderComponent = {
                <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingLeft: 10, alignSelf:'flex-start'}}>Your Recipes</PlayfairText>
              }

              data={ itemArr }
              renderItem={this.renderRecipes}
            />
          </View>
        )
    }
}
export default withNavigation(ListItem)
console.disableYellowBox = true;
