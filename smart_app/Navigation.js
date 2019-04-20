import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Login from "./src/components/Login/Login";
import Register from "./src/components/Register/Register";
import HomePage from "./src/components/Home/HomePage";
import AddParking from "./src/components/Home/AddParking";
import DeleteParking from "./src/components/Home/DeleteParking";
import React from 'react';

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

const InitContainer = createAppContainer();
//export const AppContainer = createAppContainer(AppNavigator);

export default InitContainer;
