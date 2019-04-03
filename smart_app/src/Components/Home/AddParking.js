import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';

export default class AddParking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView>

            </KeyboardAvoidingView>

        );
    }
}