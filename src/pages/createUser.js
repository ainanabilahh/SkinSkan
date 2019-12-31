import React, { Component } from 'react';
import { Overlay, Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, ActivityIndicator, TextInput, Avatar } from 'react-native-paper';
import styles from '../css/styles';

class CreateUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      hidePassword: true,
      slideUp: new Animated.Value(0),
      slideDown: new Animated.Value(0),
      create: false,
      isVisible: true
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

  validate = (username, email, password) => {
    var u = /^(([a-zA-Z0-9]{5,15}$))/
    var e = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var p = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

    if (u.test(username) == false)
      alert("Username must be between 5 to 15 characters and only contained letters and numbers.")

    if (e.test(email) == false)
      alert("Email is not valid.")

    if (p.test(password) == false)
      alert("Your password must contain at least one lowercase letter, one number digit and more than 6 characters.")

    if (u.test(username) == true && e.test(email) == true && p.test(password) == true)
      return true;
    else
      return false;
  }

  CreateUser = () => {

    var validate = this.validate(this.state.username, this.state.email, this.state.password)
    this.setState({ create: true });

    if (validate == true) {
      fetch('https://www.skinskan.me/register.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          username: this.state.username,
          email: this.state.email,
          password: this.state.password

        })

      }).then((response) => response.json())
        .then((responseJson) => {

          alert(responseJson.message);

          if (responseJson.message === 'User created.') {
            this.props.navigation.navigate("Login");
          }

        }).catch((error) => {
          alert("There is a network error. Please try again.")
          console.log(error);
        });
    }
  }

  Login = () => {
    this.props.navigation.navigate("Login");
  };

  render() {

    let { slideUp, slideDown } = this.state;

    if (this.state.create) {
      return (
        <Overlay height={200} isVisible={this.state.isVisible}>
          <View>
            <Text style={{ paddingTop: 20, textAlign: "center" }}>This will take a moment.</Text>
            <ActivityIndicator
              animating={true}
              style={styles.indicator}
              size="large"
            />
          </View>
        </Overlay>
      );
    }

    return (

      <View style={styles.MainContainer}>
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
            <Avatar.Image size={200} source={require('../images/2.png')} />
          </View>
        </Animated.View>
        <Text style={{ paddingVertical: 10, color: '#fff', fontSize: 25, fontFamily: 'Montserrat-ExtraBold' }}>Sign Up</Text>
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
          <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center', fontFamily: 'Montserrat-ExtraBold' }}><Text style={{ color: 'red' }}>* </Text>Username cannot be changed later. {"\n"} Choose carefully.</Text>
          <TextInput
            mode="flat"
            label="Username"
            value={this.state.username}
            onChangeText={username => this.setState({ username })} underlineColorAndroid='transparent'
            style={styles.inputBox}
          />
          <TextInput
            mode="flat"
            type="email"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            underlineColorAndroid='transparent'
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

          <Button style={[styles.button, styles.whiteButton]} icon="add" mode="outlined" onPress={this.CreateUser} >Sign Up</Button>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={this.Login}><Text style={styles.footerButton}> Sign in</Text></TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default CreateUser;