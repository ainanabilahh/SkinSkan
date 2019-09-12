import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import SkinNavigator from './skinNavigator';
import CameraNavigator from './cameraNavigator';
import ProfileNavigator from './profileNavigator';

const TabNavigator = createBottomTabNavigator(
  {
    Skin: {
      screen: SkinNavigator,
      navigationOptions: {
        tabBarLabel: 'Skin',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={22} name={'md-heart'} />
          </View>),
      }
    },
    Scan: {
      screen: CameraNavigator,
      navigationOptions: {
        tabBarLabel: 'Scan',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={22} name={'md-qr-scanner'} />
          </View>),
      }
    },
    /*Logout: {
      screen: Logout,
      navigationOptions: {
        tabBarLabel: 'Sign Out',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={22} name={'md-log-out'} />
          </View>),
      }
    },*/
    Settings: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={22} name={'md-settings'} />
          </View>),
      },
    },
  },
  {
    initialRouteName: "Scan",
    tabBarOptions: {
      activeTintColor: '#673AB7',
      inactiveTintColor: '#a3a3a3',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        paddingTop: 5,
        backgroundColor: '#fff',
        borderTopColor: 'transparent',
        elevation: 20,
      },
    },
    navigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
      },
    },
    lazy: false,
  },
);

export default createAppContainer(TabNavigator);  