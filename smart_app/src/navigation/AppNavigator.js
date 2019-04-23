import { createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import HomePage from "../components/Home/HomePage";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AddParking from "../components/Home/AddParking";
import ParkingLotDetails from "../components/Home/ParkingLotDetails";
import Profile from "../components/Home/Profile";
import { Icon } from 'react-native-elements';

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
    HomeScreen: {screen: HomePage,
        navigationOptions: () => ({
        title: 'All parking lots',
            headerBackTitle: 'Back'
    })},
    DetailScreen: {screen: ParkingLotDetails,
        navigationOptions: () => ({
            title: 'Detail'
        })},
    },
    {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#9fcdff',
            },
            headerTransparent: false
        },
        initialRouteName: 'HomeScreen',
    });

const SignedIn = createBottomTabNavigator(
    {
        Home: {screen: HomeStack},
        'Add Parking': {screen: AddParking},
        Profile: {screen: Profile},
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconName;
                let iconColor = focused ? '#54a0ff' : 'black';
                if (routeName === 'Home'){
                    iconName = 'ios-home';
                } else if (routeName === 'Profile'){
                    iconName = 'ios-person';
                } else iconName = 'ios-add';
                return <Icon name={iconName} color={iconColor} type='ionicon' />
            },
        }),
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