import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  Keyboard,
  FlatList,
  Alert,
  Platform,
  Dimensions,
  ToastAndroid
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { withNavigation } from 'react-navigation'
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import {db, storage} from '../constants/firebase';
import firebase from 'firebase';

const { width: screenWidth } = Dimensions.get('window')

class CreateRecipe extends Component {

  constructor(props){
     super(props);

     this.handleTitleChange = this.handleTitleChange.bind(this);
     this.handleTimeChange = this.handleTimeChange.bind(this);
     this.handleMakesChange = this.handleMakesChange.bind(this);
     this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
     this.handleNotesChange = this.handleNotesChange.bind(this);
     this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
     this.joinIngredientData = this.joinIngredientData.bind(this);
     this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
     this.joinDirectionsData = this.joinDirectionsData.bind(this);
     this.addPost = this.addPost.bind(this);
     this.onTogglePublic = this.onTogglePublic.bind(this);

     this.state = {
       title: '',
       time: '',
       makes: '',
       description: '',
       notes: '',
       ingredientsHolder: '',
       ingredients: [],
       directionsHolder: '',
       directions: [],
       image: null,
       imagePath: '',
       remoteUri: null,
       isPublic: true
     }
     this.baseState = this.state;
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  handleTitleChange(title) {
    this.setState({title});
  }
  handleTimeChange(time) {
    this.setState({time});
  }
  handleMakesChange(makes) {
    this.setState({makes});
  }
  handleDescriptionChange(description) {
    this.setState({description});
  }
  handleNotesChange(notes) {
    this.setState({notes});
  }
  handleIngredientsChange(ingredientsHolder) {
    this.setState({ingredientsHolder});
  }
  handleDirectionsChange(directionsHolder){
    this.setState({directionsHolder});
  }
  onTogglePublic(){
    if(this.state.isPublic){
      this.setState({isPublic: false});
    } else {
      this.setState({isPublic: true});
    }
  }

  addPost = async (navigation) => {
      console.log("add post");
      if(this.state.title === ''){
        ToastAndroid.showWithGravityAndOffset(
          'Error: Title Cannot Be Empty',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          200
        );

      } else {
      navigation.navigate('Discover');
      ToastAndroid.showWithGravityAndOffset(
        'Posting...',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        200
      );
      recipeRef = db.collection('recipes').doc();
       if(this.state.image !== null){
         console.log("not null!");
         this.state.remoteUri = await this.uploadPhotoAsync(this.state.image);
        }

       const docData = {
         uid : firebase.auth().currentUser.uid,
         ref: recipeRef,
         title: this.state.title,
         createdAt: Date.now(),
         isPublic: this.state.isPublic
       }
       if(this.state.time !== ''){
         docData.time = this.state.time;
       }
       if(this.state.description !== ''){
         docData.description = this.state.description;
       }
       if(this.state.notes !== ''){
         docData.notes = this.state.notes;
       }
       if(this.state.makes !== ''){
         docData.makes = this.state.makes;
       }
       if(this.state.ingredients.length > 0){
         docData.ingredients = this.state.ingredients;
       }
       if(this.state.directions.length > 0){
         docData.instructions = this.state.directions;
       }
       if(this.state.image !== null){
         docData.image = this.state.image;
       }
       if(this.state.imagePath !== ''){
         docData.imagePath = this.state.imagePath;
       }

       this.setState({...this.baseState, ingredients: [], directions: []});
       this.refs._scrollView.scrollTo({x: 0, y: 0, animated: false});

       return new Promise(() => {
         recipeRef.set(docData).then(function() {
           console.log("Document written");
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
       });
     }
   };

  uploadPhotoAsync = async uri => {
         const path = `photos/${Date.now()}.jpg`;
         this.setState({imagePath: path});
         return new Promise(async (res, rej) => {
             const response = await fetch(uri);
             const file = await response.blob();

             let upload = storage.ref(path).put(file);

             upload.on(
               "state_changed",
               snapshot => {},
               err => {
                   rej(err);
               },
               async () => {
                   const url = await upload.snapshot.ref.getDownloadURL();
                   res(url);
               }
           );
       });
   };

  joinIngredientData = () => {
    this.state.ingredients.push(this.state.ingredientsHolder);
    this.setState({ingredientsHolder: ''})
  }

  renderIngredients = ({item}) => {
    return (
      <View>
        <RobotoText style={styles.contentText}>{item}</RobotoText>
      </View>
    )
  }

  joinDirectionsData = () => {
    this.state.directions.push(this.state.directionsHolder);
    this.setState({directionsHolder: ''})
  }

  renderDirections = ({item}) => {
    return (
      <View>
        <RobotoText style={styles.contentText}>{item}</RobotoText>
      </View>
    )
  }



  combinedFunctions = async () =>{
<<<<<<< HEAD
    //if keyboard is open when image picker is launched, the bottom tab bar will not be visible if an image is not selected
    //this is fixed if the keyboard is reopened and then closed, but navigating away before doing this will leave you stranded with no tab bar -_-
    //leaving in to fix later because this is still better than the keyboardavoidingview solution previously
=======
>>>>>>> 81089df248482065a577846c055a186eb1a55f7f
    await this.dismissKb();
    this.onChooseImagePress();
  }

  dismissKb = () => {
    Keyboard.dismiss();
  }

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });

    }
  }

