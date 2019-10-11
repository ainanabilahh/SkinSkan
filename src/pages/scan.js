import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { BackHandler, StatusBar, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from 'react-native-paper';
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
      result: null,
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

      this.props.navigation.navigate('Result', { result: this.state.result })

      fetch("http://192.168.49.185/skinskan/uploadImage.php", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: console.log(JSON.stringify({
          username: username,
          image_name: response.modificationDate,
          image_data: response.data,
        }))
      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({ result: responseJson })
          this.props.navigation.navigate('Result', { result: this.state.result })

        }).catch((error) => {
          console.error(error);
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

      this.props.navigation.navigate('Result', { result: this.state.result })

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
      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({ result: responseJson })
          this.props.navigation.navigate('Result', { result: this.state.result })

        }).catch((error) => {
          console.error(error);
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
          <Button style={styles.button} mode="contained" icon="check" onPress={this.selectPhoto}>Select Image</Button>
          <Button style={styles.button} mode="contained" icon="check" onPress={this.openCamera}>Take Photo</Button>
        </View>
      </View >
    );

  }
}

export default (Scan);