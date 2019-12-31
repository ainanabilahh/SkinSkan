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
      hidePassword: true,
      hidePassword2: true,
      hidePassword3: true
    }
  }

  managePasswordVisibility = (num) => {

    if (num == 1)
      this.setState({ hidePassword: !this.state.hidePassword });
    else if (num == 2)
      this.setState({ hidePassword2: !this.state.hidePassword2 });
    else if (num == 3)
      this.setState({ hidePassword3: !this.state.hidePassword3 });
  }

  UpdatePassword = () => {

    fetch('https://www.skinskan.me/updatePassword.php', {
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
          <View>
            <TextInput
              placeholder="Current Password"
              autoCapitalize="none"
              placeholderTextColor="#9a9a9a"
              secureTextEntry={this.state.hidePassword}
              onChangeText={TextInputValue => this.setState({ currPass: TextInputValue })}
              style={styles.inputBox2}
            />
            <TouchableOpacity activeOpacity={0.8} style={[styles.visibilityBtn, { position: 'absolute', right: 15, bottom: 18 }]} onPress={() => this.managePasswordVisibility(1)}>
              <Image source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
            </TouchableOpacity>
          </View>
          <List.Subheader style={{ backgroundColor: '#efefef' }}>NEW PASSWORD</List.Subheader>
          <Text style={{ margin: 15 }}>Please enter your new password below.</Text>
          <Text style={{ marginHorizontal: 15, marginBottom: 15, fontSize: 12, color: '#a3a3a3' }}>Minimum 6 characters with a number and a letter. {"\n"}<Text style={{ color: 'red' }}>* </Text>The show password button can be used for both.</Text>
          <View><TextInput
            placeholder="New Password"
            autoCapitalize="none"
            secureTextEntry={this.state.hidePassword2}
            placeholderTextColor="#9a9a9a"
            onChangeText={TextInputValue => this.setState({ newPass: TextInputValue })}
            style={styles.inputBox2}
          />
            <TouchableOpacity activeOpacity={0.8} style={[styles.visibilityBtn, { position: 'absolute', right: 15, bottom: 18 }]} onPress={() => this.managePasswordVisibility(2)}>
              <Image source={(this.state.hidePassword2) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Retype Password"
            autoCapitalize="none"
            secureTextEntry={this.state.hidePassword3}
            placeholderTextColor="#9a9a9a"
            onChangeText={TextInputValue => this.setState({ rePass: TextInputValue })}
            style={styles.inputBox2}
          />
          <TouchableOpacity activeOpacity={0.8} style={[styles.visibilityBtn, { position: 'absolute', right: 15, bottom: 18 }]} onPress={() => this.managePasswordVisibility(3)}>
            <Image source={(this.state.hidePassword3) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
          </TouchableOpacity>
        </List.Section>
        <View style={{ flexDirection: 'row' }}>
          <Button style={[styles.button, styles.greenButton]} mode="contained" icon="check" onPress={this.UpdatePassword}>Confirm</Button>
          <Button style={[styles.button, styles.redButton]} mode="contained" icon="remove" onPress={() => this.props.navigation.goBack()}>Cancel</Button>
        </View></ScrollView>
    );
  }
}

export default ChangePassword;