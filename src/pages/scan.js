import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Text, BackHandler, StatusBar, View } from 'react-native';
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
      result: [],
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
        body: JSON.stringify({
          username: username,
          image_name: response.modificationDate,
          image_data: response.data,
        })
      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({ result: JSON.parse(responseJson) })
          for (var i = 0; i < this.state.result.length; i++) {
            console.log(this.state.result[i].index);
          }
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
      }).then((response) => response.text())
        .then((responseJson) => {

          console.log(responseJson)
          result = responseJson.split(", ");
          console.log(result)
          var data = "[{ 'Note': 'Silicone', 'Qty': '2' }, { 'Note': 'Alcohol', 'Qty': '1' }, { 'Note': 'Allergen', 'Qty': '1' }, { 'Note': 'Anti-Aging', 'Qty': '2' }, { 'Note': 'Acne-Fighting', 'Qty': '1' }, { 'Note': 'Promotes Wound Healing', 'Qty': '3' }, { 'Note': 'Good for Dry Skin', 'Qty': '5' }, { 'Note': 'Comedogenic Rating (1)', 'Qty': '2' }, { 'Note': 'Comedogenic Rating (2)', 'Qty': '2' }, { 'Note': 'Comedogenic Rating (3)', 'Qty': '1' }]";
          this.setState({ result: data })
          this.props.navigation.navigate('Result', { result: this.state.result })

        }).catch((error) => {
          console.error(error);
        });

    }).catch(e => {
      console.log(e), this.setState({ imageModalVisible: false })
    });
  }

  /*componentDidMount() {
    var data1 = [{'Note': 'Silicone', 'Qty': '2'}, {'Note': 'Alcohol', 'Qty': '1'}, {'Note': 'Allergen', 'Qty': '1'}, {'Note': 'Anti-Aging', 'Qty': '2'}, {'Note': 'Acne-Fighting', 'Qty': '1'}, {'Note': 'Promotes Wound Healing', 'Qty': '3'}, {'Note': 'Good for Dry Skin', 'Qty': '5'}, {'Note': 'Comedogenic Rating (1)', 'Qty': '2'}, {'Note': 'Comedogenic Rating (2)', 'Qty': '2'}, {'Note': 'Comedogenic Rating (3)', 'Qty': '1'}];
    console.log(data1)
    var aina = '{"username":"aina","age":"21","usesarname":"aidsna","agae":"21das"}'

    var result = "[{'Note': 'Silicone','Qty': '1'}, {'Note': 'Anti-Aging','Qty': '2'}, {'Note': 'Acne-Fighting','Qty': '1'}, {'Note':'Promotes Wound Healing','Qty': '3'}, {'Note': 'Good for Dry Skin','Qty': '5'}, {'Note': 'Comedogenic Rating (1)','Qty': '2'}, {'Note': 'Comedogenic Rating (2)','Qty': '2'}, {'Note': 'Comedogenic Rating (3)','Qty': '1'}][{'Note': 'Silicone','Qty': '1'}, {'Note': 'Anti-Aging', 'Qty': '2'}, {'Note': 'Acne-Fighting', 'Qty': '1'}, {'Note': 'Promotes Wound Healing', 'Qty': '3'}, {'Note': 'Good for Dry Skin', 'Qty': '5'}, {'Note': 'Comedogenic Rating (1)', 'Qty': '2'}, {'Note': 'Comedogenic Rating (2)', 'Qty': '2'}, {'Note': 'Comedogenic Rating (3)', 'Qty': '1'}]";
    console.log(JSON.parse(aina))
    //result = JSON.stringify(result)
    result = result.slice(1, -1);
    result = result.split(", ");
    //result = result.replace(/"/g,"");
    

    for (i = 0; i < 10; i++) {
      console.log(result[i])
    }
    console.log(result)
  }*/

  render() {

    return (
      <View style={styles.ContentContainer}>
        <StatusBar backgroundColor="#512DA8" barStyle="light-content" />
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 30, textAlign: 'center', margin: 40}}>This is your first skin care journey!</Text>
          <Button style={[styles.button, {width:200}]} mode="contained" icon="image" onPress={this.selectPhoto}>Select Image</Button>
          <Button style={[styles.button, {width:200}]} mode="contained" icon="camera" onPress={this.openCamera}>Take Photo</Button>
        </View>
      </View >
    );

  }
}

export default (Scan);