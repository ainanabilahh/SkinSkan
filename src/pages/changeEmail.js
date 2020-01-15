import React, { Component } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, List, Portal, Provider } from 'react-native-paper';
import styles from '../css/styles';

class ChangeEmail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      email: null,
      password: null,
      hidePassword: true,
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

  validate = (email, password) => {

    var e = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email == null || password == null) {
      this.setState({
        alert: 'Error',
        loading: false,
        color: '#E22E16',
        response: 'Please fill in the blank.',
        visible: true
      });
    }
    else if (e.test(email) == false) {
      this.setState({
        alert: 'Error',
        loading: false,
        color: '#E22E16',
        response: 'Email is not valid.',
        visible: true
      });
    }

    if (email != null && password != null) {
      if (e.test(email) == true) {
        return true;
      }
      else return false;
    }
    else return false;
  }

  UpdateEmail = () => {

    this.setState({ loading: true })
    var validate = this.validate(this.state.email, this.state.password)

    if (validate == true) {
      fetch('https://www.skinskan.me/updateEmail.php', {
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
          if (responseJson === 'Your email has been updated. Please swipe down to refresh.') {
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
              loading: false,
              alert: 'Error',
              color: '#E22E16',
              response: responseJson,
              visible: true,
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
            <List.Subheader style={styles.listSubheaderStyle}>Email</List.Subheader>
            <View style={styles.listStyle}>
              <TextInput
                placeholder="Your New Email"
                autoCapitalize="none"
                placeholderTextColor="#9a9a9a"
                onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
                style={styles.inputBox2}
              />
            </View>
            <List.Subheader style={styles.listSubheaderStyle}>Password</List.Subheader>
            <View style={styles.listStyle}>

              <Text style={styles.listDescriptionStyle}>To protect your account safety, please insert your password to continue.</Text>
              <View style={styles.textBoxBtnHolder}>
                <TextInput
                  placeholder="Your Current Password"
                  autoCapitalize="none"
                  secureTextEntry={this.state.hidePassword}
                  placeholderTextColor="#9a9a9a"
                  onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
                  style={styles.inputBox2}
                />
                <TouchableOpacity activeOpacity={0.8} style={[styles.visibilityBtn, { right: 15, bottom: 18 }]} onPress={this.managePasswordVisibility}>
                  <Image source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
                </TouchableOpacity>
              </View>
            </View>
          </List.Section>
          <View
            style={styles.buttonContainer}>
            <Button
              loading={this.state.loading ? true : false}
              style={styles.button}
              mode="contained"
              icon="check"
              onPress={this.UpdateEmail}>
              Confirm
              </Button>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}

export default ChangeEmail;