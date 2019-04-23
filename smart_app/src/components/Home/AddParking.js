import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, ScrollView, Picker, Image, Alert, PickerIOS } from 'react-native';
import {ImagePicker, Permissions} from "expo";
import getPermission from "../../utils/permissions";
import {getUser} from "../../auth/Auth";
import {IP} from "../../../App";
import IOSPicker from 'react-native-ios-picker';

export default class AddParking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            capacity: '',
            town: '',
            photo: '',
            towns: [],
            token: '',
            townID: '',
        };
    }

    async addParkingLot(name, address, capacity, townId, photo) {
        if (name !== '' && address !== '' && capacity !== '' && townId !== ''){
            try {
                let response = await fetch('http://' + IP + '/parkinglot/',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + this.state.token
                    },
                    body: JSON.stringify({
                        name: name,
                        address: address,
                        capacity: capacity,
                        actualparkedcars: 0,
                        town: townId,
                    }),
                });
                let response_status = await response.status;
                if (response_status === 201){
                    let responseJson = await response.json();
                    if (photo !== ''){
                        fetch('http://' + IP + '/uploadphoto/',{
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Token ' + this.state.token
                            },
                            body: JSON.stringify({
                                parkinglot: responseJson.id,
                                photo: name,
                                image: photo
                            }),
                        });
                    }
                    this.setState({
                        name: '',
                        address: '',
                        capacity: '',
                        town: '',
                        photo: ''
                    });
                    Alert.alert('Success', 'Parking lot successfully added.');
                } else if (response_status === 400){
                    Alert.alert('Error', 'Request failed. Please check your input.');
                } else if (response_status === 401){
                    Alert.alert('Error', 'Authentication credentials were not provided.');
                }
            } catch (e) {
                Alert.alert('Error', 'Request failed. Please check internet connectivity.');
            }
        } else alert("All fields must be filled.");
    }

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

    async getAllTowns(){
        let tempdata = [];
        const user = JSON.parse(await getUser());
        let response = await fetch('http://' + IP + '/gettowns/',{
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + user.token
            }
        });
        let responseJson = await response.json();
        tempdata = responseJson;
        this.setState({towns: tempdata, token: user.token});
    }

    dynamic(){
        return this.state.towns.map(user => (
            <Picker.Item key={user.name} label={user.name} value={user.id} />
        ))
    }

    componentDidMount(){
        this.getAllTowns();
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ScrollView style={styles.formContainer}>
                    <Text style={styles.header}>
                        Add new parking lot
                    </Text>
                    <TextInput style = {styles.input}
                               value={this.state.name}
                               autoCapitalize="none"
                               autoCorrect={false}
                               onSubmitEditing={() => this.addressInput.focus()}
                               keyboardType='default'
                               returnKeyType="next"
                               placeholder='Parking lot name'
                               placeholderTextColor='#0F0F0F'
                               onChangeText={(text) => this.setState({name: text})}
                    />
                    <TextInput style = {styles.input}
                               value={this.state.address}
                               autoCapitalize="none"
                               autoCorrect={false}
                               ref={(input) => this.addressInput = input}
                               onSubmitEditing={() => this.capacityInput.focus()}
                               keyboardType='default'
                               returnKeyType="next"
                               placeholder='Address'
                               placeholderTextColor='#0F0F0F'
                               onChangeText={(text) => this.setState({address: text})}
                    />
                    <TextInput style = {styles.input}
                               value={this.state.capacity}
                               autoCapitalize="none"
                               autoCorrect={false}
                               keyboardType='numeric'
                               ref={(input) => this.capacityInput = input}
                               returnKeyType="done"
                               placeholder='Capacity'
                               placeholderTextColor='#0F0F0F'
                               onChangeText={(text) => this.setState({capacity: text})}
                    />
                    <Text>
                        Choose town:
                    </Text>

                    <IOSPicker
                        style={styles.inputPicker}
                        selectedValue={this.state.town}
                        keyExtractor={item => item.name}
                        mode='modal'
                        onValueChange={(valueData, valueIndex) => this.setState({town: this.state.towns[valueIndex].name, townID: valueData})}>
                        {this.dynamic()}
                    </IOSPicker>
                    {this.state.photo !== '' ?
                        <Image style={{width: null, height: 250 , paddingBottom: 5}}
                               source={{uri: `data:image/png;base64,${this.state.photo}`}}/> : <View/>}
                    <TouchableOpacity onPress={() => {this.handleChoosePhoto()}}
                                      style={styles.photoButtContainer}>
                        <Text style={styles.buttonText}>Choose photo of parking lot</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.addParkingLot(this.state.name, this.state.address,
                        this.state.capacity, this.state.townID, this.state.photo)
                    }} style={styles.submitButtContainer}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <View style={{height: 50}}/>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#9fcdff',
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        padding: 20
    },
    photoButtContainer: {
        backgroundColor: '#ffc107',
        paddingVertical: 15,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    submitButtContainer: {
        backgroundColor: '#ffc107',
        paddingVertical: 15,
        borderRadius: 10,
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
        color: '#000000',
        borderRadius: 10,
    },
    inputPicker: {
        marginVertical: 5,
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: '#000000',
        borderRadius: 10,
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
        padding: 20,
    }
});