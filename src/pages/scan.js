import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Text, BackHandler, StatusBar, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, Chip } from 'react-native-paper';
import styles from '../css/styles';

class Scan extends Component {

  async componentDidMount() {
    username = await AsyncStorage.getItem('username') || 'undefined';
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  onBackButtonPressed() {
    return true;
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: '',
      result: '',
      ing: [],
      notes: [],
      ingY: [],
      ingArr: [],
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
        ing: this.state.ing,
        notes: this.state.notes
      });

      fetch("http://192.168.49.185/skinskan/uploadImage.php", {
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

          var result = JSON.parse(responseJson)
          this.setState({ ing: result.Ingredients })
          this.setState({ notes: result.Notes })
          this.props.navigation.navigate('Result', {
            ing: this.state.ing,
            notes: this.state.notes
          });

        }).catch((error) => {
          alert("There is a network error. Please try again.")
          console.log(error);
        });

    }).catch(e => {
      console.log(e), this.setState({ imageModalVisible: false })
    });
  }

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
        ing: this.state.ing,
        notes: this.state.notes
      });

      fetch("http://192.168.49.185/skinskan/uploadImage.php", {
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

          var result = JSON.parse(responseJson)
          this.setState({ ing: result.Ingredients })
          this.setState({ notes: result.Notes })
          this.props.navigation.navigate('Result', {
            ing: this.state.ing,
            notes: this.state.notes
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
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 30, textAlign: 'center', margin: 40 }}>This is your first skin care journey!</Text>
          <Button style={[styles.button, { width: 200 }]} mode="contained" icon="image" onPress={this.selectPhoto}>Select Image</Button>
          <Button style={[styles.button, { width: 200 }]} mode="contained" icon="camera" onPress={this.openCamera}>Take Photo</Button>
        </View>
      </View >
    );

  }
}

export default (Scan);