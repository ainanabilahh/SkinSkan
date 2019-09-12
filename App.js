import { createAppContainer, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from './src/components/auth';
import TabNavigator from './src/components/tabNavigator';
import CreateUser from './src/pages/createUser';
import Login from './src/pages/login';

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    CreateUser: {
      screen: CreateUser,
      navigationOptions: ({ navigation }) => ({
        header: null
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
  },
  {
    initialRouteName: "Auth",
  },
);

export default createAppContainer(StackNavigator);