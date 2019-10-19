import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Image, Alert, RefreshControl, ScrollView, Text, View } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';
import styles from '../../css/styles';

class ViewUser extends Component {

   abortController = new AbortController()

   constructor(props) {
      super(props);
      this.state = {
         refreshing: false,
         username: '',
         email: '',
         description: '',
         verified: false,
         message: null,
      }
   }

   async componentDidMount() {

      username = await AsyncStorage.getItem('username') || 'undefined';

      fetch('http://192.168.49.185/skinskan/ViewUser.php', {
         signal: this.abortController.signal,
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            username: username,
         }),
      }).then((response) => response.json())
         .then((responseJson) => {
            this.setState({
               username: username,
               email: responseJson.email,
               verified: JSON.parse(responseJson.description)
            })
         }).catch((err) => {
            if (err.name == 'AbortError') return
            throw err
         });
   }

   componentWillUnmount() {
      this.abortController.abort()
   }

   _refreshControl() {
      return (
         <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.componentDidMount()} />
      )
   }

   VerifyAccount = () => {
      this.props.navigation.navigate('VerifyAccount')
   }

   ChangeEmail = () => {
      this.props.navigation.navigate('ChangeEmail')
   };

   ChangePassword = () => {
      this.props.navigation.navigate('ChangePassword')
   };

   DeleteUser = () => {

      Alert.alert(
         'Delete Confirmation',
         'Are you sure you want to delete your account? This action cannot be undo.',
         [
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel',
            },
            { text: 'Yes', onPress: () => this.props.navigation.navigate('DeleteUser') },
         ],
         { cancelable: false },
      );
   };

   Logout = () => {
      this.props.navigation.navigate('Logout');
   };

   render() {

      return (
         <ScrollView style={{ backgroundColor: '#efefef' }} refreshControl={this._refreshControl()}>
            <List.Section style={{ backgroundColor: '#fff' }}>
               <List.Subheader style={{ backgroundColor: '#efefef' }}>ACCOUNT</List.Subheader>
               <View style={{ flexDirection: 'row', margin: 20 }}>
                  <Avatar.Icon style={{ backgroundColor: '#673AB7' }} icon="person" />
                  <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                     <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.usernameLabel}>{this.state.username}</Text>
                        <Image source={(this.state.verified) ? require('../../images/check.png') : require('../../images/multiply.png')} style={{ width: 15, height: 15, alignSelf: 'center' }} />
                     </View>
                     <Text style={{ marginHorizontal: 20 }}>{this.state.email}</Text>
                  </View>
               </View>
               <Divider />
               {this.state.verified
                  ? <List.Item
                     title="Account Verification"
                     description="Your account is verified."
                     descriptionStyle={{ color: "#008000" }}
                     style={{ paddingVertical: -10 }}
                     left={() => <List.Icon color="#a3a3a3" icon="person" />}
                  />
                  : <List.Item
                     title="Account Verification"
                     description="Your account is not verified."
                     descriptionStyle={{ color: "#FF0000" }}
                     style={{ paddingVertical: -10 }}
                     onPress={this.VerifyAccount}
                     left={() => <List.Icon color="#a3a3a3" icon="person" />}
                  />
               }
               <List.Item
                  title="Change Email"
                  style={{ paddingVertical: -10 }}
                  onPress={this.ChangeEmail}
                  left={() => <List.Icon color="#a3a3a3" icon="mail" />}
               />
               <List.Item
                  title="Change Password"
                  style={{ paddingVertical: -10 }}
                  onPress={this.ChangePassword}
                  left={() => <List.Icon color="#a3a3a3" icon="lock" />}
               />
               <List.Subheader style={{ backgroundColor: '#efefef' }}>MORE</List.Subheader>
               <List.Item
                  title="Credit"
                  style={{ paddingVertical: -10 }}
                  left={() => <List.Icon color="#a3a3a3" icon="note" />}
               />
               <List.Subheader style={{ backgroundColor: '#efefef' }}>OTHERS</List.Subheader>
               <List.Item
                  title="Sign Out"
                  onPress={this.Logout}
                  style={{ paddingVertical: -10 }}
                  left={() => <List.Icon color="#a3a3a3" icon="exit-to-app" />}
               />
               <List.Item
                  title="Delete Account"
                  titleStyle={{ color: "#FF0000" }}
                  onPress={this.DeleteUser}
                  style={{ paddingVertical: -10, }}
                  left={() => <List.Icon color="#FF0000" icon="delete" />}
               />
            </List.Section>
         </ScrollView>
      );
   }
}

export default ViewUser;