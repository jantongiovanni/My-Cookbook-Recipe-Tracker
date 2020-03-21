import React from 'react';
import {
  View,
  SafeAreaView
} from 'react-native';

import firebase from 'firebase';

import DetailRender from '../components/DetailRender';
import  DetailPlaceholderComponent from '../components/Placeholders/DetailPlaceholder';

export default class Detail extends React.Component {

  state = {
    user: '',
    saved: false,
    savedRef : '',
    smallRef : '',
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

    //logic tree
    //Check if saved or small recipe
    //No -> full recipe, load full details
      //check if saved recipe
      // Yes -> grab full recipe
      // No -> check if small ref is a saved recipe
       // Yes -> grab full, saved
       // No -> grab full, not saved


    const { navigation } = this.props
    const item = navigation.getParam('item');
    //console.log(item.savedRef, item.smallRef);
    if(item.savedRef === undefined && item.smallRef === undefined){
      console.log("I am a not saved not small recipe");
      this.setState({item: item, isDataFetched: true});

    } else if ( item.savedRef !== undefined ){
      console.log("I am a saved recipe");
      console.log("Retrieving Data");
      try{
        var user = firebase.auth().currentUser.uid;
        console.log("user: " + user);
        var docRef = item.recipeRef;
        await docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({item: doc.data(), isDataFetched: true, saved: true, savedRef: item.savedRef});
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
    } else { //checking if small ref is a saved recipe for current user

        try{
          var user = firebase.auth().currentUser.uid;
          console.log("checking if small ref is a saved recipe for user: " + user);
          //const initialQuery = await db.collection("saved_recipes").where("uid", "==", user).where("recipeRef", "==", item.recipeRef);
          var savedCollection = db.collection("saved_recipes");
          await savedCollection.get().where("uid", "==", user).where("recipeRef", "==", item.recipeRef).get().then((doc) => {
              if (doc.exists) {
                  //this.setState({item: doc.data(), isDataFetched: true, saved: true, savedRef: item.savedRef});
                  try{
                    console.log("reccipe is a saved recipe, getting full recipe");
                    var docRef = item.recipeRef;
                    await docRef.get().then((doc) => {
                        if (doc.exists) {
                            this.setState({item: doc.data(), isDataFetched: true, saved: true, savedRef: item.savedRef});
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
              } else {
                  console.log("No such document! Not a saved recipe, grabbing full recipe");
                  try{
                    console.log("recipe is NOT a saved recipe, getting full recipe");
                    var docRef = item.recipeRef;
                    await docRef.get().then((doc) => {
                        if (doc.exists) {
                            this.setState({item: doc.data(), isDataFetched: true, saved: true, savedRef: item.savedRef});
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
    const { isDataFetched, item, saved, savedRef} = this.state;

    return (
      <SafeAreaView style={{flex: 1, marginTop: 0, paddingTop: 0}}>
        {isDataFetched ? (
          <DetailRender item={item} nav={navigation} saved={saved} savedRef={savedRef}/>
        ) : (
          <DetailPlaceholderComponent />
        )}
      </SafeAreaView>
    )
  }
}
