import CameraRoll from "@react-native-community/cameraroll";
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'
import styles from '../css/styles';

class Camera extends Component {

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access storage',
          message:
            'We need your permission to acess your storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permission to write storage',
          message:
            'We need your permission to write to your storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /*saveToCameraRoll = (image) => {
    if (Platform.OS === 'android') {
      RNFetchBlob
        .config({
          fileCache: true,
          appendExt: 'jpg'
        })
        .fetch('GET', image.urls.small)
        .then((res) => {
          CameraRoll.saveToCameraRoll(res.path())
            .then(Alert.alert('Success', 'Photo added to camera roll!'))
            .catch(err => console.log('err:', err))
        })
    } else {
      CameraRoll.saveToCameraRoll(image.urls.small)
        .then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }*/

  takePicture = async () => {

    if (this.camera) {
      const options = { quality: 0.5, base64: false };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);

      let body = new FormData();
      body.append('photo', { uri: imagePath, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });
      body.append('Content-Type', 'image/png');

      fetch('http://192.168.49.185/skinskan/uploadImage.php', {
        method: 'POST',
        headers: { "Content-Type": "multipart/form-data", "otherHeader": "foo", },
        body: body
      })
        .then((res) => checkStatus(res))
        .then((res) => res.json())
        .then((res) => { console.log("response" + JSON.stringify(res)); })
        .catch((e) => console.log(e))
        .done()
    }
    /*var promise = CameraRoll.saveToCameraRoll(data.uri);
    promise.then(function (result) {
      console.log(result);
    }).catch(function (error) {
      console.log(error);
    });*/
  }
};
}

export default Camera;
