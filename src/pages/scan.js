import React, { Component } from 'react';
import { BackHandler, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';

class Scan extends Component {

  componentDidMount() {
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
      username: ''
    }
  }

  flash = () => {
    if (this.state.flashMode == RNCamera.Constants.FlashMode.off) {
      this.setState({ flashMode: RNCamera.Constants.FlashMode.torch });
    } else this.setState({ flashMode: RNCamera.Constants.FlashMode.off });
  };

  takePicture = async () => {
    const { memoStore } = this.props.store;
    try {
      memoStore.loaderTrue();
      console.log('try', memoStore.loader);
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      this.props.store.memoStore.addItem(visionResp);
      console.log('visionResp', visionResp);
    } catch (e) {
      console.warn(e);
    }
    memoStore.loaderFalse();
    let id = memoStore.memoArray.length - 1;
    memoStore.setEditId(parseInt(id));
    this.props.navigation.navigate('MemoView', {
      otherParam: id,
    });
    console.log('try outside', memoStore.loader);
  };


  Scan = () => {
    this.props.navigation.navigate('Camera')
  };

  render() {

    return (
      <View style={styles.ContentContainer}>
        <StatusBar backgroundColor="#512DA8" barStyle="light-content" />
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image style={{ marginTop: 40, width: 280, height: 295 }} source={require('../images/steps.png')} />
          <View style={styles.TextInputContainer}>
            <TouchableOpacity activeOpacity={.4} style={[styles.button, { borderRadius: 0, width: 280, marginVertical: 0, backgroundColor: '#70ebdb' }]} onPress={this.Scan} >
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image style={{ width: 27, height: 27 }} source={require('../images/numbers/006-four.png')} />
                <Text style={styles.buttonText}> Start Scan </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    );

  }
}

export default (Scan);