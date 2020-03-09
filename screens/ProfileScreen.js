import React, {Component} from 'react';
import { View, Button, StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import firebase from 'firebase';
import { RobotoText } from '../components/StyledText';
import {FontAwesome5} from '@expo/vector-icons';

class ProfileScreen extends Component {
  constructor(props){
     super(props);

    this.getUserInfo = this.getUserInfo.bind(this);

    this.state = {
      name: '',
      email: '',
      photoURL : null,
      emailVerified : '',
      uid : ''
    }
}

componentDidMount(){
  this.getUserInfo();
}

  getUserInfo = () => {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({
        name : user.displayName,
        email : user.email,
        photoURL : user.photoURL,
        emailVerified : user.emailVerified,
        uid : user.uid
      });
    } else {
      console.log("null user");
    }
  }

  render() {
    return (
      <View style={{flex:1, paddingTop:40, paddingBottom: 20, backgroundColor: '#f7f7f7'}}>
        <View style = {styles.container}>
          <Image
            source={{ uri: this.state.photoURL}}
            style={{width: 60, height: 60, borderRadius: 60/ 2, margin: 20}}
          />
          <View style={{flexDirection: 'row', flex:1, marginRight: 20, justifyContent:'space-between', alignItems:'center'}}>
            <View style={{flexDirection: 'column', alignSelf: 'flex-start'}}>
              <RobotoText style={styles.largeText}>
                {this.state.name}
              </RobotoText>
              <RobotoText style={styles.smallText}>
                {this.state.email}
              </RobotoText>
            </View>
            <View style={{alignSelf:'flex-end'}}>
              <FontAwesome5 name="sign-out-alt" size={24} color='black'  onPress={() => firebase.auth().signOut() }/>
            </View>
        </View>
      </View>
    </View>
    );
  }
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    marginRight:20
  },
  smallText : {
    fontSize: 16,
    color: 'black',
    fontWeight:'400',
  },
  largeText : {
    fontSize: 20,
    color: 'black',
    fontWeight:'bold',
  }

});
