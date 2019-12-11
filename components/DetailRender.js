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
  ToastAndroid
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import Gallery from 'react-native-image-gallery';
import {db, storage} from '../constants/firebase';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation'
import Toast, {DURATION} from 'react-native-easy-toast'



const { width: screenWidth } = Dimensions.get('window')

class DetailRenderComponent extends React.Component {
  state = {
    user: '',
    modalVisible: false,
    item: this.props.item,
    saved: this.props.saved,
    savedRef : this.props.savedRef
  }

  renderIngredients = ({item}) => {
    return (
      <View>
        <RobotoText style={styles.contentText}>{item}</RobotoText>
      </View>
    )
  }

  renderInstructions = ({item, index}) => {
    return (
        <View style={{flex: 1, flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
          <View style={{flexDirection:'column'}}>
            <PlayfairText style={styles.numberText}>{index+1}</PlayfairText>
          </View>
          <View style={{flexDirection:'column', paddingLeft: 20}}>
            <RobotoText style={styles.contentText}>{item}</RobotoText>
          </View>
        </View>
      )
    }

  onPressDelete = (item, navigation) => {
    //const { navigation } = this.props.nav
    if(item.ref === undefined){
        console.log("cannot delete item in app");
    } else {
      item.ref.delete().then(function() {
          ToastAndroid.showWithGravityAndOffset(
            'Recipe Deleted',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            200
          );
          console.log("Document successfully deleted!");
          navigation.navigate('Recipes');
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      if(item.imagePath){
        console.log("imagePath: " + item.imagePath);
        const storageRef = storage.ref();
        photoRef = storageRef.child(item.imagePath);
        console.log("photo ref " + photoRef);
        photoRef.delete().then(function() {
            console.log("File deleted successfully");
          }).catch(function(error) {
            console.log("Uh-oh, an error occurred!" + error);
          });
      }
    }
  }

  onPressUnsave = async (savedRef, navigation) => {
    console.log("savedRef: " + savedRef);
    savedRef.delete().then(function() {
        ToastAndroid.showWithGravityAndOffset(
          'Recipe Unsaved',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          200
        );
        console.log("Document successfully deleted!");
        navigation.navigate('Recipes');
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  }

  onPressSave = async (item) => {
  //  this.refs.toast.show('Recipe Saved Toast test ;)', DURATION.LENGTH_SHORT);

    savedRecipeRef = db.collection('saved_recipes').doc();
    this.setState({savedRef: savedRecipeRef, saved: true});

    const docData = {
      uid : firebase.auth().currentUser.uid,
      recipeRef: item.ref,
      savedRef : savedRecipeRef,
      title: item.title,
    }
    if(item.hasOwnProperty("time")){
      docData.time = item.time;
    }
    if(item.hasOwnProperty("image")){
      docData.image = item.image;
    }
    return new Promise(() => {
      savedRecipeRef.set(docData).then(function() {
        console.log("Document saved");
        ToastAndroid.showWithGravityAndOffset(
          'Recipe Saved',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          200
        );
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
      });
      // item.ref.update({saved_refs : firebase.firestore.FieldValue.arrayUnion(savedRecipeRef)});
    });
  }




  render () {
    const {item, saved, savedRef } = this.state;
    const { navigation } = this.props.nav;
    console.log(item.title);
    return (
      <ScrollView>
      {/* ------ Fullscreen Gallery Modal ------- */}
        <View style={{marginTop: 22}}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
              this.setState({modalVisible: false});
            }}
            >
            <TouchableOpacity style={{ position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0, backgroundColor: 'rgba(52, 52, 52, 0.85)'}}
              onPress={() => {console.log("pressed"); this.setState({modalVisible: false});}}>
            </TouchableOpacity>
          <Gallery
             onSingleTapConfirmed={()=> {console.log("pressed"); this.setState({modalVisible: false});}}
             images={[
              {source: { uri: item.image }},
              {source: { uri: item.image }},
              {source: { uri: item.image }}
             ]}
           />
         </Modal>
        </View>
      {item.hasOwnProperty("image") &&
        <TouchableScale
          activeScale={0.95}
          tension={150}
          friction={7}
          useNativeDriver
          activeOpacity={1}
          onPress={() =>  this.setState({modalVisible: true})}
        >
          <Image source={{uri: item.image}}
            style={styles.topImage}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator />}/>
          </TouchableScale>
      }
      {item.uid === firebase.auth().currentUser.uid ? (
          <TouchableScale
            style={styles.saveButton}
            activeScale={0.95}
            tension={150}
            friction={7}
            useNativeDriver
            activeOpacity={1}
            onPress={() => this.onPressDelete(item, this.props.navigation)}
          >
            <RobotoText style = {styles.saveButtonText} > Delete </RobotoText>
          </TouchableScale>
        ) : (
            !saved ? (
            <TouchableScale
              style={styles.saveButton}
              activeScale={0.95}
              tension={150}
              friction={7}
              useNativeDriver
              activeOpacity={1}
              onPress={() => this.onPressSave(item)}
            >
              <RobotoText style = {styles.saveButtonText} > Add To My Saved Recipes</RobotoText>
            </TouchableScale>
          ) : (
            <TouchableScale
              style={styles.saveButton}
              activeScale={0.95}
              tension={150}
              friction={7}
              useNativeDriver
              activeOpacity={1}
              onPress={() => this.onPressUnsave(savedRef, this.props.navigation)}
            >
              <RobotoText style = {styles.saveButtonText} > Unsave Recipe </RobotoText>
            </TouchableScale>
          )
        )}
        <View style={styles.container}>
          <PlayfairText style={styles.titleTextLarge}>{item.title}</PlayfairText>
          <View style={{flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
            {item.hasOwnProperty("time") &&
              <View style={{flexDirection:'column'}}>
                <RobotoText style={styles.contentText}>Time:</RobotoText>
                <PlayfairText style={styles.titleTextMin}>{item.time}</PlayfairText>
              </View>
            }
            {item.hasOwnProperty("makes") &&
              <View style={{flexDirection:'column', paddingLeft: 20}}>
                <RobotoText style={styles.contentText}>Makes:</RobotoText>
                <PlayfairText style={styles.titleTextMin}>{item.makes}</PlayfairText>
              </View>
            }
          </View>
          {item.hasOwnProperty("description") &&
            <View>
              <View style={styles.line}/>
              <PlayfairText style={styles.subtitleText}>Description</PlayfairText>
              <RobotoText style={styles.contentText}>{item.description}</RobotoText>
            </View>
          }

          {item.hasOwnProperty("ingredients") &&
            <View>
              <View style={styles.line}/>
              <FlatList
                ListHeaderComponent = {
                  <PlayfairText style={styles.subtitleText}>Ingredients</PlayfairText>}
                data={item.ingredients}
                renderItem={this.renderIngredients}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          }
          {item.hasOwnProperty("notes") &&
            <View>
              <View style={styles.line}/>
              <PlayfairText style={styles.subtitleText}>Notes</PlayfairText>
              <RobotoText style={styles.contentText}>{item.notes}</RobotoText>
            </View>
          }
          {item.hasOwnProperty("instructions") &&
            <View>
              <View style={styles.line}/>
              <FlatList
                ListHeaderComponent = {
                  <PlayfairText style={styles.subtitleText}>Directions</PlayfairText>}
                data={item.instructions}
                renderItem={this.renderInstructions}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          }
        {/*   <Toast ref="toast" position='bottom'/> */}
        </View>
      </ScrollView>
      )
    }
}

export default withNavigation(DetailRenderComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20
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
    paddingTop: 4,
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
