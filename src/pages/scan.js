import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Text, BackHandler, StatusBar, View, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, Chip } from 'react-native-paper';
import styles from '../css/styles';

class Scan extends Component {

  async componentDidMount() {
    username = await AsyncStorage.getItem('username') || 'undefined';
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: '',
      result: '',
      // ing: [],
      skin: null,
      percent: null,
      // notes: [],
      // ingY: [],
      // ingArr: [],
      imageModalVisible: true
    }
  }

  openCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
      includeBase64: true
    }).then(response => {
      this.setState({ imageModalVisible: false })

      this.props.navigation.navigate('Result', {
        skin: this.state.skin,
        notes: this.state.notes,
        percent: this.state.percent,
      });

      fetch("http://178.128.121.52/uploadImage.php", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          image_name: response.modificationDate,
          image_data: response.data,
        })
      }).then((response) => response.text())
        .then((responseJson) => {

          console.log(responseJson)
          var result = JSON.parse(responseJson)

          this.setState({
            // ing: result.Ingredients,
            skin: result.Skin,
            notes: result.Notes,
            percent: result.Percent
          })
          this.props.navigation.navigate('Result', {
            skin: this.state.skin,
            notes: this.state.notes,
            percent: this.state.percent,
          });

        }).catch((error) => {
          alert("There is a network error. Please try again.")
          console.log(error);
        });

    }).catch(e => {
      console.log(e), this.setState({ imageModalVisible: false })
    });
  }

  insertIngredients = () => {
    this.props.navigation.navigate('Ingredients')
  };

  selectPhoto = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 400,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true,
      includeBase64: true
    }).then(response => {
      this.setState({ imageModalVisible: false })

      this.props.navigation.navigate('Result', {
        skin: this.state.skin,
        notes: this.state.notes,
        percent: this.state.percent,
      });

      fetch("http://178.128.121.52/uploadImage.php", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          image_name: response.modificationDate,
          image_data: response.data,
        })
      }).then((response) => response.text())
        .then((responseJson) => {

          console.log(responseJson)
          var result = JSON.parse(responseJson)

          this.setState({
            // ing: result.Ingredients,
            skin: result.Skin,
            notes: result.Notes,
            percent: result.Percent
          })
          this.props.navigation.navigate('Result', {
            skin: this.state.skin,
            notes: this.state.notes,
            percent: this.state.percent,
          });

        }).catch((error) => {
          alert("There is a network error. Please try again.")
          console.log(error);
        });

    }).catch(e => {
      console.log(e), this.setState({ imageModalVisible: false })
    });
  }

  render() {

    return (

      <View style={styles.ContentContainer}>
        <StatusBar backgroundColor="#512DA8" barStyle="light-content" />
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={{ borderColor: "#673AB7", padding: 15, borderWidth: 8, fontFamily: 'Montserrat-Bold', fontSize: 30, textAlign: 'center', margin: 10 }}>This is {"\n"}your first {"\n"}skin care {"\n"}journey!</Text>
          <Button style={[styles.button, { width: 200 }]} mode="contained" icon="image" onPress={this.selectPhoto}>Select Image</Button>
          <Button style={[styles.button, { width: 200 }]} mode="contained" icon="camera" onPress={this.openCamera}>Take Photo</Button>
        </View>
      </View >
    );

  }
}

export default (Scan);