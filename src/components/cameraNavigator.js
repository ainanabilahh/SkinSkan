import { createAppContainer, createStackNavigator } from 'react-navigation';
import Camera from '../pages/camera';
import Scan from '../pages/scan';

const CameraNavigator = createStackNavigator(
  {
    Scan: { 
      screen: Scan,
      navigationOptions: ({ navigation }) => ({
        title: 'Scan Ingredients',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#70ebdb',
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: '500',
          textAlign: 'center',
          flex: 1, 
        },
      }),   
    },
    Camera: { 
      screen: Camera,
      navigationOptions: ({ navigation }) => ({
        title: 'Camera',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#70ebdb',
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 25,
          marginLeft:-40,
          fontWeight: '500',
          textAlign: 'center',
          flex: 1, 
        },
      }),   
    },
  },
  {
    initialRouteName: "Scan", 
    navigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
      },
    },
    lazy: false,
    },
);

export default createAppContainer(CameraNavigator);