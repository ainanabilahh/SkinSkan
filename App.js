import { createAppContainer, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from './src/components/auth';
import TabNavigator from './src/components/bottomTab';
import CreateUser from './src/pages/createUser';
import DeleteUser from './src/pages/deleteUser';
import Login from './src/pages/login';
import UpdateUser from './src/pages/updateUser';

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
    UpdateUser: {
      screen: UpdateUser,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    DeleteUser: {
      screen: DeleteUser,
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