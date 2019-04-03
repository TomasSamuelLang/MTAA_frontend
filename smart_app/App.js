import React, { Component} from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import InitContainer from './Navigation';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <InitContainer />
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