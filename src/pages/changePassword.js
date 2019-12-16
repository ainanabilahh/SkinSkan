import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Alert, ScrollView, Text, TextInput } from 'react-native';
import { Button, List, Snackbar } from 'react-native-paper';
import styles from '../css/styles';

class ChangePassword extends Component {

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

  UpdatePassword = () => {

    fetch('http://178.128.121.52/updatePassword.php', {
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
          <Text style={{ marginHorizontal: 15, marginBottom: 15, fontSize: 12, color: '#a3a3a3' }}>Minimum 6 characters with a number and a letter. {"\n"}<Text style={{ color: 'red' }}>* </Text>The show password button can be used for both.</Text>
          <TextInput
            placeholder="New Password"
            autoCapitalize="none"
            secureTextEntry={this.state.hidePassword}
            placeholderTextColor="#9a9a9a"
            onChangeText={TextInputValue => this.setState({ newPass: TextInputValue })}
            style={styles.inputBox2}
          />
          <TextInput
            placeholder="Retype Password"
            autoCapitalize="none"
            secureTextEntry={this.state.hidePassword}
            placeholderTextColor="#9a9a9a"
            onChangeText={TextInputValue => this.setState({ rePass: TextInputValue })}
            style={styles.inputBox2}
          />
          <TouchableOpacity activeOpacity={0.8} style={[styles.visibilityBtn, { position: 'absolute', right: 15, bottom: 18 }]} onPress={this.managePasswordVisibility}>
            <Image source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
          </TouchableOpacity>
        </List.Section>
        <View style={{ flexDirection: 'row' }}>
          <Button style={[styles.button, styles.greenButton]} mode="contained" icon="check" onPress={this.UpdateEmail}>Confirm</Button>
          <Button style={[styles.button, styles.redButton]} mode="contained" icon="remove" onPress={() => this.props.navigation.goBack()}>Cancel</Button>
        </View></ScrollView>
    );
  }
}

export default ChangePassword;