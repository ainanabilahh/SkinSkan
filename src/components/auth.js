
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from '../css/styles';

class AuthLoadingScreen extends Component {

  constructor(props) {
    super(props)
      this.loadData();
  }

  loadData = async() => {
    
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')

      if(isLoggedIn == null) {

        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
      }
      else
        this.props.navigation.navigate('Homepage');

    }catch(error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.MainContainer }>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    )
  }

}

export default AuthLoadingScreen;