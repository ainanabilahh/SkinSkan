import React, { Component } from 'react';
import { StatusBar, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';

class CreateUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  CreateUser = () => {

    if (!this.validateEmail(this.state.email)) {
      Alert.alert("Email is not valid.")
    } else {

      fetch('http://192.168.42.22/skinskan/register.php', {
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

          Alert.alert(JSON.stringify(responseJson));

        }).catch((error) => {
          console.error(error);
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

      <View style={[styles.MainContainer, { backgroundColor: '#eb7080' }]}>
        <StatusBar backgroundColor="#eb7080" barStyle="light-content" />
        <View style={styles.LogoContainer}>
          <Image style={{ width: 200, height: 227 }} source={require('../images/register.png')} resizeMode="contain" />
        </View>
        <Text style={{ fontSize: 12, color: '#fff' }}>*Username cannot be changed later. Choose carefully.</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#fff"
          onChangeText={TextInputValue => this.setState({ username: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Email"
          type="email"
          placeholderTextColor="#fff"
          onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#fff"
          onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          style={styles.inputBox}
        />
        <TouchableOpacity activeOpacity={.4} style={[styles.button, { width: 300, backgroundColor: '#fff' }]} onPress={this.CreateUser} >
          <Text style={[styles.buttonText, { color: '#eb7080' }]}> Sign Up </Text>
        </TouchableOpacity>

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