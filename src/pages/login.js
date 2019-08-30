import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Alert, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  _login = async () => {

    if (!this.state.username || !this.state.password) return;

    await AsyncStorage.setItem('isLoggedIn', '1');
    await AsyncStorage.setItem('username', this.state.username);

    fetch('http://192.168.49.185/skinskan/login.php', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson === 'Data Matched') {
          this.props.navigation.navigate('Homepage');
        }
        else {
          Alert.alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });
  }

  CreateUser = () => {
    this.props.navigation.navigate("CreateUser");
  };

  render() {
    return (

      <View style={[styles.MainContainer, { backgroundColor: '#70ebdb' }]}>
        <StatusBar backgroundColor="#70ebdb" barStyle="light-content" />
        <View style={styles.LogoContainer}>
          <Image style={{ width: 200, height: 227 }} source={require('../images/login.png')} resizeMode="contain" />
        </View>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={TextInputValue => this.setState({ username: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.inputBox}
        />

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          style={styles.inputBox}
        />

        <TouchableOpacity activeOpacity={.4} style={[styles.button, { width: 300, backgroundColor: '#fff' }]} onPress={this._login} >
          <Text style={[styles.buttonText, { color: '#70ebdb' }]}> Sign In </Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Do not have an account yet?</Text>
          <TouchableOpacity onPress={this.CreateUser}><Text style={styles.footerButton}> Sign up</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;