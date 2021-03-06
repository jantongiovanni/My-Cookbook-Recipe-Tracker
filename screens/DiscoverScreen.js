import React, { Component } from 'react';
import {
  Image,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet
  } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import { withNavigation, FlatList } from 'react-navigation'

import DiscoverPlaceholderComponent from '../components/Placeholders/DiscoverPlaceholder';
//import {recipes, fullRecipes} from '../data/DataArray';
//import {getRecipes} from '../data/MockDataAPI';

//Access Firebase data
import {db} from '../constants/firebase';
import firebase from 'firebase';

export const tapOnTabNavigator = () => {
    console.log("function tapOnTabNavigator hit");
    this.refs._discoverFlatList.scrollToIndex({index: 0, animated: true});
};


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
// console.log(screenWidth); 411.42
// console.log(screenHeight); 683.42

class DiscoverScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,

  });
  //limitation of firestore queries makes != operations impossile.
  //necessary to split into seperate queries and combine on the client side
  state = {
    isDataFetched1: false,
    itemArr: [],
  }

  componentDidMount = () => {
  // this.props.navigation.setParams({
  //   tapOnTabNavigator: this._tapOnTabNavigator
  // });
  try {
    // Cloud Firestore: Initial Query
    this.retrieveData();
  }
  catch (error) {
    console.log(error);
  }
};

_tapOnTabNavigator = () => {
    console.log("function _tapOnTabNavigator hit");
    this.refs._discoverFlatList.scrollToIndex({index: 0, animated: true});
};

retrieveData = async () => {
    console.log("Retrieving Discover Data");
    try{
      var user = firebase.auth().currentUser.uid;
      console.log("discover user: " + user);
      const initialQuery = await db.collection("small_recipe").where("isPublic", "==", true).orderBy("createdAt", "desc");
      await initialQuery.onSnapshot( snapshot => {
      this.setState({ itemArr : snapshot.docs.map(document => document.data()), isDataFetched1: true});
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
  <View style={{
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 10,
    marginHorizontal: 16
  }}>
  <TouchableWithoutFeedback
    style={{height: screenWidth+40, marginBottom: 16, backgroundColor: 'white', flexDirection:'column'}}
    onPress={() => this.onPressRecipe(item)}
  >
  <View>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginBottom: 10}}>
      {item.hasOwnProperty("profile_picture") &&
        <Image
          source={{ uri: item.profile_picture}}
          style={{width: 30, height: 30, borderRadius: 15, marginRight: 10}}
        />
      }
      {item.hasOwnProperty("name") &&
        <RobotoText style={styles.largeText}>
          {item.name}
        </RobotoText>
      }
    </View>
    {item.hasOwnProperty("image") &&
      <Image
        source={{uri: item.image}} style={{width: screenWidth-32, height: screenWidth-32, marginBottom: 10}}
        resizeMode="cover"/>
    }
    <View style={{ justifyContent: 'flex-start'}}>

      <PlayfairText style={{color:'black', fontSize: 30, marginBottom:10, alignSelf:'flex-start'}}>{item.title}</PlayfairText>

      <View style={{flexDirection:'row', alignItems: 'flex-start', flexWrap:'wrap'}}>
        {item.hasOwnProperty("time") &&
          <View style={{flexDirection:'column'}}>
            <RobotoText style={styles.contentText}>Time:</RobotoText>
            <PlayfairText style={styles.titleTextMin}>{item.time}</PlayfairText>
          </View>
        }
        {item.hasOwnProperty("makes") &&
          <View style={{flexDirection:'column'}}>
            <RobotoText style={styles.contentText}>Makes:</RobotoText>
            <PlayfairText style={styles.titleTextMin}>{item.makes}</PlayfairText>
          </View>
        }
      </View>

      {item.hasOwnProperty("description") ? (
      <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', marginVertical: 10, alignSelf:'flex-start'}} >{item.description}</RobotoText>
      ) : (
        <View style={{marginBottom: 0}} />
      )}
    </View>
    </View>
  </TouchableWithoutFeedback>
</View>
);

render () {
  const {isDataFetched1} = this.state;
    return (
      <View style={{flex: 1, paddingTop: 20, backgroundColor: '#f7f7f7'}}>
      {isDataFetched1 ? (
        <FlatList  ref='_discoverFlatList'
          ListHeaderComponent = {
            <PlayfairText style={{color:'black', fontSize: 54, marginVertical:20, alignSelf:'center'}}>My Cookbook</PlayfairText>
          }

          data={ this.state.itemArr }
          renderItem={this.renderRecipes}
          keyExtractor={(item, index) => index.toString()}
        />
        ) : (
          <DiscoverPlaceholderComponent title='Discover'/>
        )}
      </View>
    )
}
}
export default withNavigation(DiscoverScreen)

const styles = StyleSheet.create({
  titleTextMin:{
    fontSize: 24,
    color: 'black',
    paddingRight: 20,
    fontWeight: '100',
    marginBottom: 10
  },
  contentText:{
    fontSize: 20,
    color: 'black',
    fontWeight:'400',
    paddingTop: 10,
    marginRight:20,
    paddingRight: 20,
  },
  largeText : {
    fontSize: 14,
    color: 'black',
    fontWeight:'bold',
  }
});
