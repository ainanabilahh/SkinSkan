import React, { Component } from 'react';
import { Alert, ScrollView, Text, TextInput } from 'react-native';
import { Button, List } from 'react-native-paper';
import styles from '../css/styles';

class ChangeEmail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  UpdateEmail = () => {

    fetch('http://192.168.49.185/skinskan/updateEmail.php', {
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
          Alert.alert(responseJson);
          this.props.navigation.navigate('ViewUser');
        }
        else {
          alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
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
          <Text style={{margin: 15}}>To protect your account safety, please insert your password to continue.</Text>
          <TextInput
            placeholder="Your Current Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="#9a9a9a"
            onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
            style={styles.inputBox2}
          />
        </List.Section>
        <Button style={styles.button} mode="contained" icon="check" onPress={this.UpdateEmail}>Confirm</Button>
      </ScrollView>
    );
  }
}

export default ChangeEmail;