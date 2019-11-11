import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from '../css/styles';

class CreateUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      hidePassword: true
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
      alert("Username must be more than 5 characters.")

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

    if (validate == true) {
      fetch('http://178.128.121.52/register.php', {
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

  GoTo_Show_StudentList_Activity_Function = () => {
    this.props.navigation.navigate('Third');
  }

  render() {
    return (

      <View style={styles.MainContainer}>
        <View style={styles.LogoContainer}>
          <Image style={{ width: 300, height: 244 }} source={require('../images/2.png')} resizeMode="contain" />
        </View>
        <Text style={{ color: '#673AB7', fontSize: 25, fontWeight: 'bold' }}>SIGN UP</Text>
        {/*<Text style={{ fontSize: 12, color: '#ccc' }}>*Username cannot be changed later. Choose carefully.</Text>*/}
        <TextInput
          mode="outlined"
          label="Username"
          value={this.state.username}
          onChangeText={username => this.setState({ username })} underlineColorAndroid='transparent'
          style={styles.inputBox}
        />
        <TextInput
          mode="outlined"
          type="email"
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          underlineColorAndroid='transparent'
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

        <Button style={[styles.button, { width: 300 }]} icon="add" mode="contained" onPress={this.CreateUser} >Sign Up</Button>

        {/*<TouchableOpacity activeOpacity = { .4 } style={styles.buttonL} onPress={this.GoTo_Show_StudentList_Activity_Function} >
          <Text style={styles.buttonText}> SHOW ALL INSERTED STUDENT RECORDS IN LISTVIEW </Text>
          </TouchableOpacity>*/}

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={this.Login}><Text style={styles.footerButton}> Sign in</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CreateUser;