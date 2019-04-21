import { createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import HomePage from "../components/Home/HomePage";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AddParking from "../components/Home/AddParking";
import ParkingLotDetails from "../components/Home/ParkingLotDetails";
import Profile from "../components/Home/Profile";

const SignedOut = createStackNavigator(
    {
        LoginScreen: {screen: Login},
        RegisterScreen: {screen: Register}
    },
    {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#9fcdff',
            },
            headerTransparent: true
        },
        initialRouteName: 'LoginScreen',
    });

const HomeStack = createStackNavigator({
    HomeScreen: {screen: HomePage},
    DetailScreen: {screen: ParkingLotDetails}
    },
    {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#9fcdff',
            },
            headerTransparent: true
        },
        initialRouteName: 'HomeScreen',
    });

const SignedIn = createBottomTabNavigator(
    {
        Home: {screen: HomeStack},
        AddParking: {screen: AddParking},
        Profile: {screen: Profile}
    },
    {
        initialRouteName: 'Home',
    });

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
      createSwitchNavigator({
            SignedOut: {screen: SignedOut},
            SignedIn: {screen: SignedIn}
          },
          {
              defaultNavigationOptions: {
                  headerTintColor: '#fff',
                  headerStyle: {
                      backgroundColor: '#9fcdff',
                  },
                  headerTransparent: false
              },
              initialRouteName: signedIn ? "SignedIn" : "SignedOut"
          })
  );
};