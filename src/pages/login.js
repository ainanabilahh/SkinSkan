import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from '../css/styles';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      hidePassword: true
    }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  _login = async () => {

    if (!this.state.username || !this.state.password) return;

    await AsyncStorage.setItem('isLoggedIn', '1');
    await AsyncStorage.setItem('username', this.state.username);

    fetch('http://178.128.51.213/login.php', {
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
          if (responseJson.status == 0) {
            this.props.navigation.navigate('Skin');
          }
          else if (responseJson.status == 1) {
            this.props.navigation.navigate('Homepage');
          }
        }
        else {
          alert(responseJson.message);
        }

      }).catch((error) => {
        alert("There is a network error. Please try again.")
        console.log(error);
      });
  }

  CreateUser = () => {
    this.props.navigation.navigate("CreateUser");
  };

  render() {
    return (

      <View style={styles.MainContainer}>
        <StatusBar backgroundColor="#512DA8" barStyle="light-content" />
        <View style={styles.LogoContainer}>
          <Image style={{ width: 300, height: 244 }} source={require('../images/1.png')} resizeMode="contain" />
        </View>
        <Text style={{ color: '#673AB7', fontSize: 25, fontWeight: 'bold' }}>SIGN IN</Text>
        <TextInput
          mode="outlined"
          label="Username"
          autoCapitalize="none"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          style={styles.inputBox}
        />
        <View style={styles.textBoxBtnHolder}>
          <TextInput
            mode="outlined"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })} underlineColorAndroid='transparent'
            style={styles.inputBox}
            secureTextEntry={this.state.hidePassword}
          />

          <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
            <Image source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
          </TouchableOpacity>
        </View>

        <Button style={[styles.button, { width: 300 }]} mode="contained" icon="check" onPress={this._login} >Sign In</Button>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Do not have an account yet?</Text>
          <TouchableOpacity onPress={this.CreateUser}><Text style={styles.footerButton}> Sign up</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;