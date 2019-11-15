import React, {Component} from 'react';
import { View, Button, StyleSheet, Text} from 'react-native';
import firebase from 'firebase';
import { RobotoText } from '../components/StyledText';

class ProfileScreen extends Component {
  constructor(props){
     super(props);

    this.getUserInfo = this.getUserInfo.bind(this);

    this.state = {
      name: '',
      email: '',
      photoUrl : '',
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
        photoUrl : user.photoURL,
        emailVerified : user.emailVerified,
        uid : user.uid
      });

    } else {
      console.log("null user");
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <Button title="Sign Out"
          onPress={() => firebase.auth().signOut() }/>
        <RobotoText style={styles.smallText}>
          {this.state.name}
        </RobotoText>
        <RobotoText style={styles.smallText}>
          {this.state.email}
        </RobotoText>
        <RobotoText style={styles.smallText}>
          {this.state.photoUrl}
        </RobotoText>
        <RobotoText style={styles.smallText}>
          {this.state.emailVerified ? "true" : "false"}
        </RobotoText>
        <RobotoText style={styles.smallText}>
          {this.state.uid}
        </RobotoText>
      </View>
    );
  }
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText : {
    fontSize: 16,
    color: 'black',
    fontWeight:'400',
    }
});
