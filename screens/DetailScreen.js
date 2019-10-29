import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';


const { width: screenWidth } = Dimensions.get('window')

export default class Detail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  renderIngredients = ({item}) => (
    <View>
      <RobotoText style={styles.contentText}>{item.in}</RobotoText>
    </View>
  );

  renderInstructions = ({item}) => (
    <View>
      <RobotoText style={styles.contentText}>{item.in}</RobotoText>
    </View>
  );

  render() {
     const { navigation } = this.props
    // const itemId = navigation.getParam('itemId', 'NO-ID');
    // const otherParam = navigation.getParam('otherParam');
    // const title = navigation.getParam('title', 'no title');
    // const image = navigation.getParam('image', '');
    // console.log(title);
    // console.log(image);

    const item = navigation.getParam('item');

    return (
      <ScrollView>
          <Image source={{uri: item.photo_url}} style={styles.topImage} resizeMode="contain" PlaceholderContent={<ActivityIndicator />}/>
        <View style={styles.container}>
          <PlayfairText style={styles.titleTextLarge}>{item.title}</PlayfairText>
          <RobotoText style={styles.contentText}>{item.description}</RobotoText>

          <FlatList
          data={item.ingredients}
          renderItem={this.renderIngredients}
          keyExractor{...item.ingredients.id}
          />

          <FlatList
          data={item.instructions}
          renderItem={this.renderInstructions}
          keyExractor{...item.instructions.id}
          />

          <Text></Text>
          <View style={{flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
            <View style={{flexDirection:'column'}}>
              <RobotoText style={styles.contentText}>Time:</RobotoText>
              <PlayfairText stlye={styles.titleTextSmall}>45 min</PlayfairText>
            </View>
            <View style={{flexDirection:'column', paddingLeft: 20}}>
              <RobotoText style={styles.contentText}>Makes:</RobotoText>
              <PlayfairText stlye={styles.titleTextSmall}>4 servings</PlayfairText>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,

  },
  topImage:{
    flex:1,
    width: screenWidth,
    height: screenWidth,
    alignSelf: 'flex-start'
  },

  titleTextLarge:{
    fontSize: 46,
    color: 'black',
    paddingBottom: 14
  },
  titleTextSmall:{
    fontSize: 36,
    color: 'black',
    paddingBottom: 14
  },
  contentText:{
    fontSize: 16,
    color: 'black',
    fontWeight:'400',
  }
});
