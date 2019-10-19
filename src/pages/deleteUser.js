import AsyncStorage from '@react-native-community/async-storage';
import { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';

class DeleteUser extends Component {

  render() {
    return (null);
  }

  abortController = new AbortController()

  async componentDidMount() {

    fetch('http://192.168.49.185/skinskan/deleteUser.php', {
      signal: this.abortController.signal,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        username: username,

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        alert(responseJson);

      }).catch((error) => {
        alert("There is a network error. Please try again.")
        console.log(error);
      });

    AsyncStorage.removeItem('isLoggedIn');
    AsyncStorage.removeItem('username');

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Auth' })],
    });
    this.props.navigation.dispatch(resetAction);

  }

}

export default DeleteUser;