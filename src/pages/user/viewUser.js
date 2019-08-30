import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Alert, Image, RefreshControl, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
               description: responseJson.description
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


   UpdateUser = () => {
      this.props.navigation.navigate('UpdateUser')
   };

   DeleteUser = () => {
      this.props.navigation.navigate('DeleteUser');
   };

   render() {

      return (
         <ScrollView style={styles.ContentContainer} refreshControl={this._refreshControl()}>
            <StatusBar backgroundColor="#70ebdb" barStyle="light-content" />
            <View style={[styles.header, { height: 80 }]} />
            <Image style={[styles.avatar, { marginTop: 20 }]} source={require('../../images/004-cream.png')} />
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 2 }}>
               <Text style={[styles.usernameLabel, { marginTop: 100 }]}>{this.state.username}</Text>
               <View style={styles.TextInputContainer}>
                  <View style={{ flexDirection: 'row' }}>
                     <Icon size={30} color='#b7b7b7' name="md-ribbon"></Icon>
                     <TextInput
                        editable={false}
                        value={this.state.description}
                        style={styles.inputBox2}
                     />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                     <Icon size={30} color='#b7b7b7' name="md-mail"></Icon>
                     <TextInput
                        editable={false}
                        value={this.state.email}
                        style={styles.inputBox2}
                     />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                     <TouchableOpacity activeOpacity={.4} style={[styles.button, { width: 140, backgroundColor: '#70ebdb' }]} onPress={this.UpdateUser} >
                        <Text style={styles.buttonText}>Update</Text>
                     </TouchableOpacity>
                     <TouchableOpacity activeOpacity={.4} style={[styles.button, { width: 140, backgroundColor: '#eb7080' }]} onPress={() => Alert.alert(
                        'Delete Confirmation',
                        'We will miss you :( \nPress OK to proceed.',
                        [
                           { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                           { text: 'OK', onPress: this.DeleteUser },
                        ],
                        { cancelable: false }
                     )}>
                        <Text style={styles.buttonText}>Delete</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </ScrollView>
      );
   }
}

export default ViewUser;