import CameraRoll from "@react-native-community/cameraroll";
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'
import styles from '../css/styles';

class UploadImage extends Component {

    componentDidMount() {
        
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

    render() {

        return (null)

    }
}

export default UploadImage;
