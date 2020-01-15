import { createAppContainer, createStackNavigator } from 'react-navigation';
import Ingredients from '../pages/ingredients';
import Scan from '../pages/scan';
import Result from '../pages/result';

const CameraNavigator = createStackNavigator(
  {
    Scan: {
      screen: Scan,
      navigationOptions: ({ navigation }) => ({
        title: 'Homepage',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b',
        },
        headerStyle: {
          elevation: 0,
        },
      }),
    },
    Ingredients: {
      screen: Ingredients,
      navigationOptions: ({ navigation }) => ({
        title: 'List of Ingredients',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    Result: {
      screen: Result,
      navigationOptions: ({ navigation }) => ({
        title: 'Result',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
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
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
    lazy: false,
  },
);

export default createAppContainer(CameraNavigator);