render() {
  let { image, isPublic } = this.state;

  return(
    <SafeAreaView style={styles.container}>
    <KeyboardAwareScrollView
    enableOnAndroid
    extraHeight={250}
    keyboardShouldPersistTaps="handled"
    >
        <View>
          <PlayfairText style={styles.titleTextLarge}>Add a new recipe</PlayfairText>
        </View>
        {image &&
          <Image source={{ uri: image }} style={styles.topImage} />}
        <TouchableScale
          style={styles.saveButton}
          activeScale={0.95}
          tension={150}
          friction={7}
          useNativeDriver
          onPress={this.combinedFunctions}
        >
          <RobotoText style = {styles.saveButtonText} > Choose Image </RobotoText>
        </TouchableScale>


          {/* ------ Title ------- */}
          <View style={{flex: 1, flexDirection:'row'}}>
            <TextInput
              type = "text"
              style={styles.textInput}
              placeholder = "Title"
              maxLength = {30}
              value={this.state.title}
              onChangeText={this.handleTitleChange}
            />
            <RobotoText style={styles.charCount}>{30 - this.state.title.length}</RobotoText>
          </View>
          <TouchableScale
            style={styles.saveButton}
            activeScale={0.95}
            tension={150}
            friction={7}
            useNativeDriver
            onPress={this.onTogglePublic}
          >
          {isPublic ? (
            <RobotoText style = {styles.saveButtonText} > Public </RobotoText>
          ): (
            <RobotoText style = {styles.saveButtonText} > Private </RobotoText>
          )
          }
          </TouchableScale>


          {/* ------ Time ------- */}
          <View style={{flex: 1, flexDirection:'row'}}>
            <TextInput
              type = "text"
              style={styles.textInput}
              placeholder = "Time"
              maxLength = {20}
              value={this.state.time}
              onChangeText={this.handleTimeChange}
            />
            <RobotoText style={styles.charCount}>{20 - this.state.time.length}</RobotoText>
          </View>
          {/* ------ Makes ------- */}
          <View style={{flex: 1, flexDirection:'row'}}>
            <TextInput
              type = "text"
              style={styles.textInput}
              placeholder = "Makes"
              maxLength = {20}
              value={this.state.makes}
              onChangeText={this.handleMakesChange}
            />
            <RobotoText style={styles.charCount}>{20 - this.state.makes.length}</RobotoText>
          </View>
          {/* ------ Description ------- */}
          <View style={{flex: 1, flexDirection:'row'}}>
            <TextInput
              type = "text"
              style={styles.textInputLong}
              placeholder = "Description"
              maxLength = {240}
              multiline= {true}
              value={this.state.description}
              onChangeText={this.handleDescriptionChange}
              textAlignVertical = "top"
            />
            <RobotoText style={styles.charCountLong}>{240 - this.state.description.length}</RobotoText>
          </View>
          {/* ------ Notes ------- */}
          <View style={{flex: 1, flexDirection:'row'}}>
            <TextInput
              type = "text"
              style={styles.textInputLong}
              placeholder = "Notes"
              maxLength = {120}
              multiline= {true}
              value={this.state.notes}
              onChangeText={this.handleNotesChange}
              textAlignVertical = "top"
            />
            <RobotoText style={styles.charCountLong}>{120 - this.state.notes.length}</RobotoText>
          </View>
          {/* ------ Ingredients ------- */}
          <View style={{flex: 1, flexDirection:'row'}}>
            <TextInput
              type = "text"
              style={styles.textInput}
              placeholder = "Ingredients"
              maxLength = {30}
              onChangeText={this.handleIngredientsChange}
              value={this.state.ingredientsHolder}
            />
            <RobotoText style={styles.charCount}>{30 - this.state.ingredientsHolder.length}</RobotoText>
          </View>
          <TouchableScale
            style={styles.saveButton}
            activeScale={0.95}
            tension={150}
            friction={7}
            useNativeDriver
            onPress={this.joinIngredientData}
          >
            <RobotoText style = {styles.saveButtonText} > Add Ingredient </RobotoText>
          </TouchableScale>
          <FlatList
            inverted
            data={this.state.ingredients}
            extraData={this.state}
            keyExtractor={(index) => index.toString()}
            renderItem={this.renderIngredients}
          />

          {/* ------ Directions ------- */}
          <View style={{flex: 1, flexDirection:'row'}}>
            <TextInput
              type = "text"
              style={styles.textInput}
              placeholder = "Directions"
              maxLength={240}
              onChangeText={this.handleDirectionsChange}
              value={this.state.directionsHolder}
            />
            <RobotoText style={styles.charCount}>{240 - this.state.directionsHolder.length}</RobotoText>
          </View>
          <TouchableScale
            style={styles.saveButton}
            activeScale={0.95}
            tension={150}
            friction={7}
            useNativeDriver
            onPress={this.joinDirectionsData}
          >
            <RobotoText style = {styles.saveButtonText} > Add Direction </RobotoText>
          </TouchableScale>
          <FlatList
            inverted
            data={this.state.directions}
            extraData={this.state}
            keyExtractor={(index) => index.toString()}
            renderItem={this.renderDirections}
          />
          {/* ------ Save ------- */}
          <TouchableScale
            style={styles.saveButton}
            activeScale={0.95}
            tension={150}
            friction={7}
            useNativeDriver
            onPress={() => this.addPost(this.props.navigation)}
          >
          <RobotoText style = {styles.saveButtonText} > Save </RobotoText>
        </TouchableScale>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
}
export default withNavigation(CreateRecipe)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#f7f7f7'
  },
    inputContainer: {
    paddingTop: 15
  },
    saveButton: {
    borderWidth: 1,
    borderColor: '#f6b425',
    backgroundColor: '#f6b425',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  charCount: {
    flex: 1,
    marginRight: 20,
    marginBottom: 20,
    textAlignVertical:'center',
    textAlign:'center',
    alignItems: 'center'
  },
  charCountLong: {
    flex: 1,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
    textAlignVertical:'top',
    textAlign:'center',
    alignItems: 'center'
  },
  textInput: {
    flex: 10,
    fontFamily: 'roboto',
    borderColor: '#CCCCCC',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    marginHorizontal: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  textInputLong: {
    flex: 10,
    fontFamily: 'roboto',
    borderColor: '#CCCCCC',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 200,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  titleTextLarge:{
    alignSelf: 'center',
    fontSize: 46,
    color: 'black',
    marginVertical: 20
  },
  topImage:{
    flex:1,
    width: screenWidth,
    height: screenWidth,
    alignSelf: 'flex-start',
    marginBottom: 20
  },
  card:{
    marginHorizontal:20,
    flex:1,
    maxHeight: 120,
    backgroundColor: 'white',
    flexDirection:'row',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
});
