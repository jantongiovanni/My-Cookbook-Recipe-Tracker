import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';

export default class LargeRecipeCard extends React.Component{
constructor(props){
    super(props);
}

state = {
};

render() {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignContent:'center', marginBottom: 10}}>
        <PlayfairText style={{color:'black', fontSize: 46, marginHorizontal: 20, alignSelf:'flex-start'}}>Featured Recipe</PlayfairText>
      </View>
      <TouchableScale
        style={styles.card}
        activeScale={0.95}
        tension={150}
        friction={7}
        useNativeDriver
        activeOpacity={1}
        //onPress={() => this.onPressCreate()}
      >
        <Image
            source={require('../assets/images/Italian-Sausage-Poutine.jpg')}
            style={{flex:2,  width: undefined, height: undefined, marginBottom: Platform.select({ ios: 0, android: 1 }),}}
            resizeMode="cover"
        />
        <View style={{flex:1, justifyContent: 'center'}}>
          <PlayfairText style={{color:'black', fontSize: 24, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>An Extrememly Detailed Recipe</PlayfairText>
          <RobotoText style={{fontSize: 20, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >by Joe Antongiovanni</RobotoText>
        </View>
      </TouchableScale>
    </View>
  )
};
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal:20,
    flex:1,
    height: 260,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection:'column',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 11.95,
    elevation: 18,
    zIndex: 999
    },
});
