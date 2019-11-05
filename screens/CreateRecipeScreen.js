import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
//import ListItem from '../components/ListItem';
import {db} from '../constants/firebase';

export default class CreateRecipe extends Component {

  constructor(props){
     super(props);

     this.handleTitleChange = this.handleTitleChange.bind(this);
     this.handleTimeChange = this.handleTimeChange.bind(this);
     this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
     this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
     this.joinIngredientData = this.joinIngredientData.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);

     this.state = {
       title: '',
       time: '',
       description: '',
       ingredientsHolder: '',
       ingredients: [],
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

  handleSubmit() {
    console.log("save tapped");

    const docData = {
      title: this.state.title,
      time: this.state.time,
      description: this.state.description,
      ingredients: this.state.ingredients,
      instructions: ["test 1", "test 2", "test 3"],
      makes: "makes test",
      notes: "notes test",
      photo_url: "https://images.media-allrecipes.com/userphotos/720x405/3779973.jpg",
    }

    db.collection('recipes').add(docData).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
    });
    this.props.navigation.goBack();
  }

  joinIngredientData = () => {
    this.state.ingredients.push(this.state.ingredientsHolder);
    this.setState({ingredientsHolder: ''})
  }

  renderIngredients = ({item}) => {
    console.log(item);
    return (
      <View>
        <RobotoText style={styles.contentText}>{item}</RobotoText>
      </View>
    )
  }


render() {

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={'handled'}>
        <View>
          <PlayfairText style={styles.titleTextLarge}>Add a new recipe</PlayfairText>
        </View>
        <KeyboardAvoidingView style = {styles.inputContainer} behavior="padding" enabled>
          <TextInput
            type = "text"
            style={styles.textInput}
            placeholder = "Title"
            maxLength = {30}
            value={this.state.title}
            onChangeText={this.handleTitleChange}
          />
          <Text>{30 - this.state.title.length}</Text>
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

          <TextInput
            type = "text"
            style={styles.textInput}
            placeholder = "Ingredients"
            maxLength = {30}
            onChangeText={this.handleIngredientsChange}
            value={this.state.ingredientsHolder}
            id="ingredientsInput"
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

        </KeyboardAvoidingView>
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

        <View style={{marginVertical: 300}}></View>
      </ScrollView>
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
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  textInput: {
    fontFamily: 'roboto',
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  textInputLong: {
    fontFamily: 'roboto',
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 200,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
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
