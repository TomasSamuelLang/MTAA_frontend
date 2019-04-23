import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import { registerUser } from "../RestAPI/ApiCalls";

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            verification: ''
        }
    }

    async _onRegister(username, password, verification, navigate){
        if (username === '' || password === '' || verification === ''){
            alert("All fields must be filled");
        }
        else if (password === verification){
            let result = await registerUser(username, password);
            if (result){
                navigate('LoginScreen');
            }
        }
        else {
            alert("Password and verification password is not equal!");
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.registerContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../Images/logo.png')} />
                </View>
                <View style={styles.formContainer}>
                    <TextInput style = {styles.input}
                               autoCapitalize="none"
                               onSubmitEditing={() => this.passwordInput.focus()}
                               autoCorrect={false}
                               keyboardType='default'
                               returnKeyType="next"
                               placeholder='Username'
                               placeholderTextColor='#0F0F0F'
                               onChangeText={(text) => this.setState({username: text})}
                    />
                    <TextInput style = {styles.input}
                               returnKeyType="next"
                               ref={(input) => this.passwordInput = input}
                               onSubmitEditing={() => this.verificationInput.focus()}
                               placeholder='Password'
                               placeholderTextColor='#0f0f0f'
                               secureTextEntry
                               onChangeText={(text) => this.setState({password: text})}
                    />
                    <TextInput style = {styles.input}
                               returnKeyType="go"
                               ref={(input) => this.verificationInput = input}
                               placeholder='Password Verification'
                               placeholderTextColor='#0f0f0f'
                               secureTextEntry
                               onChangeText={(text) => this.setState({verification: text})}
                    />

                    <TouchableOpacity onPress={() => {
                        this._onRegister(this.state.username, this.state.password,
                            this.state.verification, navigate)
                    }} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9fcdff',
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: '#000000',
        borderRadius: 10,
    },
    buttonContainer: {
        backgroundColor: '#ffc107',
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: '700'
    },
    registerContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 400,
        height: 200
    },
    formContainer: {
        padding: 20
    }
});