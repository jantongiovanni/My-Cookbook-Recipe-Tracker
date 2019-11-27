import React, {Component} from 'react';
import { View, Button, StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import firebase from 'firebase';
import { RobotoText } from '../components/StyledText';

class ProfileScreen extends Component {
  constructor(props){
     super(props);

    this.getUserInfo = this.getUserInfo.bind(this);

    this.state = {
      name: '',
      email: '',
      photoURL : '',
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
      <View style={{flex:1, paddingTop:40, paddingBottom: 20}}>
        <View style = {styles.container}>
          <Image
            source={{ uri: this.state.photoURL}}
            style={{width: 60, height: 60, borderRadius: 60/ 2}}
          />
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <RobotoText style={styles.smallText}>
                {this.state.name}
              </RobotoText>
              <RobotoText style={styles.smallText}>
                {this.state.email}
              </RobotoText>
            </View>
          <View style={{paddingTop: 20}}>
            <Button title="Sign Out"
              onPress={() => firebase.auth().signOut() }/>
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
    justifyContent:'space-around',
  },
  smallText : {
    fontSize: 16,
    color: 'black',
    fontWeight:'400',
    }
});
