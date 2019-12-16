import { createAppContainer, createStackNavigator } from 'react-navigation';
import Skin from '../pages/skin';

const SkinNavigator = createStackNavigator(
  {
    Skin: { 
      screen: Skin,
      navigationOptions: ({ navigation }) => ({
        title: 'Product Preferences',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#673AB7',
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'Montserrat-Bold',
          flex: 1, 
        },
      }),   
    },
  },
  {
    initialRouteName: "Skin", 
    navigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
      },
    },
    lazy: false,
    },
);

export default createAppContainer(SkinNavigator);