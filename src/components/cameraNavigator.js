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
    Camera: { 
      screen: Camera,
      navigationOptions: ({ navigation }) => ({
        title: 'Camera',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#673AB7',
          elevation: 0,
        },
        headerTitleStyle: {
          marginLeft:-40,
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'Montserrat-Bold',
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