import React from 'react';
import {
  View,
} from 'react-native';

import firebase from 'firebase';

import DetailRender from '../components/DetailRender';
import  DetailPlaceholderComponent from '../components/Placeholders/DetailPlaceholder';

export default class Detail extends React.Component {

  state = {
    user: '',
    saved: false,
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
    if(item.savedRef === undefined){
      console.log("I am a full recipe");
      this.setState({item: item, isDataFetched: true});

    } else {
      console.log("I am a saved recipe");
      console.log("Retrieving Data");
      try{
        var user = firebase.auth().currentUser.uid;
        console.log("user: " + user);
        var docRef = item.recipeRef;
        await docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({item: doc.data(), isDataFetched: true, saved: true});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
       }
      catch (error) {
        console.log(error);
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    const { navigation } = this.props;
    const { isDataFetched, item, saved } = this.state;

    return (
      <View style={{flex: 1}}>
        {isDataFetched ? (
          <DetailRender item={item} nav={navigation} saved={saved}/>
        ) : (
          <DetailPlaceholderComponent />
        )}
      </View>
    )
  }
}
