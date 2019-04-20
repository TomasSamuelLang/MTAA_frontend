import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import HomePage from "../components/Home/HomePage";
import DeleteParking from "../components/Home/DeleteParking";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AddParking from "../components/Home/AddParking";

const InitNavigator = createStackNavigator(
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

const AppNavigator = createStackNavigator(
    {
        HomeScreen: {screen: HomePage},
        AddParkingScreen: {screen: AddParking},
        DeleteScreen: {screen: DeleteParking}
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

const SwitchNavigator = createSwitchNavigator(
    {
        Login: InitNavigator,
        Home: AppNavigator
    },
    {
        initialRouteName: 'Login'
    });

export default createAppContainer(SwitchNavigator);