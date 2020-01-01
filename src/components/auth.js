
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { BackHandler, Alert, ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from '../css/styles';

class AuthLoadingScreen extends Component {

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')

      if (isLoggedIn == null) {

        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
      }
      else
        this.props.navigation.navigate('Homepage');

    } catch (error) {
      console.error(error);
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }

}

export default AuthLoadingScreen;