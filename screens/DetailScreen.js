import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import Gallery from 'react-native-image-gallery';
import {db, storage} from '../constants/firebase';
import firebase from 'firebase';

import DetailRender from '../components/DetailRender';
import  DetailPlaceholderComponent from '../components/DetailPlaceholder';

const { width: screenWidth } = Dimensions.get('window')

export default class Detail extends React.Component {

  state = {
    count: 0,
    modalVisible: false,
    user: '',
    savedState: false,
    isDataFetched : false,
    item: []
  }

  componentDidMount = () => {
    this.getUser();
    this.getSavedState();
  };


  getUser = async () => {
    var myuser = firebase.auth().currentUser.uid;
    this.setState({user : myuser, count: 0});
  };

  getSavedState = async () => {
    const { navigation } = this.props
    const item = navigation.getParam('item');
    //this.setState({item: item, isDataFetched: true});
    if(item.savedRef === undefined){
      console.log("I am a full recipe");

    } else {
      console.log("I am a saved recipe");
      console.log("Retrieving Data");
      // try{
      //   var user = firebase.auth().currentUser.uid;
      //   console.log("user: " + user);
      //   var docRef = item.recipeRef;
      //   console.log(docSub);
      //   this.setState({itemArr: await docRef.get(), isDataFetched: true});
      //
      //   // await initialQuery.onSnapshot( snapshot => {
      //   // this.setState({ itemArr : snapshot.docs.map(document => document.data()), isDataFetched: true });
      //   // });
      //  }
      // catch (error) {
      //   console.log(error);
      // }
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    const { navigation } = this.props;
    const {isDataFetched} = this.state;
    return (
      <View style={{flex: 1, paddingTop: 12,}}>

      {isDataFetched ? (
        <DetailRender item={navigation.getParam('item')}/>

      ) : (
        <DetailPlaceholderComponent />
      )}
      </View>
    )
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
