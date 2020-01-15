import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import SkinNavigator from './skinNavigator';
import CameraNavigator from './cameraNavigator';
import ProfileNavigator from './profileNavigator';
import SkinQuiz from '../pages/skinQuiz';

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
    // SkinQuiz: {
    //   screen: SkinQuiz,
    //   navigationOptions: {
    //     tabBarLabel: 'Skin Quiz',
    //     tabBarIcon: ({ tintColor }) => (
    //       <View>
    //         <Icon style={[{ color: tintColor }]} size={22} name={'md-medical'} />
    //       </View>),
    //   }
    // },
    Scan: {
      screen: CameraNavigator,
      navigationOptions: {
        tabBarLabel: 'Home',
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
      activeTintColor: '#8a4de8',
      inactiveTintColor: '#b2b2b2',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        paddingTop: 5,
        backgroundColor: '#fff',
        borderTopColor: 'transparent',
        elevation: 20,
        fontFamily: 'Proxima Nova Bold'
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