import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Text } from 'react-native';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';

class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      username: '',
      visible: false,
      color: null,
      response: null,
      alert: null
    }
  }

  async componentDidMount() {
    this.setState({
      alert: 'Information',
      color: '#00B3C4',
      response: 'You will be logged out.',
      visible: true
    });
  }

  Logout = () => {
    AsyncStorage.removeItem('isLoggedIn');
    AsyncStorage.removeItem('username');

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Auth' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {

    return (
      <Provider>
        <Portal>
          <Dialog
            style={{ borderRadius: 10, }}
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            dismissable={false}>
            <Dialog.Title style={{ color: this.state.color }}>{this.state.alert}</Dialog.Title>
            <Dialog.Content>
              <Text>{this.state.response}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.Logout}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    )
  }
}

export default Logout;