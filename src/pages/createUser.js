import React, { Component } from 'react';
import { Alert, Image, Text, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
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

      fetch('http://192.168.42.194/skinskan/register.php', {
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

          Alert.alert(responseJson);

        }).catch((error) => {
          console.error(error);
        });
    }
    this.props.navigation.navigate("Login");
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
        <TextInput
          mode="outlined"
          label="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })} underlineColorAndroid='transparent'
          secureTextEntry={true}
          style={styles.inputBox}
        />

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