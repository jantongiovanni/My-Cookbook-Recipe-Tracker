import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { withNavigation } from 'react-navigation'
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import {db, storage} from '../constants/firebase';
import firebase from 'firebase';

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
        Alert.alert(
          'Error',
          'Title cannot be empty',
          [
            { text: 'OK'},
          ],
          { cancelable: true }
        );
      } else {
      navigation.navigate('Home')
      recipeRef = db.collection('recipes').doc();
       if(this.state.image !== null){
         console.log("not null!");
         this.state.remoteUri = await this.uploadPhotoAsync(this.state.image);
        }
       const docData = {
         uid : firebase.auth().currentUser.uid,
         ref: recipeRef,
         title: this.state.title,
         time: this.state.time,
         description: this.state.description,
         ingredients: this.state.ingredients,
         instructions: this.state.directions,
         makes: this.state.makes,
         notes: this.state.notes,
         image: this.state.remoteUri,
         imagePath: this.state.imagePath,
         createdAt: Date.now(),
         isPublic: this.state.isPublic
       }
       return new Promise(() => {
         recipeRef.set(docData).then(function() {
           console.log("Document written");
           Alert.alert(
             'Recipe Saved',
             docData.title + ' was added successfully',
             [
               { text: 'OK'},
             ],
             { cancelable: true }
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
    <KeyboardAvoidingView behavior="padding" enabled>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={'handled'}>
        <View>
          <PlayfairText style={styles.titleTextLarge}>Add a new recipe</PlayfairText>
        </View>
        <TouchableScale
          style={styles.saveButton}
          activeScale={0.95}
          tension={150}
          friction={7}
          useNativeDriver
          onPress={this.onChooseImagePress}
        >
          <RobotoText style = {styles.saveButtonText} > Choose Image </RobotoText>
        </TouchableScale>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

          <View style={{flex: 1, flexDirection:'row'}}>
          {/* ------ Title ------- */}
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
          <TextInput
            type = "text"
            style={styles.textInput}
            placeholder = "Time"
            maxLength = {20}
            value={this.state.time}
            onChangeText={this.handleTimeChange}
          />
          <Text>{20 - this.state.time.length}</Text>
          {/* ------ Makes ------- */}
          <TextInput
            type = "text"
            style={styles.textInput}
            placeholder = "Makes"
            maxLength = {20}
            value={this.state.makes}
            onChangeText={this.handleMakesChange}
          />
          <Text>{20 - this.state.makes.length}</Text>
          {/* ------ Description ------- */}
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
          <Text>{240 - this.state.description.length}</Text>
          {/* ------ Notes ------- */}
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
          <Text>{120 - this.state.notes.length}</Text>
          {/* ------ Ingredients ------- */}
          <TextInput
            type = "text"
            style={styles.textInput}
            placeholder = "Ingredients"
            maxLength = {30}
            onChangeText={this.handleIngredientsChange}
            value={this.state.ingredientsHolder}
          />
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
          <TextInput
            type = "text"
            style={styles.textInput}
            placeholder = "Directions"
            onChangeText={this.handleDirectionsChange}
            value={this.state.directionsHolder}
          />
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
        <View style={{ height: 100 }} />
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
}
export default withNavigation(CreateRecipe)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    justifyContent: 'space-around',
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
    backgroundColor: '#f6b425',
    marginRight: 10,
    flex: 1,
    marginBottom: 20,
    justifyContent:'center'
  },
  textInput: {
    flex: 10,
    fontFamily: 'roboto',
    borderColor: '#CCCCCC',
    borderWidth: 0.5,
    height: 50,
    fontSize: 20,
    marginHorizontal: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  textInputLong: {
    fontFamily: 'roboto',
    borderColor: '#CCCCCC',
    borderWidth: 0.5,
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
    paddingBottom: 14
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
