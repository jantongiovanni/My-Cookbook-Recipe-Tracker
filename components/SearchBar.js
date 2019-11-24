import React from 'react';
import {
  TextInput,
  StyleSheet
} from 'react-native';

export default class SearchBar extends React.Component{
constructor(props){
    super(props);
}

state = {
};

render() {
  return (
    <TextInput
      style={styles.textinput}
      placeholder="Enter name"
      multiline={false}
      //onChangeText={(name) => this.setState({name})}
      value={"Search Recipes"}//this.state.name}
    />
  )};
}

const styles = StyleSheet.create({
  textinput: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: .5,
    alignItems: 'center',
    textAlign: 'center',
    color: 'lightgray',
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
  },

});
