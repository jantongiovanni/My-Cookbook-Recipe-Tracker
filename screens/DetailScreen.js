import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';

import Gallery from 'react-native-image-gallery';
import {db, storage} from '../constants/firebase';

const { width: screenWidth } = Dimensions.get('window')


export default class Detail extends React.Component {

  state = {
    count: 0
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  renderIngredients = ({item}) => {
    console.log(item);

    return (
      <View>
        <RobotoText style={styles.contentText}>{item}</RobotoText>
      </View>
    )
  }

  renderInstructions = ({item}) => {
    console.log(item);
    this.state.count++
  return (
      <View style={{flex: 1, flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
        <View style={{flexDirection:'column'}}>
          <PlayfairText style={styles.numberText}>{this.state.count}</PlayfairText>
        </View>
        <View style={{flexDirection:'column', paddingLeft: 20}}>
          <RobotoText style={styles.contentText}>{item}</RobotoText>
        </View>
      </View>
    )
  }

  onPressDelete = (item, navigation) => {
    if(item.ref === undefined){
      console.log("cannot delete item in app");
    } else {
      item.ref.delete().then(function() {
          console.log("Document successfully deleted!");
          navigation.navigate('Home');
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    }
  }

  render() {
     const { navigation } = this.props

    const item = navigation.getParam('item');

    return (
      <ScrollView>
        <Image source={{uri: item.image}}
          style={styles.topImage}
          resizeMode="cover"
          PlaceholderContent={<ActivityIndicator />}/>
          <TouchableScale
            style={styles.saveButton}
            activeScale={0.95}
            tension={150}
            friction={7}
            useNativeDriver
            activeOpacity={1}
            onPress={() => this.onPressDelete(item, navigation)}
          >
            <RobotoText style = {styles.saveButtonText} > Delete </RobotoText>
          </TouchableScale>
        <View style={styles.container}>
          <PlayfairText style={styles.titleTextLarge}>{item.title}</PlayfairText>

          <View style={{flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
            <View style={{flexDirection:'column'}}>
              <RobotoText style={styles.contentText}>Time:</RobotoText>
              <PlayfairText style={styles.titleTextMin}>{item.time}</PlayfairText>
            </View>
            <View style={{flexDirection:'column', paddingLeft: 20}}>
              <RobotoText style={styles.contentText}>Makes:</RobotoText>
              <PlayfairText style={styles.titleTextMin}>{item.makes}</PlayfairText>
            </View>
          </View>

          <View style={styles.line}/>

          <PlayfairText style={styles.subtitleText}>Description</PlayfairText>
          <RobotoText style={styles.contentText}>{item.description}</RobotoText>

          <View style={styles.line}/>

          <FlatList
            ListHeaderComponent = {
              <PlayfairText style={styles.subtitleText}>Ingredients</PlayfairText>}
            data={item.ingredients}
            renderItem={this.renderIngredients}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={styles.line}/>

          <PlayfairText style={styles.subtitleText}>Notes</PlayfairText>
          <RobotoText style={styles.contentText}>{item.notes}</RobotoText>

          <View style={styles.line}/>

          <FlatList
            ListHeaderComponent = {
              <PlayfairText style={styles.subtitleText}>Directions</PlayfairText>}
            data={Object.values(item.instructions)}
            renderItem={this.renderInstructions}
            keyExtractor={(item, index) => index.toString()}
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
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#f6b425',
    backgroundColor: '#f6b425',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
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
    paddingLeft: 20,
    marginRight:20,
    paddingRight: 20,
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
