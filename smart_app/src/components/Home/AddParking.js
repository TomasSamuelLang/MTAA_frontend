import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, FlatList} from 'react-native';
import {getAllParkingLots} from "../RestAPI/ApiCalls";
import {ImagePicker} from "expo";
import getPermission from "../../utils/permissions";

export default class AddParking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            capacity: '',
            town: '',
            photo: ''
        };
    }

    fetchData = async () => {
        const response = await fetch('http://192.168.0.108:8000/getphoto/3',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        let responseJson = await response.json();
        this.setState({photo: responseJson.image});
    };

    handleUploadPhoto = () => {
        fetch("http://192.168.0.108:8000/getphoto/3", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(response => {
                console.log("upload succes", response);
                alert("Upload success!");
                this.setState({ photo: response.image });
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };

    handleChoosePhoto = async () => {
        const status = await getPermission(Permissions.CAMERA_ROLL);
        if (status) {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditor: false,
                base64: true
            });

            if(!result.cancelled) {
                this.setState({photo: result.base64});
            }
        }
    };

    submitParking = async () => {
        let data = getAllParkingLots();
        //addParkingLot(this.state.name, this.state.address, this.state.capacity, this.state.town);
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TouchableOpacity onPress={() => navigate('DeleteScreen')
                } style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Show Parking Lot 2</Text>
                </TouchableOpacity>

                <TextInput style = {styles.input}
                           autoCapitalize="none"
                           autoCorrect={false}
                           keyboardType='default'
                           returnKeyType="next"
                           placeholder='Parking lot name'
                           placeholderTextColor='#0F0F0F'
                           onChangeText={(text) => this.setState({name: text})}
                />
                <TextInput style = {styles.input}
                           autoCapitalize="none"
                           autoCorrect={false}
                           keyboardType='default'
                           returnKeyType="next"
                           placeholder='Address'
                           placeholderTextColor='#0F0F0F'
                           onChangeText={(text) => this.setState({address: text})}
                />
                <TextInput style = {styles.input}
                           autoCapitalize="none"
                           autoCorrect={false}
                           keyboardType='numeric'
                           returnKeyType="next"
                           placeholder='Capacity'
                           placeholderTextColor='#0F0F0F'
                           onChangeText={(text) => this.setState({capacity: text})}
                />
                <TextInput style = {styles.input}
                           autoCapitalize="none"
                           autoCorrect={false}
                           keyboardType='default'
                           returnKeyType="next"
                           placeholder='Town'
                           placeholderTextColor='#0F0F0F'
                           onChangeText={(text) => this.setState({town: text})}
                />
                <TouchableOpacity onPress={() => {this.handleChoosePhoto()}
                } style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Choose photo</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { this.handleUploadPhoto()
                }} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

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
        backgroundColor: '#ffc107',
        paddingVertical: 15,
        margin: 20
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