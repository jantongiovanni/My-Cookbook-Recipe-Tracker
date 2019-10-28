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
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation'
import {recipes} from '../data/DataArray';

import {SharedElement} from 'react-native-shared-element';
import TouchableScale from 'react-native-touchable-scale';

class ListItem extends Component {

    render () {
        //const { data: { title, prep, image}, navigation } = this.props;
        return (
          <View style={{flex: 1, paddingTop: 12,}}>
            <FlatList
            //TODO: fix title/key inconsistency for data type
            //faltlist requires key to index correctly so changed title to key
              ListHeaderComponent = {
                <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingLeft: 10, alignSelf:'flex-start'}}>Your Recipes</PlayfairText>
              }

              data={ recipes }
              renderItem={({item, index}) =>
              //<Text style={styles.item}>{item.key}</Text>
              <TouchableScale
                style={{height: 100, marginBottom: 16, marginLeft:10, marginRight:10, backgroundColor: 'white', flexDirection:'row'}}
                activeScale={0.95}
                tension={150}
                friction={7}
                useNativeDriver
                onPress={() => this.props.navigation.navigate('Details', {
                  itemId: 1,
                  otherParam: "test",
                  title: item.title,
                  image: item.image,})}
              >
                    <Image
                      source={item.image} style={{flex:2,  width: undefined, height: undefined}}
                      resizeMode="cover"/>
                <View style={{flex:4, justifyContent: 'center'}}>
                  <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>{item.title}</PlayfairText>
                  <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >{item.prep}</RobotoText>
                </View>
              </TouchableScale>
            }
            />
          </View>
        )
    }
}
export default withNavigation(ListItem)
console.disableYellowBox = true;
