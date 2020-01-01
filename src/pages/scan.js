import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { RefreshControl, ScrollView, StatusBar, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from 'react-native-paper';
import styles from '../css/styles';

class Scan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
      username: '',
      result: '',
      // ing: [],
      notes: null,
      percent: null,
      skin: null,
      effects: null,
      // ingY: [],
      // ingArr: [],
      imageModalVisible: true,
      skin_input: 0
    }
  }

  async componentDidMount() {

    username = await AsyncStorage.getItem('username');

    fetch('https://www.skinskan.me/viewSkin.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          skin_input: responseJson.skin_input
        })
        console.log(this.state.skin_input)
      }).catch((err) => {
        alert("There is a network error. Please try again.")
        if (err.name == 'AbortError') return
        throw err
      });
  }

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this.componentDidMount()} />
    )
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
        username: username,
        effects: this.state.effects,
        skin: this.state.skin,
        notes: this.state.notes,
        percent: this.state.percent,
      });

      fetch("https://www.skinskan.me/uploadImage.php", {
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
            effects: result.Effects,
            skin: result.Skin,
            notes: result.Notes,
            percent: result.Percent
          })
          this.props.navigation.navigate('Result', {
            username: username,
            effects: this.state.effects,
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
        username: username,
        effects: this.state.effects,
        skin: this.state.skin,
        notes: this.state.notes,
        percent: this.state.percent,
      });

      fetch("https://www.skinskan.me/uploadImage.php", {
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
            effects: result.Effects,
            skin: result.Skin,
            notes: result.Notes,
            percent: result.Percent
          })
          this.props.navigation.navigate('Result', {
            username: username,
            effects: this.state.effects,
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

      <ScrollView refreshControl={this._refreshControl()}>
        <View style={styles.ContentContainer}>
          <StatusBar backgroundColor="#512DA8" barStyle="light-content" />
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ borderColor: "#673AB7", padding: 15, borderWidth: 8, fontFamily: 'Montserrat-Bold', fontSize: 30, textAlign: 'center', margin: 10 }}>This is {"\n"}your first {"\n"}skin care {"\n"}journey!</Text>
            {(this.state.skin_input == 0) ? (
              <View>
                <Button style={[styles.button, { width: 200 }]} mode="contained" icon="image" onPress={() => alert("You are required to insert your product preferences before proceed.")}>Select Image</Button>
                <Button style={[styles.button, { width: 200 }]} mode="contained" icon="camera" onPress={() => alert("You are required to insert your product preferences before proceed.")}>Take Photo</Button>
              </View>) : (
                <View>
                  <Button style={[styles.button, { width: 200 }]} mode="contained" icon="image" onPress={this.selectPhoto}>Select Image</Button>
                  <Button style={[styles.button, { width: 200 }]} mode="contained" icon="camera" onPress={this.openCamera}>Take Photo</Button>
                </View>)}

          </View>
        </View >
      </ScrollView>
    );

  }
}

export default (Scan);