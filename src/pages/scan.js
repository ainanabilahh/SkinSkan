import React, { Component } from 'react';
import { BackHandler, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';

class Scan extends Component {

  state = {
    progress: 20,
    progressWithOnComplete: 0,
    progressCustomized: 0,
  }

  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }

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
          <Image style={{ marginTop: 40, width: 280, height: 295 }} source={require('../images/steps.png')} />
          <View style={styles.TextInputContainer}>
            <TouchableOpacity activeOpacity={.4} style={[styles.button, { borderRadius: 0, width: 280, marginVertical: 0, backgroundColor: '#70ebdb' }]} onPress={this.Camera} >
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