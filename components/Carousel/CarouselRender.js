import React from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from '../Carousel/CarouselItem';
import {recipes} from '../../data/DataArray';
import { PlayfairText } from '../../components/StyledText';

const { width: screenWidth } = Dimensions.get('window')
//const { height: screenHeight} = Dimensions.get('window')

export default class CarouselRender extends React.Component {
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
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.5,
          shadowRadius: 11.95,
          elevation: 18,
          zIndex: 999,
          paddingTop: 20,
          paddingBottom: 8,
          paddingHorizontal: 20

        }}>
          <View style={{flex: 1, alignContent:'center', paddingBottom: 10}}>
            <PlayfairText style={{color:'black', fontSize: 28, alignSelf:'flex-start'}}>Explore new recipes</PlayfairText>
          </View>
            <Carousel
                    data={recipes}
                    useScrollView={false}
                    useNativeDriver
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 60}
                    itemHeight={100}
                    renderItem={this._renderItem}
                    enableMomentum={true}
                    containerCustomStyle={{overflow: 'visible'}}
                    activeSlideAlignment={'start'}
                    removeClippedSubviews={true}
                />
        </View>
        );
    }
}
