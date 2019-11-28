import React from 'react';
import { View, Dimensions } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from 'rn-placeholder';
import { PlayfairText } from '../../components/StyledText';

const { width: screenWidth } = Dimensions.get('window')

const DetailPlaceholderComponent = () => (
  <View>
    <View
      style={{
          height: screenWidth,
          width: screenWidth,
          backgroundColor: "white"
      }}>
    </View>

    <Placeholder
      style={{margin:20}}
      Animation={ShineOverlay}
    >
      <PlaceholderLine width={screenWidth-20} height={40} />
    </Placeholder>
    <Placeholder
      style={{height: 100, margin:20, backgroundColor: 'white'}}
      Animation={ShineOverlay}>
      <PlaceholderLine width={80} />
      <PlaceholderLine width={30} />
    </Placeholder>
    <Placeholder
      style={{height: 100, margin:20, backgroundColor: 'white'}}
      Animation={ShineOverlay}>
      <PlaceholderLine width={80} />
      <PlaceholderLine />
      <PlaceholderLine width={30} />
    </Placeholder>
    <Placeholder
      style={{height: 100, margin:20, backgroundColor: 'white'}}
      Animation={ShineOverlay}>
      <PlaceholderLine width={80} />
      <PlaceholderLine />
      <PlaceholderLine width={30} />
    </Placeholder>
    <Placeholder
      style={{height: 100, margin:20, backgroundColor: 'white'}}
      Animation={ShineOverlay}>
      <PlaceholderLine width={80} />
      <PlaceholderLine />
      <PlaceholderLine width={30} />
    </Placeholder>
  </View>
);

export default DetailPlaceholderComponent;
