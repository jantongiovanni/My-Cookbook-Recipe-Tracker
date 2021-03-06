import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import './constants/fixTimerBug';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }


}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/icon.png')
      // require('./assets/images/robot-dev.png'),
      // require('./assets/images/Italian-Sausage-Poutine.jpg'),
      //require('../assets/videos/Chinese.mp4'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...FontAwesome5.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'playfair' : require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
      'roboto' : require('./assets/fonts/Roboto-Light.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
