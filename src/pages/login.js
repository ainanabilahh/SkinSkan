import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Animated, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import styles from '../css/styles';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      hidePassword: true,
      slideUp: new Animated.Value(0),
      slideDown: new Animated.Value(0),
    }
  }

  componentDidMount() {
    return Animated.parallel([
      Animated.timing(this.state.slideUp, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.slideDown, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
    ]).start();
  };

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  authenticate = async (username) => {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('isLoggedIn', '1');
  }

  _login = () => {

    if (!this.state.username || !this.state.password) return;

    fetch('http://178.128.121.52/login.php', {
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

          this.authenthicate(this.state.username);

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

    let { slideUp, slideDown } = this.state;

    return (

      <View style={styles.MainContainer}>
        <StatusBar backgroundColor="#512DA8" barStyle="light-content" />
        <Animated.View
          style={{
            transform: [
              {
                translateY: slideDown.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-1000, 0]
                })
              }
            ],
          }}
        >
          <View>
            <Avatar.Image size={200} source={require('../images/1.png')} />
          </View>
        </Animated.View>
        <Text style={{ paddingVertical: 10, color: '#fff', fontSize: 25, fontFamily: 'Montserrat-ExtraBold' }}>Sign In</Text>
        <Animated.View
          style={{
            transform: [
              {
                translateY: slideUp.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1000, 0]
                })
              }
            ],
          }}
        >
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

            <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
              <Image source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
            </TouchableOpacity>
          </View>

          <Button style={[styles.button, styles.whiteButton]} mode="outlined" icon="check" onPress={this._login} >Sign In</Button>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Do not have an account yet?</Text>
            <TouchableOpacity onPress={this.CreateUser}><Text style={styles.footerButton}> Sign up</Text></TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default Login;