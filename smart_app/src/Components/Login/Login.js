import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import {loginUser, registerUser} from "../RestAPI/ApiCalls";
//import { AppContainer } from '../../../Navigation';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            isLogged: false
        }
    }

    onLogin(navigate) {
      if (loginUser(this.state.login, this.state.password)){
          this.setState({isLogged: true});
          navigate('HomeScreen');
      }
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>
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
                               returnKeyType="go"
                               ref={(input)=> this.passwordInput = input}
                               placeholder='Password'
                               placeholderTextColor='#0f0f0f'
                               secureTextEntry
                               onChangeText={(text) => this.setState({password: text})}
                    />

                    <TouchableOpacity onPress={() =>
                            this.onLogin(navigate)
                    } style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <Text onPress={() => navigate('RegisterScreen')}
                          style={styles.registerText}>No account yet? Register here you slut!
                    </Text>
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
    buttonContainer: {
        backgroundColor: '#ffc107',
        paddingVertical: 15
    },
    registerText: {
        padding: 10,
        textAlign: 'center'
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: '700'
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: '#000000'
    },
    loginContainer: {
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