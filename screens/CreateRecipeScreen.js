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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
//import ListItem from '../components/ListItem';
import {db, storage} from '../constants/firebase';

export default class CreateRecipe extends Component {

  constructor(props){
     super(props);

     this.handleTitleChange = this.handleTitleChange.bind(this);
     this.handleTimeChange = this.handleTimeChange.bind(this);
     this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
     this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
     this.joinIngredientData = this.joinIngredientData.bind(this);
     this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
     this.joinDirectionsData = this.joinDirectionsData.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);

     this.state = {
       title: '',
       time: '',
       description: '',
       ingredientsHolder: '',
       ingredients: [],
       directionsHolder: '',
       directions: [],
       image: null
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
  handleDescriptionChange(description) {
    this.setState({description});
  }
  handleIngredientsChange(ingredientsHolder) {
    this.setState({ingredientsHolder});
  }
  handleDirectionsChange(directionsHolder){
    this.setState({directionsHolder});
  }

  handleSubmit() {
    console.log("save tapped");

    const docData = {
      title: this.state.title,
      time: this.state.time,
      description: this.state.description,
      ingredients: this.state.ingredients,
      instructions: this.state.directions,
      makes: "makes test",
      notes: "notes test",
      photo_url: "https://images.media-allrecipes.com/userphotos/720x405/3779973.jpg",
    }

    // db.collection('recipes').add(docData).then(function(docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    //   this.props.navigation.goBack();
    //   })
    //   .catch(function(error) {
    //       console.error("Error adding document: ", error);
    // });

    console.log("test upload");

    this.uploadPhotoAsync(this.state.image);

  }

  uploadPhotoAsync = async uri => {
         const path = `photos/${Date.now()}.jpg`;

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
  //  console.log(item);
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
  //  console.log(item);
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

  let { image } = this.state;

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

          <TextInput
            type = "text"
            style={styles.textInput}
            placeholder = "Time"
            maxLength = {20}
            value={this.state.time}
            onChangeText={this.handleTimeChange}
          />
          <Text>{20 - this.state.time.length}</Text>
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

        <TouchableScale
          style={styles.saveButton}
          activeScale={0.95}
          tension={150}
          friction={7}
          useNativeDriver
          onPress={this.handleSubmit}

        >
          <RobotoText style = {styles.saveButtonText} > Save </RobotoText>
        </TouchableScale>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
}

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
