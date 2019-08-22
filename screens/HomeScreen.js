import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  TextInput,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { Video } from 'expo-av';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
    <Video
        //../assets/videos/Chinese.mp4
        //source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        //https://gcs-vimeo.akamaized.net/exp=1566428998~acl=%2A%2F820068298.mp4%2A~hmac=bcbc5bdbb796ba22d60bbc8b7fb7cf5fbd9581f0503f2c967e114cf1a29900d9/vimeo-prod-skyfire-std-us/01/1351/9/231758986/820068298.mp4
          //source={{ uri: 'https://gcs-vimeo.akamaized.net/exp=1566428998~acl=%2A%2F820068298.mp4%2A~hmac=bcbc5bdbb796ba22d60bbc8b7fb7cf5fbd9581f0503f2c967e114cf1a29900d9/vimeo-prod-skyfire-std-us/01/1351/9/231758986/820068298.mp4' }}
          source={require('../assets/videos/Chinese.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,}}
        />
        <View style={{ position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0, backgroundColor: 'rgba(52, 52, 52, 0.2)'
        }}></View>
      <View style={styles.container}>

        <TextInput
          style={styles.textinput}
          placeholder="Enter name"
          multiline={false}
          //onChangeText={(name) => this.setState({name})}
          value={"Search Recipes"}//this.state.name}
        />
        <View style={styles.getStartedContainer}>
            <PlayfairText style={{fontSize: 46, color: 'white', paddingBottom: 14}}>Shrimp Hot Pot with Tofu</PlayfairText>
            <RobotoText style={{fontSize: 16, color: 'white', paddingBottom: 20}}>This is a classic, healthy Asian dish that is quick and easy to make! </RobotoText>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}> Read More </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

      //
      //<View style={styles.tabBarInfoContainer}>
      //   <Text style={styles.tabBarInfoText}>
      //     This is a tab bar. You can edit it in:
      //   </Text>

      //   <View
      //     style={[styles.codeHighlightContainer, styles.navigationFilename]}>
      //     <MonoText style={styles.codeHighlightText}>
      //       navigation/MainTabNavigator.js
      //     </MonoText>
      //   </View>
      // </View>


              {/*<View style={styles.welcomeContainer}>
                <Image
                  source={
                    __DEV__
                      ? require('../assets/images/robot-dev.png')
                      : require('../assets/images/robot-prod.png')
                  }
                  style={styles.welcomeImage}
                />

                // <DevelopmentModeNotice />

              </View>*/}

HomeScreen.navigationOptions = {
  header: null,
};

// state = {
//   name: 'test'
// };

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,

  },

  button: {
    alignItems: 'center',
    padding: 12,
    width: 120,
    borderRadius: 30,
    backgroundColor: "#f6b425",

  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  textinput: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: .5,
    alignItems: 'center',
    textAlign: 'center',
    color: 'lightgray',
    fontSize: 18,
  },
  getStartedContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },

  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});