import { createAppContainer, createStackNavigator } from 'react-navigation';
import Skin from '../pages/skin';

const SkinNavigator = createStackNavigator(
  {
    Skin: {
      screen: Skin,
      navigationOptions: ({ navigation }) => ({
        title: 'Product Preferences',
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
    initialRouteName: "Skin",
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

export default createAppContainer(SkinNavigator);