import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

class Logout extends React.Component {

  render() {
    return (null);
  }

  static navigationOptions = () => {
    return {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.state.params.Logout();
        defaultHandler();
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      username: '',
   }
    props.navigation.setParams({
      Logout: this.Logout,
    });
  }

  Logout = async () => {
    AsyncStorage.removeItem('isLoggedIn');
    AsyncStorage.removeItem('username');
    
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Auth' })],
    });
    this.props.navigation.dispatch(resetAction);

    Alert.alert('You have been logged out.');

  };

}

export default Logout;