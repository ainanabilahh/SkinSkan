import React, { Component } from 'react';
import { BackHandler, StatusBar, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import styles from '../css/styles';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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
      username: '',
      result: null,
      photo: null,
      selectedOption: '',
      imageModalVisible: true
    }
  }

  handleImage = () => {

    let body = new FormData();

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const base64 = { uri: response.data };

        this.setState({
          photo: source,
        });

        body.append('photo', { uri: base64, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });
        body.append('Content-Type', 'image/png');

        fetch("http://192.168.49.185/skinskan/uploadImage.php", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: console.log(JSON.stringify({
            username: "yang",
            image_name: response.fileName,
            image_data: response.data,
          }))
        }).then((response) => response.json())
          .then((responseJson) => {

            this.props.navigation.navigate('Result', { result: this.state.result })

          }).catch((error) => {
            console.error(error);
          });


        /*fetch("http://192.168.49.185/skinskan/uploadImage.php", {
          method: "POST",
          body: console.log(createFormData(this.state.photo, { username: "yang" }))
        })
          .then(response => response.json())
          .then(response => {
            console.log("upload succes", response);
            alert("Upload success!");
            this.setState({ photo: null });
          })
          .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
          });*/
      }
    });
  }

  Camera = () => {
    this.props.navigation.navigate('Camera')
  }
  Scan = () => {
    this.props.navigation.navigate('Ingredients')
  }


  render() {

    return (
      <View style={styles.ContentContainer}>
        <StatusBar backgroundColor="#512DA8" barStyle="light-content" />
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Button style={styles.button} mode="contained" icon="check" onPress={this.selectPhoto}>Select Image</Button>
        </View>
      </View >
    );

  }
}

export default (Scan);