import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { withNavigation } from 'react-navigation'
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';

class NewRecipe extends Component {

  onPressCreate = () => {
    this.props.navigation.navigate('Create');
  };

  render() {
    return(
      <SafeAreaView style={styles.container}>
      <View>
        <PlayfairText style={styles.titleTextLarge}>Add a new recipe</PlayfairText>
      </View>
        <TouchableScale
          style={styles.card}
          activeScale={0.95}
          tension={150}
          friction={7}
          useNativeDriver
          activeOpacity={1}
          onPress={() => this.onPressCreate()}
        >
              <Image
                  source={require('../assets/images/addPhoto.png')} style={{flex:2,  width: undefined, height: undefined}}
                  resizeMode="center"/>
            <View style={{flex:3, justifyContent: 'center'}}>
              <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>Basic Photo Recipe</PlayfairText>
              <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >title(r), photos(r), desc(o), notes(o)</RobotoText>
            </View>
        </TouchableScale>

        <TouchableScale
          style={styles.card}
          activeScale={0.95}
          tension={150}
          friction={7}
          useNativeDriver
          activeOpacity={1}
          onPress={() => this.onPressCreate()}
        >
              <Image
                  source={require('../assets/images/addRecipe.png')} style={{flex:2,  width: undefined, height: undefined}}
                  resizeMode="center"/>
            <View style={{flex:3, justifyContent: 'center'}}>
              <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>Detailed Recipe</PlayfairText>
              <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >title(r), photo(o),  desc(o), notes(o), ingredients(r), steps(r)</RobotoText>
            </View>
        </TouchableScale>
        <View></View>
      </SafeAreaView>
    )
  }
}

export default withNavigation(NewRecipe)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    justifyContent: 'space-around',
  },
  titleTextLarge:{
    alignSelf: 'center',
    fontSize: 46,
    color: 'black',
    paddingBottom: 14
  },
  card:{
    marginHorizontal:20,
    flex:1,
    maxHeight: 120,
    backgroundColor: 'white',
    flexDirection:'row',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
      },
});
