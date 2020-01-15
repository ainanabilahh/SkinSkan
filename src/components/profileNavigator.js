import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AboutApp from '../pages/aboutApp';
import ChangeEmail from '../pages/changeEmail';
import ChangePassword from '../pages/changePassword';
import DeleteUser from '../pages/deleteUser';
import Logout from '../pages/logout';
import VerifyAccount from '../pages/verifyAccount';
import ViewUser from '../pages/viewUser';

const ProfileNavigator = createStackNavigator(
  {
    ViewUser: {
      screen: ViewUser,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage Account',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    VerifyAccount: {
      screen: VerifyAccount,
      navigationOptions: ({ navigation }) => ({
        title: 'Verify Account',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    ChangeEmail: {
      screen: ChangeEmail,
      navigationOptions: ({ navigation }) => ({
        title: 'Update Email',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => ({
        title: 'Update Password',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    DeleteUser: {
      screen: DeleteUser,
      navigationOptions: ({ navigation }) => ({
        title: 'Delete Account',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    AboutApp: {
      screen: AboutApp,
      navigationOptions: ({ navigation }) => ({
        title: 'About SkinSkan',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    Logout: {
      screen: Logout,
      navigationOptions: ({ navigation }) => ({
        title: 'Logout',
      }),
    },
  },
  {
    initialRouteName: "ViewUser",
    navigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
      },
      headerTintColor: '#2b2b2b',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
    lazy: false,
  },
);

export default createAppContainer(ProfileNavigator);