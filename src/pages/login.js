import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import styles from '../css/styles';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      hidePassword: true,
      loading: false,
      visible: false,
      color: null,
      response: null,
      alert: null,
      create: false,
    }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  validate = (username, password) => {

    if (username == null || password == null) {
      this.setState({
        alert: 'Error',
        loading: false,
        color: '#E22E16',
        response: 'Please fill in the blank.',
        visible: true
      });
    }

    if (username != null && password != null) {
      return true
    }
    else return false;
  }

  _login = async () => {

    this.setState({ loading: true })
    var validate = this.validate(this.state.username, this.state.password)

    if (validate == true) {
      fetch('https://www.skinskan.me/login.php', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.message === 'Data Matched') {
            AsyncStorage.setItem('isLoggedIn', '1');
            AsyncStorage.setItem('username', this.state.username);
            this.props.navigation.navigate('Homepage');
            this.setState({
              loading: false,
              alert: 'Success',
              color: '#5CA51C',
              response: responseJson.message,
              visible: true,
              loading: false,
              create: true
            })
          }
          else {
            this.setState({
              loading: false,
              alert: 'Error',
              color: '#E22E16',
              response: responseJson.message,
              visible: true,
            });
          }

        }).catch((error) => {
          alert("There is a network error. Please try again.")
          console.log(error);
        });
    }
  }

  CreateUser = () => {
    this.props.navigation.navigate("CreateUser");
  };

  render() {

    return (

      <Provider>
        <Portal>
          <Dialog
            style={{ borderRadius: 10, }}
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            dismissable={true}>
            <Dialog.Title style={{ fontFamily: 'Proxima Nova Bold', color: this.state.color }}>{this.state.alert}</Dialog.Title>
            <Dialog.Content>
              <Text style={{ fontFamily: 'ProximaNova-Regular' }}>{this.state.response}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.state.create ? () => { this.props.navigation.navigate("Home"); this.setState({ visible: false }) } : () => this.setState({ visible: false })}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={[styles.MainContainer, { justifyContent: 'flex-start', paddingTop: 50 }]}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <TextInput
            mode="flat"
            label="Username"
            autoCapitalize="none"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            style={styles.inputBox}
          />
          <View style={styles.textBoxBtnHolder}>
            <TextInput
              mode="flat"
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })} underlineColorAndroid='transparent'
              style={styles.inputBox}
              secureTextEntry={this.state.hidePassword}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.visibilityBtn}
              onPress={this.managePasswordVisibility}>
              <Image
                opacity={0.5}
                source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')}
                style={styles.btnImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              loading={this.state.loading ? true : false}
              style={[styles.button, { marginVertical: 20, width: 0.80 * Dimensions.get('window').width, }]}
              mode="contained"
              icon="person"
              onPress={this._login}>
              Sign In
           </Button>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Do not have an account yet?</Text>
            <TouchableOpacity onPress={this.CreateUser}>
              <Text style={styles.footerButton}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Provider>
    );
  }
}

export default Login;