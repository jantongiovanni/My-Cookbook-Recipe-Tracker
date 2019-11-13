import React from 'react';
import {
  Platform,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import Swiper from 'react-native-swiper'
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import CarouselItem from '../components/CarouselItem';
import ListItem from '../components/ListItem';
import NewRecipe from '../screens/NewRecipeScreen';
import GyroImage from '../components/GyroImage';
import {recipes} from '../data/DataArray';

const { width: screenWidth } = Dimensions.get('window')
const { height: screenHeight} = Dimensions.get('window')

//Access Firebase data
// import {db} from '../constants/firebase';
// const itemsRef = db.collection('recipes').get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//         const data = doc.data();
//         console.log("photo url: " + data.photo_url);
//     });
// })
// .catch(function(error) {
//     console.log("Error getting documents: ", error);
// });


export class App extends React.Component {
    constructor(props){
        super(props);
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
        <SafeAreaView style={styles.container}>
            <Carousel
                    data={recipes}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 60}
                    renderItem={this._renderItem}
                />
        </SafeAreaView>
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

render(){
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
        loadMinimal={true}
      >
        <View style={styles.container}>
        {/*  <Video
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
*/}
          <GyroImage />
            <View style={{ position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0, backgroundColor: 'rgba(52, 52, 52, 0.15)'}}>
            </View>
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
            <App/>
          </View>
        </View>
        <View style={styles.container}>
        {/*  right swipe screen */}
        <NewRecipe/>
        </View>
      </Swiper>
      <View style={styles.container}>
        {/* swipe down */}
        <ListItem/>
      </View>
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
