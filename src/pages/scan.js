import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Image, RefreshControl, ScrollView, View, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import styles from '../css/styles';


class Scan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
      // ing: [],
      // ingY: [],
      // ingArr: [],
      imageModalVisible: true,
      visible: false,
      color: null,
      response: null,
      alert: null,
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
        if (responseJson.skin_input == 0) {
          this.setState({
            visible: true
          });
        }
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

          this.props.navigation.navigate('Result', {
            username: username,
            effects: JSON.parse(responseJson).Effects,
            skin: JSON.parse(responseJson).Skin,
            notes: JSON.parse(responseJson).Notes,
            percent: JSON.parse(responseJson).Percent
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
          this.props.navigation.navigate('Result', {
            username: username,
            effects: JSON.parse(responseJson).Effects,
            skin: JSON.parse(responseJson).Skin,
            notes: JSON.parse(responseJson).Notes,
            percent: JSON.parse(responseJson).Percent
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

      <Provider>
        <Portal>
          <Dialog
            style={{ borderRadius: 10, }}
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            dismissable={true}>
            <Dialog.Title style={{ fontFamily: 'Proxima Nova Bold', color: '#E22E16' }}>Error</Dialog.Title>
            <Dialog.Content>
              <Text style={{ fontFamily: 'ProximaNova-Regular' }}>You are required to insert your product preferences before proceed.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { this.props.navigation.navigate("Skin"); this.setState({ visible: false }) }}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ScrollView
          style={{ backgroundColor: '#FFFFFF' }}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={this._refreshControl()}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text style={{ borderColor: "#673AB7", padding: 15, borderWidth: 8, fontFamily: 'Montserrat-Bold', fontSize: 30, textAlign: 'center', margin: 10 }}>This is {"\n"}your first {"\n"}skin care {"\n"}journey!</Text> */}
            <Image
              style={{ marginBottom: 50, width: 300, height: 156 }}
              source={require('../images/home2.png')}
              onPress={this.openCamera} />
            {(this.state.skin_input == 0) ? (
              <View>
                <Button
                  style={[styles.button, { width: 300 }]}
                  mode="contained"
                  icon="image"
                  onPress={() => this.setState({ visible: true })}>Select Image</Button>
                <Button
                  style={[styles.button, { width: 300 }]}
                  mode="contained"
                  icon="camera"
                  onPress={() => this.setState({ visible: true })}>Take Photo</Button>
              </View>) : (
                <View>
                  <Button
                    style={[styles.button, { width: 300 }]}
                    mode="contained"
                    icon="image"
                    onPress={this.selectPhoto}>Select Image</Button>
                  <Button
                    style={[styles.button, { width: 300 }]}
                    mode="contained"
                    icon="camera"
                    onPress={this.openCamera}>Take Photo</Button>
                </View>)}
          </View>
        </ScrollView>
      </Provider>
    );

  }
}

export default (Scan);