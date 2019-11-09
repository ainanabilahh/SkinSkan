import { createAppContainer, createStackNavigator } from 'react-navigation';
import Skin from '../pages/skin';
import SkinQuiz from '../pages/skinQuiz';

const SkinNavigator = createStackNavigator(
  {
    Skin: { 
      screen: Skin,
      navigationOptions: ({ navigation }) => ({
        title: 'Skin Preferences',
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
    SkinQuiz: { 
      screen: SkinQuiz,
      navigationOptions: ({ navigation }) => ({
        title: 'Skin Type Quiz',
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
    initialRouteName: "SkinType", 
    navigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
      },
    },
    lazy: false,
    },
);

export default createAppContainer(SkinNavigator);