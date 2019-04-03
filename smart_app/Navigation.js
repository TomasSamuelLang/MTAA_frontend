import { createStackNavigator, createAppContainer} from 'react-navigation';
import Login from "./src/Components/Login/Login";
import Register from "./src/Components/Register/Register";
import HomePage from "./src/Components/Home/HomePage"
import React from 'react';

const AppNavigator = createStackNavigator(
    {
        LoginScreen: {screen: Login},
        RegisterScreen: {screen: Register},
        HomeScreen: {screen: HomePage}
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

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;