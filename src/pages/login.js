import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Animated, Dimensions, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
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

  _login = async () => {

    if (!this.state.username || !this.state.password) return;

    await AsyncStorage.setItem('isLoggedIn', '1');
    await AsyncStorage.setItem('username', this.state.username);

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
        <Svg height={300} width={Dimensions.get('window').width}>
          <Path
            d="M-17.5 378.5C31.5 32.5 302.5 463 375 89C447.5 -285 375 644 375 644H0C0 644 -66.5 724.5 -17.5 378.5Z" // put your path here
            fill='#673AB7'
          />
          <View>
            <Image style={{ width: 300, height: 244 }} source={require('../images/1.png')} resizeMode="contain" />
          </View>
        </Svg>
        <View style={{ backgroundColor: '#673AB7' }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 25, fontFamily: 'Montserrat-ExtraBold' }}>Sign In</Text>
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

            <Button style={[styles.button, { backgroundColor: '#fff' }]} mode="flat" icon="check" onPress={this._login} >Sign In</Button>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Do not have an account yet?</Text>
              <TouchableOpacity onPress={this.CreateUser}><Text style={styles.footerButton}> Sign up</Text></TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default (Login);