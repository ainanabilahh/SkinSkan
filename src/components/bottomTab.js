import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Logout from '../pages/logout';
import Scan from '../pages/scan';
import StackNavigatorInside from './InsideNav';

const TabNavigator = createBottomTabNavigator(  
    {  
      Profile: { 
        screen: StackNavigatorInside,
        navigationOptions:{  
          tabBarLabel:'Profile',  
          tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={22} name={'md-person'}/>  
            </View>),  
          },
      },  
      Skin: { 
        screen: Scan,  
        navigationOptions:{  
          tabBarLabel:'Skin',  
          tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={22} name={'md-heart'}/>  
            </View>),  
          }  
      },  
      Scan: { 
        screen: Scan,  
        navigationOptions:{  
          tabBarLabel:'Scan',  
          tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={22} name={'md-qr-scanner'}/>  
            </View>),   
          }  
      },  
      Logout: {  
        screen: Logout,
        navigationOptions: {
          tabBarLabel:'Sign Out',  
          tabBarIcon: ({ tintColor }) => (  
            <View>  
                <Icon style={[{color: tintColor}]} size={22} name={'md-log-out'}/> 
            </View>),  
          }  
        },  
      },  
      {  
        initialRouteName: "Scan",  
        tabBarOptions: {
          activeTintColor: '#70ebdb',  
          inactiveTintColor: '#a3a3a3',
          labelStyle: {
            fontSize: 12,
          },
          style: {
            paddingTop: 5,
            backgroundColor: '#fff',
            borderTopColor: 'transparent',
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