import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { onSignOut, removeToken, getID, getName } from "../../auth/Auth";

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: ''
        };
    }

    componentDidMount() {
        //this.setState({id: getID(), name: getName()});
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Text style={styles.buttonText1}>ID: {this.state.id}</Text>
                <Text style={styles.buttonText1}>Meno: {this.state.name}</Text>
                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={() => onSignOut().then(() => removeToken()).then(() => navigate("SignedOut"))}>
                    <Text style={styles.buttonText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#9fcdff',
    },
    buttonContainer: {
        backgroundColor: '#ff0909',
        paddingVertical: 15,
        marginVertical: 20,
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: '700'
    }
});