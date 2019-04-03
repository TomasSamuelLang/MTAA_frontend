import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Login from "./src/Components/Login/Login";
import Register from "./src/Components/Register/Register";
import HomePage from "./src/Components/Home/HomePage";
import AddParking from "./src/Components/Home/AddParking";
import DeleteParking from "./src/Components/Home/DeleteParking";
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

// const AppNavigator = createStackNavigator(
//     {
//         HomeScreen: {screen: HomePage}
//
//     },
//     {
//         defaultNavigationOptions: {
//             headerTintColor: '#fff',
//             headerStyle: {
//                 backgroundColor: '#9fcdff',
//             },
//             headerTransparent: true
//         },
//         initialRouteName: 'HomeScreen',
//     }
//
// );

const AppNavigator = createStackNavigator(
    {
        HomeScreen: {screen: HomePage},
        AddParkingScreen: {screen: AddParking},
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

const RootNavigator = createBottomTabNavigator(
    {
        Login: {screen: InitNavigator},
        Home: {screen: AppNavigator},
    } , {

    }
);
const InitContainer = createAppContainer(RootNavigator);
//export const AppContainer = createAppContainer(AppNavigator);

export default InitContainer;
