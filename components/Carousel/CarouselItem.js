import React, { Component } from 'react';
import {
  Image,
  View,
  Platform
} from 'react-native';
import { PlayfairText } from '../../components/StyledText';
import { RobotoText } from '../../components/StyledText';
import { withNavigation } from 'react-navigation'
import TouchableScale from 'react-native-touchable-scale';

class CarouselItem extends Component {

    render () {
        const { data: { title, prep, image}, navigation } = this.props;
        return (
            <TouchableScale
              style={{flex:1, height:100, backgroundColor: 'white', flexDirection:'row'}}
              activeScale={0.95}
              tension={150}
              friction={7}
              useNativeDriver
              activeOpacity={1}
              initialScrollIndex={0}
              // onPress={() =>
              // navigation.navigate('Details', {
              //     itemId: 1,
              //     otherParam: "test",
              //     title: title,
              //     image: image,
              //   })
              // }
              >
                  <Image
                      source={image} style={{flex:2,  width: undefined, height: undefined, marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  }}
                      resizeMode="cover"/>
                <View style={{flex:3, justifyContent: 'center'}}>
                  <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>{title}</PlayfairText>
                  <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >{prep}</RobotoText>
                </View>
            </TouchableScale>
        )
    }
}
export default withNavigation(CarouselItem)
