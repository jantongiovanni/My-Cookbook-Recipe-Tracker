import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';

export default class CreateRecipe extends Component {
  constructor(props){
     super(props);

     this.handleTitleChange = this.handleTitleChange.bind(this);

     this.state = {
       text: '',
       title: ''
     }
  }

  handleTitleChange(title) {
    this.setState({title});
  }


render() {

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View>
        <PlayfairText style={styles.titleTextLarge}>Add a new recipe</PlayfairText>
      </View>
      <View style = {styles.inputContainer}>
      <TextInput
        type = "text"
        style={styles.textInput}
        placeholder = "Title"
        maxLength = {30}
        onBlur={Keyboard.dismiss}
        value={this.state.title}
        onChangeText={this.handleTitleChange}
        />

      </View>
      <TouchableScale
        style={styles.saveButton}
        activeScale={0.95}
        tension={150}
        friction={7}
        useNativeDriver
        onPress={() => this.onPressRecipe(item)}
      >
      <RobotoText style = {styles.saveButtonText} > Save </RobotoText>
      </TouchableScale>

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
    fontWeight: 'normal'
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
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
});
