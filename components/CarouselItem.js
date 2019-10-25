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

class CarouselItem extends Component {


    render () {

        const { data: { title, prep, image}, navigation } = this.props;    //<------
        // console.log(title);
        // console.log(this.props.navigation.navigate);
        return (
          <TouchableOpacity
            style={{flex:1, maxHeight: 120, backgroundColor: 'white', flexDirection:'row'}}
            onPress={() =>
            navigation.navigate('Details', {
                itemId: 1,
                otherParam: 'carousel test',
              })
            }>
                <Image
                    source={image} style={{flex:2,  width: undefined, height: undefined}}
                    resizeMode="cover"/>
              <View style={{flex:3, justifyContent: 'center'}}>
                <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>{title}</PlayfairText>
                <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >{prep}</RobotoText>
              </View>
          </TouchableOpacity>

        )
    }
}
export default withNavigation(CarouselItem)
