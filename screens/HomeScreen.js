import React from 'react';
import {
  Platform,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import Swiper from 'react-native-swiper'
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import TouchableScale from 'react-native-touchable-scale';
import CarouselItem from '../components/CarouselItem';
import ListItem from '../components/ListItem';
import NewRecipe from '../screens/NewRecipeScreen';
import ProfileSceen from '../screens/ProfileScreen';
import DiscoverScreen from '../screens/DiscoverScreen';

import {recipes} from '../data/DataArray';

const { width: screenWidth } = Dimensions.get('window')
const { height: screenHeight} = Dimensions.get('window')

export class CarouselComponent extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
    //  fadeValue: new Animated.Value(0)
    };

    // _start = () => {
    //   console.log("start car");
    //   Animated.timing(this.state.fadeValue, {
    //     toValue: 1,
    //     delay:700,
    //     duration: 700,
    //     useNativeDriver: true
    //   }).start();
    // };
    componentDidMount() {
      //this._start();
    }

    _renderItem({item,index}){
        return (
          <CarouselItem
            data = {item}
          />
        )
    }

    render() {
        return (
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          paddingBottom: 16,
          marginLeft: 20
        }}>
            <Carousel
                    data={recipes}
                    useScrollView={false}
                    useNativeDriver
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 100}
                    renderItem={this._renderItem}
                    enableMomentum={true}
                    activeSlideAlignment={'start'}
                    removeClippedSubviews={false}
                />
        </View>
        );
    }
}


export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  header: null,
});
constructor(props) {
  super(props);
}

  state = {
  //  fadeValue: new Animated.Value(0)
  };

  // _start = () => {
  //   console.log("start");
  //   Animated.timing(this.state.fadeValue, {
  //     toValue: 1,
  //     duration: 700,
  //     useNativeDriver: true
  //   }).start();
  // };
  componentDidMount() {
    //this._start();
  }

render(){
const homeOffset = [screenHeight];
  return (
    <ScrollView stlye={{flex:1}}
     scrollEventThrottle={200}
    directionalLockEnabled={true}>
      <Swiper
        containerStyle={{  width: screenWidth, height: screenHeight }}
        index={1}
        loop={false}
        showsPagination={false}
        showsHorizontalScrollIndicator={true}
      >
      <View style={styles.container}>
        {/* swipe left */}
        <NewRecipe/>
      </View>
      <Swiper
        containerStyle={{ width: screenWidth, height: screenHeight }}
        loop={false}
        horizontal={false}
        showsPagination={false}
        index={1}
        showsVerticalScrollIndicator={true}
      >
      <View style={styles.container}>
        {/* swipe up */}
        <ProfileSceen/>
      </View>
        <SafeAreaView style={styles.container}>

            {/* <Image
            source={require('../assets/images/Italian-Sausage-Poutine.jpg')}
            resizeMode="contain"
            fadeDuration={0}
            //source={require('../assets/videos/Chinese.mp4')}
            style={{ position: 'absolute',
            top: 0,
            left: -150,
            bottom: 0,
            right: 0,}}
          />
            <View style={{ position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0, backgroundColor: 'rgba(52, 52, 52, 0.15)'}}>
            </View>
            */}
          <View style={{    flex: 1,
              paddingTop: 12,
              justifyContent: 'space-around',
              flexDirection: 'column',
            }}>
            <TextInput
              style={styles.textinput}
              placeholder="Enter name"
              multiline={false}
              //onChangeText={(name) => this.setState({name})}
              value={"Search Recipes"}//this.state.name}
            />
            <View style={{flex: 1, alignContent:'center'}}>
              <PlayfairText style={{color:'black', fontSize: 46, marginHorizontal: 20, paddingTop: 10, alignSelf:'flex-start'}}>Featured Recipe</PlayfairText>
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
                      source={require('../assets/images/Italian-Sausage-Poutine.jpg')} style={{flex:2, overflow:'hidden',
                      width: undefined, height: undefined}}
                      resizeMode="cover"/>
                  <View style={{flex:1, justifyContent: 'center'}}>
                    <PlayfairText style={{color:'black', fontSize: 24, paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}}>An Extrememly Detailed Recipe</PlayfairText>
                    <RobotoText style={{fontSize: 20, color: 'black', fontWeight:'400', paddingBottom:10, paddingLeft: 10, alignSelf:'flex-start'}} >by Joe Antongiovanni</RobotoText>
                  </View>
            </TouchableScale>
            <View style={{flex: 1, alignContent:'center'}}>
              <PlayfairText style={{color:'black', fontSize: 28, marginHorizontal: 20, paddingTop:30, alignSelf:'flex-start'}}>Explore new recipes</PlayfairText>
            </View>
          {/*  <View style={{
              flex: 3,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 20,
              margin: 30,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'white',
              overflow: 'hidden',
              shadowColor: "#000",
              shadowOffset: {
              	width: 0,
              	height: 2.5,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.00,

              elevation: 5,
            }}>
              <PlayfairText style={{fontSize: 46, color: 'black', paddingBottom: 14}}>Shrimp Hot Pot with Tofu</PlayfairText>
              <RobotoText style={{fontSize: 16, color: 'black', fontWeight:'400',paddingBottom: 20}}>This is a classic, healthy Asian dish that is quick and easy to make! </RobotoText>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('Details', {
                    itemId: 1,
                    otherParam: 'test param',
                  });
                }}>
                <Text style={styles.buttonText}> Read More </Text>
              </TouchableOpacity>
            </View>
            */}
            <CarouselComponent/>
          </View>
        </SafeAreaView>
        <View style={styles.container}>
          {/* swipe down */}
          <ListItem/>
        </View>
      </Swiper>
      <View style={styles.container}>
      {/*  right swipe screen */}
      <DiscoverScreen/>
      </View>
    </Swiper>
    </ScrollView>
  );
}
};

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
  card:{
    marginHorizontal:20,
    overflow:'hidden',
    flex:3,
    maxHeight: 300,
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
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  getStartedContainer: {},
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
