import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import { registerUser } from "../RestAPI/ApiCalls";

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            passwordverification: '',
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
                               onChangeText={(text) => this.setState({login: text})}
                    />

                    <TextInput style = {styles.input}
                               returnKeyType="next"
                               ref={(input)=> this.passwordInput = input}
                               placeholder='Password'
                               placeholderTextColor='#0f0f0f'
                               secureTextEntry
                               onChangeText={(text) => this.setState({password: text})}
                    />

                    <TextInput style = {styles.input}
                               returnKeyType="go"
                               placeholder='Password Verification'
                               placeholderTextColor='#0f0f0f'
                               secureTextEntry
                               onChangeText={(text) => this.setState({passwordverification: text})}
                    />

                    <TouchableOpacity onPress={() => {
                        console.log(this.state.login);
                        if(this.state.password == this.state.passwordverification) {
                            registerUser(this.state.login, this.state.password).then(() => navigate('LoginScreen'))
                        }
                        else{
                            console.log("Passwords are different")
                        }
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
        color: '#000000'
    },
    buttonContainer: {
        backgroundColor: '#ffc107',
        paddingVertical: 15
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