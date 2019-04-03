import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        let data = [["My favourite", "Add/delete parking", "My account", "About us"]];
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{height: 64}} />
                    <DropdownMenu
                        style={{flex: 1}}
                        bgColor={'white'}
                        tintColor={'#666666'}
                        activityTintColor={'green'}
                        // arrowImg={}
                        // checkImage={}
                        // optionTextStyle={{color: '#333333'}}
                        // titleStyle={{color: '#333333'}}
                        // maxHeight={300}
                        handler={(selection, row) => this.setState({text: data[selection][row]})}
                        data={data}
                    >

                    </DropdownMenu>
                </View>
                <View style={styles.homeContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../Images/logo.png')} />
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
    homeContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 200,
        height: 100
    },
    formContainer: {
        padding: 20
    }
});