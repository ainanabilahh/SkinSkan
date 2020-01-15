import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Animated, Image, StatusBar, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import styles from '../css/styles';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      hidePassword: true,
      loading: false
    }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  _login = async () => {

    if (!this.state.username || !this.state.password) return;
    this.setState({ loading: true })

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

        this.setState({ loading: false });

        if (responseJson.message === 'Data Matched') {

          AsyncStorage.setItem('isLoggedIn', '1');
          AsyncStorage.setItem('username', this.state.username);

          if (responseJson.status == 0) {
            this.props.navigation.navigate('Homepage');
            alert("You are required to insert your product preferences before proceed.");
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
    );
  }
}

export default Login;