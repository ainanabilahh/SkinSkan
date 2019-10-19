import React, { Component } from 'react';
import { Alert, ScrollView, Text, TextInput } from 'react-native';
import { Button, List, Snackbar } from 'react-native-paper';
import styles from '../css/styles';

class ChangePassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  UpdatePassword = () => {

    fetch('http://192.168.49.185/skinskan/updatePassword.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        username: username,
        currentPassword: this.state.currPass,
        newPassword: this.state.newPass,
        retypePassword: this.state.rePass,

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson === 'Your account has been updated. Please pull to refresh.') {
          Alert.alert(responseJson);
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

    const { goBack } = this.props.navigation;

    return (
      <ScrollView style={{ backgroundColor: '#efefef' }}>
        <List.Section style={{ backgroundColor: '#fff' }}>
          <List.Subheader style={{ backgroundColor: '#efefef' }}>PASSWORD</List.Subheader>
          <TextInput
            placeholder="Current Password"
            autoCapitalize="none"
            placeholderTextColor="#9a9a9a"
            secureTextEntry={true}
            onChangeText={TextInputValue => this.setState({ currPass: TextInputValue })}
            style={styles.inputBox2}
          />
          <List.Subheader style={{ backgroundColor: '#efefef' }}>NEW PASSWORD</List.Subheader>
          <Text style={{ margin: 15 }}>Please enter your new password below.</Text>
          <Text style={{ marginHorizontal: 15, marginBottom: 15, fontSize: 12, color: '#a3a3a3' }}>Minimum 6 characters with a number and a letter.</Text>
          <TextInput
            placeholder="New Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="#9a9a9a"
            onChangeText={TextInputValue => this.setState({ newPass: TextInputValue })}
            style={styles.inputBox2}
          />
          <TextInput
            placeholder="Retype Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="#9a9a9a"
            onChangeText={TextInputValue => this.setState({ rePass: TextInputValue })}
            style={styles.inputBox2}
          />
        </List.Section>
        <Button style={styles.button} mode="contained" icon="check" onPress={this.UpdatePassword}>Confirm</Button>
      </ScrollView>
    );
  }
}

export default ChangePassword;