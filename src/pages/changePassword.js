import React, { Component } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, List, Portal, Provider } from 'react-native-paper';
import styles from '../css/styles';

class ChangePassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      currPass: null,
      newPass: null,
      rePass: null,
      hidePassword: true,
      hidePassword2: true,
      hidePassword3: true,
      create: false,
      visible: false,
      color: null,
      response: null,
      alert: null,
      loading: false
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

  validate = (currPass, newPass, rePass) => {

    var p = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

    if (newPass == null || currPass == null || rePass == null) {
      this.setState({
        alert: 'Error',
        loading: false,
        color: '#E22E16',
        response: 'Please fill in the blank.',
        visible: true
      });
    }
    else if (newPass != rePass) {
      this.setState({
        alert: 'Error',
        loading: false,
        color: '#E22E16',
        response: 'Your password and confirmation password do not match.',
        visible: true
      });
    }
    else if (newPass == currPass) {
      this.setState({
        alert: 'Error',
        loading: false,
        color: '#E22E16',
        response: 'New password cannot be the same as your current password.',
        visible: true
      });
    }
    else if (p.test(newPass) == false || p.test(currPass) == false || p.test(rePass) == false) {
      this.setState({
        alert: 'Error',
        loading: false,
        color: '#E22E16',
        response: 'Your password must contain at least one lowercase letter, one number digit and more than 6 characters.',
        visible: true
      });
    }

    if (newPass != null && currPass != null && rePass != null) {
      if (newPass != currPass) {
        if (newPass == rePass) {
          if (p.test(newPass) == true || p.test(currPass) == true || p.test(rePass) == true) {
            return true;
          }
          else return false;
        }
        else return false;
      }
      else return false;
    }
    else return false;
  }

  UpdatePassword = () => {

    this.setState({ loading: true })
    var validate = this.validate(this.state.currPass, this.state.newPass, this.state.rePass)

    console.log(validate)

    if (validate == true) {
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
          if (responseJson === 'Your password has been updated. Please swipe down to refresh.') {
            this.setState({
              alert: 'Success',
              loading: false,
              color: '#5CA51C',
              response: responseJson,
              visible: true
            });
          }
          else {
            this.setState({
              alert: 'Error',
              loading: false,
              color: '#E22E16',
              response: responseJson,
              visible: true
            });
          }

        }).catch((error) => {
          alert("There is a network error. Please try again.")
          console.log(error);
        });
    }
  }

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
              <Button onPress={(this.state.alert == "Success") ? () => this.props.navigation.navigate("ViewUser") : () => this.setState({ visible: false })}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
          <List.Section style={{ backgroundColor: '#fff' }}>
            <List.Subheader style={styles.listSubheaderStyle}>PASSWORD</List.Subheader>
            <View style={styles.listStyle}>
              <TextInput
                placeholder="Current Password"
                autoCapitalize="none"
                placeholderTextColor="#9a9a9a"
                secureTextEntry={this.state.hidePassword}
                onChangeText={TextInputValue => this.setState({ currPass: TextInputValue })}
                style={styles.inputBox2}
              />
              <TouchableOpacity activeOpacity={0.8} style={[styles.visibilityBtn, { position: 'absolute', right: 15, bottom: 18 }]} onPress={() => this.managePasswordVisibility(1)}>
                <Image opacity={0.5} source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
              </TouchableOpacity>
            </View>
            <List.Subheader style={styles.listSubheaderStyle}>NEW PASSWORD</List.Subheader>
            <View style={styles.listStyle}>
              <Text style={styles.listDescriptionStyle}>Please enter your new password below.</Text>
              <Text style={styles.listMiniDescStyle}>Minimum 6 characters with a number and a letter.</Text>
              <View>
                <TextInput
                  placeholder="New Password"
                  autoCapitalize="none"
                  secureTextEntry={this.state.hidePassword2}
                  placeholderTextColor="#9a9a9a"
                  onChangeText={TextInputValue => this.setState({ newPass: TextInputValue })}
                  style={styles.inputBox2}
                />
                <TouchableOpacity activeOpacity={0.8} style={[styles.visibilityBtn, { position: 'absolute', right: 15, bottom: 18 }]} onPress={() => this.managePasswordVisibility(2)}>
                  <Image opacity={0.5} source={(this.state.hidePassword2) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
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
                <Image opacity={0.5} source={(this.state.hidePassword3) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
              </TouchableOpacity>
            </View>
          </List.Section>
          <View style={[styles.buttonContainer, { flexDirection: 'row' }]}>
            <Button
              loading={this.state.loading ? true : false}
              style={styles.button}
              mode="contained"
              icon="check"
              onPress={this.UpdatePassword}>Confirm</Button>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}

export default ChangePassword;