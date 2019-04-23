import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {
    onSignOut,
    removeToken,
    getID,
    getName,
    removeName,
    removeID,
    getToken,
    removeUser,
    getUser
} from "../../auth/Auth";

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            token: ''
        };
    }

    async componentDidMount() {
        const user = JSON.parse(await getUser());
        this.setState({id: user.id, name: user.username, token: user.token});
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <View style={{marginTop: 20}}>
                    <Text style={styles.userText}>ID: {this.state.id}</Text>
                    <Text style={styles.userText}>Meno: {this.state.name}</Text>
                    <Text style={styles.userText}>Token: {this.state.token}</Text>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => onSignOut()
                                          .then(() => removeUser())
                                          .then(() => navigate("SignedOut"))}>
                        <Text style={styles.buttonText}>LOG OUT</Text>
                    </TouchableOpacity>
                </View>
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
        borderRadius: 10,
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: '700'
    },
    userText: {
        fontSize: 24,
        padding: 5
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 0
    },
});