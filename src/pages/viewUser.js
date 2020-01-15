import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Alert, Image, RefreshControl, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { Avatar, Button, Dialog, Divider, List, Portal, Provider } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from '../css/styles';

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
         visible: false,
         color: null,
         response: null,
         alert: null,
         back: false,
         verify: false,
      }
   }

   async componentDidMount() {

      username = await AsyncStorage.getItem('username') || 'undefined';

      fetch('https://www.skinskan.me/ViewUser.php', {
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
            alert("There is a network error. Please try again.")
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

   AboutApp = () => {
      this.props.navigation.navigate('AboutApp')
   }

   ChangeEmail = () => {
      this.props.navigation.navigate('ChangeEmail')
   };

   ChangePassword = () => {
      this.props.navigation.navigate('ChangePassword')
   };

   VerifyAccount = () => {

      this.setState({ verify: true })

      fetch('https://www.skinskan.me/verifyAccount.php', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            username: username,
         })

      }).then((response) => response.json())
         .then((responseJson) => {
            if (responseJson.message == "Please check your email.")
               this.setState({
                  alert: 'Success',
                  color: '#5CA51C',
                  response: responseJson.message,
                  visible: true,
                  verify: false
               });
            else
               this.setState({
                  alert: 'Error',
                  color: '#E22E16',
                  response: responseJson.message,
                  visible: true,
                  verify: false
               });
         }).catch((error) => {
            alert("There is a network error. Please try again.")
            console.log(error);
         });
      this.props.navigation.navigate('ViewUser')
   }

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

   Logout1 = () => {
      this.setState({
         alert: 'Information',
         color: '#00B3C4',
         response: 'You will be logged out.',
         visible: true,
         back: true,
      })
   }

   Logout2 = () => {
      AsyncStorage.removeItem('isLoggedIn');
      AsyncStorage.removeItem('username');

      const resetAction = StackActions.reset({
         index: 0,
         actions: [NavigationActions.navigate({ routeName: 'Auth' })],
      });
      this.props.navigation.dispatch(resetAction);
   }

   render() {

      return (
         <Provider>
            <Portal>
               <Dialog
                  style={{ borderRadius: 10, }}
                  visible={this.state.visible}
                  onDismiss={() => this.setState({ visible: false })}
                  dismissable={false}>
                  <Dialog.Title style={{ color: this.state.color }}>{this.state.alert}</Dialog.Title>
                  <Dialog.Content>
                     <Text>{this.state.response}</Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                     <Button onPress={(this.state.back) ? this.Logout2 : () => this.setState({ visible: false })}>Ok</Button>
                  </Dialog.Actions>
               </Dialog>
            </Portal>
            <ScrollView style={{ backgroundColor: '#F5F5F5' }} refreshControl={this._refreshControl()}>
               <List.Section style={{ backgroundColor: '#fff' }}>
                  <List.Subheader style={styles.listSubheaderStyle}>Account</List.Subheader>
                  <View style={styles.listStyle}>
                     <View style={{ flexDirection: 'row', margin: 20 }}>
                        <Avatar.Icon style={{ backgroundColor: '#8a4de8' }} icon="person" />
                        <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                           <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.usernameLabel}>{this.state.username}</Text>
                              <Image source={(this.state.verified) ? require('../images/check.png') : require('../images/multiply.png')} style={{ width: 15, height: 15, alignSelf: 'center' }} />
                           </View>
                           <Text style={{ marginHorizontal: 20, fontFamily: 'ProximaNova-Regular' }}>{this.state.email}</Text>
                        </View>
                     </View>
                     <Divider />
                     {this.state.verified
                        ? <View>
                           <List.Item
                              title="Email Verification"
                              titleStyle={styles.listTextStyle}
                              description="Your email is verified."
                              descriptionStyle={{ color: "#008000", fontFamily: 'ProximaNova-Regular' }}
                              style={{ paddingVertical: -10 }}
                              left={() => <List.Icon color="#a3a3a3" icon="person" />
                              }
                           />
                        </View>
                        : <View>
                           <List.Item
                              title="Account Verification"
                              titleStyle={styles.listTextStyle}
                              description="Your account is not verified."
                              descriptionStyle={{ color: "#FF0000", fontFamily: 'ProximaNova-Regular' }}
                              style={{ paddingVertical: -10 }}
                              onPress={this.VerifyAccount}
                              left={() => <List.Icon color="#a3a3a3" icon="person" />}
                           />
                           {this.state.verify ?
                              <ActivityIndicator
                                 color="#8a4de8"
                                 style={{ right: 0, position: 'absolute', margin: 10, marginTop: 20, marginRight: 20 }} /> : (null)}
                        </View>
                     }
                     <List.Item
                        title="Change Email"
                        titleStyle={styles.listTextStyle}
                        style={{ paddingVertical: -10, }}
                        onPress={this.ChangeEmail}
                        left={() => <List.Icon color="#a3a3a3" icon="mail" />}
                     />
                     <List.Item
                        title="Change Password"
                        titleStyle={styles.listTextStyle}
                        style={{ paddingVertical: -10, }}
                        onPress={this.ChangePassword}
                        left={() => <List.Icon color="#a3a3a3" icon="lock" />}
                     />
                  </View>
                  <List.Subheader style={styles.listSubheaderStyle}>More</List.Subheader>
                  <View style={styles.listStyle}>
                     <List.Item
                        title="About and QnA"
                        titleStyle={styles.listTextStyle}
                        onPress={this.AboutApp}
                        style={{ paddingVertical: -10, }}
                        left={() => <List.Icon color="#a3a3a3" icon="info" />}
                     />
                  </View>
                  <List.Subheader style={styles.listSubheaderStyle}>Others</List.Subheader>
                  <View style={styles.listStyle}>
                     <List.Item
                        title="Sign Out"
                        titleStyle={styles.listTextStyle}
                        onPress={this.Logout1}
                        style={{ paddingVertical: -10, }}
                        left={() => <List.Icon color="#a3a3a3" icon="exit-to-app" />}
                     />
                     <List.Item
                        title="Delete Account"
                        titleStyle={[{ color: "#FF0000" }, styles.listTextStyle]}
                        onPress={this.DeleteUser}
                        style={{ paddingVertical: -10, }}
                        left={() => <List.Icon color="#FF0000" icon="delete" />}
                     />
                  </View>
               </List.Section>
            </ScrollView>
         </Provider>
      );
   }
}

export default ViewUser;