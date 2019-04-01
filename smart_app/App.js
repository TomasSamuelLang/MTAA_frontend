import React, { Component} from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import AppContainer from './Navigation';

export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
});