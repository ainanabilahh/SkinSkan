import { createAppContainer, createStackNavigator } from 'react-navigation';
import ChangeEmail from '../pages/changeEmail';
import ChangePassword from '../pages/changePassword';
import DeleteUser from '../pages/deleteUser';
import Logout from '../pages/logout';
import ViewUser from '../pages/viewUser';
import VerifyAccount from '../pages/verifyAccount';

const ProfileNavigator = createStackNavigator(
  {
    ViewUser: {
      screen: ViewUser,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage Account',
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
    VerifyAccount: {
      screen: VerifyAccount,
      navigationOptions: ({ navigation }) => ({
        title: 'Verify Account',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#673AB7',
          elevation: 0,
        },
        headerTitleStyle: {
          marginLeft: -40,
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'Montserrat-Bold',
          flex: 1,
        },
      }),
    },
    ChangeEmail: {
      screen: ChangeEmail,
      navigationOptions: ({ navigation }) => ({
        title: 'Update Account',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#673AB7',
          elevation: 0,
        },
        headerTitleStyle: {
          marginLeft: -40,
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'Montserrat-Bold',
          flex: 1,
        },
      }),
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => ({
        title: 'Update Account',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#673AB7',
          elevation: 0,
        },
        headerTitleStyle: {
          marginLeft: -40,
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'Montserrat-Bold',
          flex: 1,
        },
      }),
    },
    DeleteUser: {
      screen: DeleteUser,
      navigationOptions: ({ navigation }) => ({
        title: 'Delete Account',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#673AB7',
          elevation: 0,
        },
        headerTitleStyle: {
          marginLeft: -40,
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'Montserrat-Bold',
          flex: 1,
        },
      }),
    },
    Logout: {
      screen: Logout,
      navigationOptions: ({ navigation }) => ({
        title: 'Delete Account',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#673AB7',
          elevation: 0,
        },
        headerTitleStyle: {
          marginLeft: -40,
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'Montserrat-Bold',
          flex: 1,
        },
      }),
    },
  },
  {
    initialRouteName: "ViewUser",
    navigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
      },
    },
    lazy: false,
  },
);

export default createAppContainer(ProfileNavigator);