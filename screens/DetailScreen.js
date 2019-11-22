import React from 'react';
import {
  View,
} from 'react-native';

import firebase from 'firebase';

import DetailRender from '../components/DetailRender';
import  DetailPlaceholderComponent from '../components/DetailPlaceholder';

export default class Detail extends React.Component {

  state = {
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
      this.setState({item: item, isDataFetched: true});

    } else {
      console.log("I am a saved recipe");
      console.log("Retrieving Data");
      try{
        var user = firebase.auth().currentUser.uid;
        console.log("user: " + user);
        var docRef = item.recipeRef;
        //var docRef = db.collection("recipes").doc("Bow3GEc7quuz6srBkjNr");
        //console.log(db.docRef.get());
        await docRef.get().then((doc) => {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                this.setState({item: doc.data(), isDataFetched: true});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        // await initialQuery.onSnapshot( snapshot => {
        // this.setState({ itemArr : snapshot.docs.map(document => document.data()), isDataFetched: true });
        // });
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
    const {isDataFetched, item} = this.state;

    return (
      <View style={{flex: 1}}>
        {isDataFetched ? (
          <DetailRender item={item} nav={navigation}/>
        ) : (
          <DetailPlaceholderComponent />
        )}
      </View>
    )
  }
}
