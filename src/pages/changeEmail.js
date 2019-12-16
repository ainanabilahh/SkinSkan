import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, List } from 'react-native-paper';
import styles from '../css/styles';

class ChangeEmail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      hidePassword: true
    }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  UpdateEmail = () => {

    fetch('http://178.128.121.52/updateEmail.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        username: username,
        email: this.state.email,
        password: this.state.password

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson === 'Your account has been updated. Please pull to refresh.') {
          alert(responseJson);
          this.props.navigation.navigate('ViewUser');
        }
        else {
          alert(responseJson);
        }

      }).catch((error) => {
        alert("There is a network error. Please try again.")
        console.log(error);
      });
  }

  render() {

    return (
      <ScrollView style={{ backgroundColor: '#efefef' }}>
        <List.Section style={{ backgroundColor: '#fff' }}>
          <List.Subheader style={{ backgroundColor: '#efefef' }}>EMAIL</List.Subheader>
          <TextInput
            placeholder="Your New Email"
            autoCapitalize="none"
            placeholderTextColor="#9a9a9a"
            onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
            style={styles.inputBox2}
          />
          <List.Subheader style={{ backgroundColor: '#efefef' }}>PASSWORD</List.Subheader>
          <Text style={{ margin: 15 }}>To protect your account safety, please insert your password to continue.</Text>
          <View style={styles.textBoxBtnHolder}>
            <TextInput
              placeholder="Your Current Password"
              autoCapitalize="none"
              secureTextEntry={this.state.hidePassword}
              placeholderTextColor="#9a9a9a"
              onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
              style={styles.inputBox2}
            />
          </View>
        </List.Section>
        <View style={{ flexDirection: 'row' }}>
          <Button style={[styles.button, { backgroundColor: '#00ff80', width: 0.45 * Dimensions.get('window').width }]} mode="contained" icon="check" onPress={this.UpdateEmail}>Confirm</Button>
          <Button style={[styles.button, { backgroundColor: '#ff0080', width: 0.45 * Dimensions.get('window').width }]} mode="contained" icon="remove" onPress={this.UpdateEmail}>Cancel</Button>
        </View>
      </ScrollView>
    );
  }
}

export default ChangeEmail;