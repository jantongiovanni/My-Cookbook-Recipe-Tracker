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


    <View style={{flex: 1, flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
      <View style={{flexDirection:'column'}}>
        <PlayfairText style={styles.numberText}>{item.id}</PlayfairText>
      </View>
      <View style={{flexDirection:'column', paddingLeft: 20}}>
        <RobotoText style={styles.contentText}>{item.in}</RobotoText>
      </View>
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
          <Image source={{uri: item.photo_url}}
          style={styles.topImage}
          resizeMode="cover"
          PlaceholderContent={<ActivityIndicator />}/>
        <View style={styles.container}>
          <PlayfairText style={styles.titleTextLarge}>{item.title}</PlayfairText>

          <View style={{flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
            <View style={{flexDirection:'column'}}>
              <RobotoText style={styles.contentText}>Time:</RobotoText>
              <PlayfairText style={styles.titleTextMin}>45 min</PlayfairText>
            </View>
            <View style={{flexDirection:'column', paddingLeft: 20}}>
              <RobotoText style={styles.contentText}>Makes:</RobotoText>
              <PlayfairText style={styles.titleTextMin}>4 servings</PlayfairText>
            </View>
          </View>

          <View style={styles.line}/>

          <PlayfairText style={styles.subtitleText}>Description</PlayfairText>
          <RobotoText style={styles.contentText}>{item.description}</RobotoText>

          <View style={styles.line}/>

          <FlatList
          ListHeaderComponent = {
            <PlayfairText style={styles.subtitleText}>Ingredients</PlayfairText>
          }
          data={item.ingredients}
          renderItem={this.renderIngredients}
          keyExractor{...item.ingredients.id}
          />

          <View style={styles.line}/>

          <FlatList
          ListHeaderComponent = {
            <PlayfairText style={styles.subtitleText}>Directions</PlayfairText>
          }
          data={item.instructions}
          renderItem={this.renderInstructions}
          keyExractor{...item.instructions.id}
          />
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topImage:{
    flex:1,
    width: screenWidth,
    height: screenWidth,
    alignSelf: 'flex-start'
  },

  titleTextLarge:{
    fontSize: 50,
    color: 'black',
    paddingLeft: 20,
    paddingTop: 14,
  },
  subtitleText:{
    fontSize: 36,
    color: 'black',
    paddingBottom: 14,
    paddingLeft: 20,
  },
  titleTextMin:{
    fontSize: 24,
    color: 'black',
    paddingLeft: 20,
    fontWeight: '100',
  },
  numberText:{
    fontSize: 36,
    color: '#f6b425',
    paddingTop: 16,
    paddingLeft: 20,

  },
  contentText:{
    fontSize: 20,
    color: 'black',
    fontWeight:'400',
    paddingTop: 20,
    paddingLeft: 10,
    marginRight:20,
  },
  line:{
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    paddingTop: 36,
    marginBottom: 30,
    marginLeft: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
