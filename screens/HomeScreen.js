import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  TextInput,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import Swiper from 'react-native-swiper'
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import { withNavigation } from 'react-navigation';
const { width: screenWidth } = Dimensions.get('window')
const { height: screenHeight} = Dimensions.get('window')


export class MyDetailButton extends React.Component {
  render () {
    return <Button title="Read More" onPress={()=>this.props.navigation.navigate('Detail')}/>
  }
}

export class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            carouselItems: [
            {
                title:"Italian Sausage Poutine",
                prep:"30 minutes",
                image: require('../assets/images/Italian-Sausage-Poutine.jpg')
            },
            {
                title:"Garlic-Herb Chicken",
                prep:"25 minutes",
                image: require('../assets/images/chicken.jpg')
            },
            {
                title:"Curried Lamb Tacos",
                prep:"35 minutes",
                image: require('../assets/images/lamb.jpg')
            },
            {
                title:"Seared Steak",
                prep:"30 minutes",
                image: require('../assets/images/steak.jpg')
            },
            {
                title:"Sesame Chicken",
                prep:"25 minutes",
                image: require('../assets/images/sesame.jpg')
            }
        ]}
    }

    _renderItem({item,index}){
        return (
            <View style={{flex:1, maxHeight: 120, backgroundColor: 'white', flexDirection:'row'}}>
                <Image
                    source={item.image} style={{flex:2,  width: undefined, height: undefined}}
                    resizeMode="cover"/>
              <View style={{flex:3, justifyContent: 'center'}}>
                <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>{item.title}</PlayfairText>
                <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >{item.prep}</RobotoText>
                <MyDetailButton/>
              </View>
            </View>
        )
    }

    render() {
        return (
        <SafeAreaView style={styles.container}>
            <Carousel
                    data={this.state.carouselItems}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 60}
                    renderItem={this._renderItem}
                />
        </SafeAreaView>
        );
    }
}

export class FlatListBasics extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
        //TODO: fix title/key inconsistency for data type
        //faltlist requires key to index correctly so changed title to key
          ListHeaderComponent = {
            <PlayfairText style={{color:'black', fontSize: 46, paddingBottom:16, paddingLeft: 10, alignSelf:'flex-start'}}>Your Recipes</PlayfairText>
          }

          data={[
            {
                key:"Italian Sausage Poutine",
                prep:"30 minutes",
                image: require('../assets/images/Italian-Sausage-Poutine.jpg')
            },
            {
                key:"Garlic-Herb Chicken",
                prep:"25 minutes",
                image: require('../assets/images/chicken.jpg')
            },
            {
                key:"Curried Lamb Tacos",
                prep:"35 minutes",
                image: require('../assets/images/lamb.jpg')
            },
            {
                key:"Seared Steak",
                prep:"30 minutes",
                image: require('../assets/images/steak.jpg')
            },
            {
                key:"Sesame Chicken",
                prep:"25 minutes",
                image: require('../assets/images/sesame.jpg')
            },
            {
                key:"Curried Lamb Tacos 2",
                prep:"35 minutes",
                image: require('../assets/images/lamb.jpg')
            },
            {
                key:"Seared Steak 2",
                prep:"30 minutes",
                image: require('../assets/images/steak.jpg')
            },
            {
                key:"Sesame Chicken 2",
                prep:"25 minutes",
                image: require('../assets/images/sesame.jpg')
            },
          ]}
          renderItem={({item, index}) =>
          //<Text style={styles.item}>{item.key}</Text>
          <View style={{height: 100, marginBottom: 16, marginLeft:10, marginRight:10, backgroundColor: 'white', flexDirection:'row'}}>
              <Image
                  source={item.image} style={{flex:2,  width: undefined, height: undefined}}
                  resizeMode="cover"/>
            <View style={{flex:4, justifyContent: 'center'}}>
              <PlayfairText style={{color:'black', fontSize: 20, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>{item.key}</PlayfairText>
              <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >{item.prep}</RobotoText>
            </View>
          </View>
        }
        />
      </View>
    );
  }
}

export default function HomeScreen() {
  const homeOffset = [screenHeight];

  return (
 <ScrollView
        decelerationRate= {"normal"}
        snapToOffsets = {homeOffset}
        snapToEnd = {false}
        snapToStart = {false}
        >
    <Swiper
      containerStyle={{ width: screenWidth, height: screenHeight }}
      showsButtons={false}
      horizontal={true}
      index={0}
      loop={false}
      showsPagination={false}
      >
      <View style={styles.container}>
        <Video
              //source={{ uri: 'https://gcs-vimeo.akamaized.net/exp=1566428998~acl=%2A%2F820068298.mp4%2A~hmac=bcbc5bdbb796ba22d60bbc8b7fb7cf5fbd9581f0503f2c967e114cf1a29900d9/vimeo-prod-skyfire-std-us/01/1351/9/231758986/820068298.mp4' }}
              source={require('../assets/videos/Chinese.mp4')}
              rate={1.0}
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
            right: 0, backgroundColor: 'rgba(52, 52, 52, 0.15)'
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
              <RobotoText style={{fontSize: 16, color: 'white', fontWeight:'400',paddingBottom: 20}}>This is a classic, healthy Asian dish that is quick and easy to make! </RobotoText>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> Read More </Text>
              </TouchableOpacity>
          </View>
          <App/>
        </View>
      </View>
      <View style={styles.container}>
        <FlatListBasics/>
      </View>
    </Swiper>
    <View style={styles.container}>
      <FlatListBasics/>
    </View>
  </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
    flex: 3,
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
