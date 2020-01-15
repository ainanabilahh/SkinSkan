import Swiper from 'react-native-swiper';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from './src/components/auth';
import TabNavigator from './src/components/tabNavigator';
import CreateUser from './src/pages/createUser';
import Login from './src/pages/login';
import Skin from './src/pages/skin';
import SwiperIntro from './src/pages/swiperIntro';

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        title: 'Sign In',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    CreateUser: {
      screen: CreateUser,
      navigationOptions: ({ navigation }) => ({
        title: 'Sign Up',
        headerTitleStyle: {
          fontSize: 22,
          paddingLeft: 5,
          fontFamily: 'Proxima Nova Bold',
          flex: 1,
          color: '#2b2b2b'
        },
      }),
    },
    Auth: {
      screen: AuthLoadingScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Homepage: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Skin: {
      screen: Skin,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    SwiperIntro: {
      screen: SwiperIntro,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
  },
  {
    initialRouteName: "Auth",
    navigationOptions: {
      headerTintColor: '#2b2b2b',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  },
);

export default (createAppContainer(StackNavigator));