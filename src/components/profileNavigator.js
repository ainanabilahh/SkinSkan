import { createAppContainer, createStackNavigator } from 'react-navigation';
import DeleteUser from '../pages/deleteUser';
import UpdateUser from '../pages/updateUser';
import ViewUser from '../pages/user/viewUser';

const ProfileNavigator = createStackNavigator(
  {
    ViewUser: { 
      screen: ViewUser,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage Account',
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
    UpdateUser: { 
      screen: UpdateUser,
      navigationOptions: ({ navigation }) => ({
        title: 'Update Account',
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
    DeleteUser: { 
      screen: DeleteUser,
      navigationOptions: ({ navigation }) => ({
        title: 'Delete Account',
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