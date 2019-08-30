import React, { Component } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../css/styles';

class UpdateUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  UpdateUser = () => {

    fetch('http://192.168.49.185/skinskan/updateUser.php', {
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
          Alert.alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });
  }

  render() {

    const { goBack } = this.props.navigation;

    return (
      <View style={styles.ContentContainer}>
        <View style={[styles.header, { height: 80 }]} />
        <Image style={[styles.avatar, { marginTop: 20 }]} source={require('../images/001-shampoo.png')} />
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 2 }}>
          <Text style={[styles.usernameLabel, { marginTop: 80 }]}>{username}</Text>
          <View style={styles.TextInputContainer}>
            <Text style={{ fontSize: 12, color: 'red' }}>*Leave email or password blank if don't {"\n"}want to change any of them.</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon size={30} color='#b7b7b7' name="md-mail"></Icon>
              <TextInput
                placeholder="New Email"
                autoCapitalize="none"
                placeholderTextColor="#9a9a9a"
                onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
                style={styles.inputBox2}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon size={30} color='#b7b7b7' name="md-lock"></Icon>
              <TextInput
                placeholder="New Password"
                autoCapitalize="none"
                secureTextEntry={true}
                placeholderTextColor="#9a9a9a"
                onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
                style={styles.inputBox2}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={.4} style={[styles.button, { width: 140, backgroundColor: '#70ebdb' }]} onPress={this.UpdateUser} >
                <Text style={styles.buttonText}> Submit </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.4} style={[styles.button, { width: 140, backgroundColor: '#eb7080' }]} onPress={() => goBack()} >
                <Text style={styles.buttonText}> Back </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default UpdateUser;