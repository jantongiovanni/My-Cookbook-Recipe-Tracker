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
  Alert
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { PlayfairText } from '../components/StyledText';
import { RobotoText } from '../components/StyledText';
import Gallery from 'react-native-image-gallery';
import {db, storage} from '../constants/firebase';
import firebase from 'firebase';


const { width: screenWidth } = Dimensions.get('window')

class DetailRenderComponent extends React.Component {
  state = {
    count: 0,
    user: '',
    modalVisible: false,
    item: this.props.item
  }

  renderIngredients = ({item}) => {
    return (
      <View>
        <RobotoText style={styles.contentText}>{item}</RobotoText>
      </View>
    )
  }

  renderInstructions = ({item}) => {
    this.state.count++
    return (
        <View style={{flex: 1, flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
          <View style={{flexDirection:'column'}}>
            <PlayfairText style={styles.numberText}>{this.state.count}</PlayfairText>
          </View>
          <View style={{flexDirection:'column', paddingLeft: 20}}>
            <RobotoText style={styles.contentText}>{item}</RobotoText>
          </View>
        </View>
      )
    }

  onPressDelete = (item) => {
    const { navigation } = this.props.nav
    if(item.ref === undefined){
        console.log("cannot delete item in app");
    } else {
      item.ref.delete().then(function() {
            console.log("Document successfully deleted!");
          //  navigation.navigate('Home');
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

  onPressSave = async (item, navigation) => {
    savedRecipeRef = db.collection('saved_recipes').doc();

    const docData = {
      uid : firebase.auth().currentUser.uid,
      recipeRef: item.ref,
      savedRef : savedRecipeRef,
      title: item.title,
      image: item.image,
      time: item.time
    }
    return new Promise(() => {
      savedRecipeRef.set(docData).then(function() {
        console.log("Document written");
        Alert.alert(
          'Recipe Saved',
          docData.title + ' was saved successfully',
          [
            { text: 'OK'},
          ],
          { cancelable: true }
        );
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
      });
      item.ref.update({saved_refs : firebase.firestore.FieldValue.arrayUnion(savedRecipeRef)});
    });
  }

  render () {
    const item = this.state.item;
    const { navigation } = this.props.nav;
    console.log("ive gotten here");
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
              this.setState({modalVisible: false, count:0});
            }}
            >
            <TouchableOpacity style={{ position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0, backgroundColor: 'rgba(52, 52, 52, 0.85)'}}
              onPress={() => {console.log("pressed"); this.setState({modalVisible: false, count:0});}}>
            </TouchableOpacity>
          <Gallery
             onSingleTapConfirmed={()=> {console.log("pressed"); this.setState({modalVisible: false, count:0});}}
             images={[
              {source: { uri: item.image }},
              {source: { uri: item.image }},
              {source: { uri: item.image }}
             ]}
           />
         </Modal>
        </View>
      {item.image !== null &&
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
            onPress={() => this.onPressDelete(item)}
          >
            <RobotoText style = {styles.saveButtonText} > Delete </RobotoText>
          </TouchableScale>
        ) : (
          <TouchableScale
            style={styles.saveButton}
            activeScale={0.95}
            tension={150}
            friction={7}
            useNativeDriver
            activeOpacity={1}
            onPress={() => this.onPressSave(item, navigation)}
          >
            <RobotoText style = {styles.saveButtonText} > Add To My Saved Recipes</RobotoText>
          </TouchableScale>
        )}
        <View style={styles.container}>
          <PlayfairText style={styles.titleTextLarge}>{item.title}</PlayfairText>
          <View style={{flexDirection:'row', alignItems: 'flex-start', paddingTop: 20}}>
            <View style={{flexDirection:'column'}}>
              <RobotoText style={styles.contentText}>Time:</RobotoText>
              <PlayfairText style={styles.titleTextMin}>{item.time}</PlayfairText>
            </View>
            <View style={{flexDirection:'column', paddingLeft: 20}}>
              <RobotoText style={styles.contentText}>Makes:</RobotoText>
              <PlayfairText style={styles.titleTextMin}>{item.makes}</PlayfairText>
            </View>
          </View>
          {item.description !== '' &&
            <View>
              <View style={styles.line}/>
              <PlayfairText style={styles.subtitleText}>Description</PlayfairText>
              <RobotoText style={styles.contentText}>{item.description}</RobotoText>
              </View>
          }

          {item.ingredients.length > 0 &&
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
          {item.notes !== '' &&
            <View>
              <View style={styles.line}/>
              <PlayfairText style={styles.subtitleText}>Notes</PlayfairText>
              <RobotoText style={styles.contentText}>{item.notes}</RobotoText>
            </View>
          }
          {item.instructions.length > 0 &&
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
        </View>
      </ScrollView>
      )
    }
}

export default DetailRenderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 16,
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
