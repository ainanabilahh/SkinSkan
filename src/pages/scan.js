import React, { Component } from 'react';
import { Alert, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';
import { NavigationActions, SwitchActions, StackActions } from 'react-navigation';

class Scan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: ''
    }
  }

  Scan = () => {
    this.props.navigation.navigate('Camera')
  };

  render() {

    return (
      <View style={styles.ContentContainer}>
        <StatusBar backgroundColor="#70ebdb" barStyle="light-content" />
        <View style={[styles.header, { height: 136 }]}>
          <Image style={[styles.avatar, { flex: 1, marginTop: 76 }]} source={require('../images/002-serum.png')} />
          <Text style={styles.headerText}>Scan Ingredients</Text>
        </View>
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
      </View>
    );

  }
}

export default (Scan);