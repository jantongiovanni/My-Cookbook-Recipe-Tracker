import React from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { PlayfairText } from '../../components/StyledText';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const DiscoverPlaceholderComponent = ({title}) => (
<View style={{flex:1}}>
  <ScrollView>
      <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingLeft: 10, alignSelf:'flex-start'}}>{title}</PlayfairText>

      <Placeholder
        style={{height: screenWidth+40, marginHorizontal:16, marginBottom: 16, backgroundColor: '#f7f7f7'}}
        Animation={Fade}>
        <PlaceholderMedia size={screenWidth-32} style={{marginBottom:16}}/>
        <PlaceholderLine width={80} />
        <PlaceholderLine width={30} />
        <PlaceholderLine width={80} />
      </Placeholder>
      <Placeholder
        style={{height: screenWidth+40, marginHorizontal:16, marginBottom: 16, backgroundColor: '#f7f7f7'}}
        Animation={Fade}>
        <PlaceholderMedia size={screenWidth-32} style={{marginBottom:16}}/>
        <PlaceholderLine width={80} />
        <PlaceholderLine width={30} />
        <PlaceholderLine width={80} />
      </Placeholder>
    </ScrollView>
  </View>
);

export default DiscoverPlaceholderComponent;
