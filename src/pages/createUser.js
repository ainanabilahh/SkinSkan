import React, { Component } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Button, Dialog, HelperText, Portal, Provider, TextInput } from 'react-native-paper';
import styles from '../css/styles';

class CreateUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      hidePassword: true,
      create: false,
      isVisible: true,
      visible: false,
      color: null,
      response: null,
      alert: null,
      loading: false
    }
  }

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
    this.setState({ loading: true })

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

          this.setState({
            loading: false,
            alert: 'Success',
            color: '#5CA51C',
            response: responseJson.message,
            visible: true
          });

          console.log(responseJson.message)
          // if (responseJson.message === 'User created.') {
          //   this.props.navigation.navigate("Login");
          // }

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

    return (

      <Provider>
        <Portal>
          <Dialog
            style={{ borderRadius: 10 }}
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            dismissable={true}>
            <Dialog.Title style={{ fontFamily: 'Proxima Nova Bold', color: this.state.color }}>{this.state.alert}</Dialog.Title>
            <Dialog.Content>
              <Text style={{ fontFamily: 'ProximaNova-Regular' }}>{this.state.response}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => this.props.navigation.navigate("Login")}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={[styles.MainContainer, { justifyContent: 'flex-start', paddingTop: 50 }]}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View>
            <TextInput
              mode="flat"
              label="Username"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              underlineColorAndroid='transparent'
              style={styles.inputBox}
            />
            <HelperText
              type="info"
              style={{ fontFamily: 'ProximaNova-Regular', marginLeft: 60 }}
              visible={true}
            >
              Username cannot be changed later.
        </HelperText>
          </View>
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
              onChangeText={password => this.setState({ password })}
              underlineColorAndroid='transparent'
              style={styles.inputBox}
              secureTextEntry={this.state.hidePassword}
            />

            <TouchableOpacity activeOpacity={0.8}
              style={styles.visibilityBtn}
              onPress={this.managePasswordVisibility}>
              <Image
                opacity={0.5}
                source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')}
                style={styles.btnImage} />
            </TouchableOpacity>
          </View>
          <View
            style={styles.buttonContainer}>
            <Button
              loading={this.state.loading ? true : false}
              style={[styles.button, { marginVertical: 20, width: 0.80 * Dimensions.get('window').width, }]}
              mode="contained"
              icon="person-add"
              onPress={this.CreateUser}>
              Sign Up
           </Button>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={this.Login}>
              <Text style={styles.footerButton}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Provider>
    );
  }
}

export default CreateUser;