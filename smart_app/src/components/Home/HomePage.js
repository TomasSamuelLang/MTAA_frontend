import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, Platform} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import {loginUser} from "../RestAPI/ApiCalls";
import { Permissions, ImagePicker } from 'expo';
import { addParkingLot , getAllParkingLots } from "../RestAPI/ApiCalls";
import getPermission from '../../utils/permissions';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            capacity: '',
            town: '',
            photo: null
        };
    }

    createFormData = (photo) => {
        const data = new FormData();

        data.append("image", {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });

        data.append("photo","nameofphoto");
        data.append("parkinglot",2);
        return data;
    };

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    };

    handleUploadPhoto = () => {
        fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: this.createFormData(this.state.photo)
        })
            .then(response => response.json())
            .then(response => {
                console.log("upload succes", response);
                alert("Upload success!");
                this.setState({ photo: null });
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };

    submitParking = async () => {
        let data = getAllParkingLots();
        //addParkingLot(this.state.name, this.state.address, this.state.capacity, this.state.town);
    };

    render() {
        let data = [["Home", "My favourite", "Add parking", "Delete parking" , "My account", "About us"]];
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.homeContainer}>
                    {/*<Image resizeMode="contain" style={styles.logo} source={{uri: `data:image/png;base64,${this.state.photo}`}} />*/}
                </View>

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
                <TouchableOpacity onPress={this.handleChoosePhoto()
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