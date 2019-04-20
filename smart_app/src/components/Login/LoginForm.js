import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class LoginForm extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TextInput style = {styles.input}
                           autoCapitalize="none"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           autoCorrect={false}
                           keyboardType='default'
                           returnKeyType="next"
                           placeholder='Username'
                           placeholderTextColor='#0F0F0F'/>

                <TextInput style = {styles.input}
                           returnKeyType="go"
                           ref={(input)=> this.passwordInput = input}
                           placeholder='Password'
                           placeholderTextColor='#0f0f0f'
                           secureTextEntry/>

                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <Text style={styles.registerText} onPress={() => navigate('RegisterScreen')}>
                    No account yet? Register here you slut!
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
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
    registerText: {
        padding: 10,
        textAlign: 'center'
    }
});