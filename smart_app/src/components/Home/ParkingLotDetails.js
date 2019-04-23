import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, Alert} from 'react-native';
import getPermission from "../../utils/permissions";
import {ImagePicker, Permissions} from "expo";
import {getToken, getUser} from "../../auth/Auth";


export default class ParkingLotDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            photo: '',
            name: '',
            address: '',
            capacity: '',
            parked: '',
            town: '',
            country: '',
            token: '',
            isLoading: true
        };
    }

    fetchData = async (id) => {
        const user = JSON.parse(await getUser());
        let res = await fetch('http://192.168.0.108:8000/parkinglot/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + user.token
            }
        });
        let response_status = await res.status;
        if (response_status === 404){
            alert("This parking lot does not exist.");
        } else if (response_status === 401){
            alert('Authentication credentials were not provided.');
        }
        else {
            let responseJson = await res.json();
            this.setState({
                name: responseJson.name, address: responseJson.address, capacity: responseJson.capacity,
                parked: responseJson.actualparkedcars, town: responseJson.town.name, country: responseJson.town.country.name
            });
            let response = await fetch('http://192.168.0.108:8000/getphoto/' + id,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + user.token
                }
            });
            let photo_response_status = await response.status;
            if (photo_response_status === 400){
                this.setState({photo: '', isLoading: false, token: user.token});
            }
            else if (response_status === 401){
                alert('Authentication credentials were not provided.');
            }
            else {
                let photoJson = await response.json();
                this.setState({photo: photoJson.image, isLoading: false, token: user.token});
            }
        }
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
                fetch('http://192.168.0.108:8000/uploadphoto/',{
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + this.state.token
                    },
                    body: JSON.stringify({
                        parkinglot: this.state.id,
                        photo: this.state.name,
                        image: result.base64
                    }),
                });
            }
        }
    };

    onParkedLeave = async (id, park) => {
        if(this.state.parked > 0) {
            const response = await fetch('http://192.168.0.108:8000/parkinglot/' + id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                },
                body: JSON.stringify({
                    actualparkedcars: park - 1,
                }),
            });
            let response_status = await response.status;
            if (response_status === 200) {
                alert("Unparked successfully");
                let pom = park - 1;
                this.setState({parked: pom});
            } else if (response_status === 401) {
                alert("Authentication credentials were not provided.");
            } else {
                alert("Request failed");
            }
        }
        else{
            alert("Parking lot is empty")
        }
    };

    onParked = async (id, park) => {
        if(this.state.parked < this.state.capacity) {
            const response = await fetch('http://192.168.0.108:8000/parkinglot/' + id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                },
                body: JSON.stringify({
                    actualparkedcars: park + 1,
                }),
            });
            let response_status = await response.status;
            if (response_status === 200) {
                alert("Parked successfully");
                let pom = park + 1;
                this.setState({parked: pom});
            } else if (response_status === 401) {
                alert("Authentication credentials were not provided.");
            } else {
                alert("Request failed");
            }
        }
        else{
            alert("Parking lot is full")
        }
    };

    componentDidMount() {
        this.setState({id: this.props.navigation.state.params.id});
        this.fetchData(this.props.navigation.state.params.id);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{this.state.name}</Text>
                    <Text style={styles.addressText}>{this.state.address}</Text>
                    <Text style={styles.localityText}>{this.state.town}, {this.state.country}</Text>
                    <Text style={styles.parkedText}>{this.state.parked}/{this.state.capacity}</Text>
                </View>
                <View style={styles.bottom}>
                    {this.state.isLoading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator />
                    </View> : this.state.photo !== '' ?
                        <Image style={{width: null, height: 300 , marginHorizontal: 15, paddingBottom: 5}}
                               source={{uri: `data:image/png;base64,${this.state.photo}`}}/> : <View/>}
                    <TouchableOpacity style={styles.buttContainer} onPress={() => this.handleChoosePhoto()}>
                        <Text style={styles.buttText}>
                            Upload new photo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttContainer} onPress={() => this.onParked(this.state.id, this.state.parked)}>
                        <Text style={styles.buttText}>Car parked</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttContainer} onPress={() => this.onParkedLeave(this.state.id, this.state.parked)}>
                        <Text style={styles.buttText}>Car left</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9fcdff',
    },
    textContainer: {
        padding: 20
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 0
    },
    buttContainer: {
        backgroundColor: '#ffc107',
        marginHorizontal: 20,
        marginVertical: 5,
        paddingVertical: 15,
        borderRadius: 10,
        bottom:0,
    },
    buttText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: '700'
    },
    parkedText: {
        fontSize: 32,
        fontWeight: '700',
        marginTop: 5
    },
    nameText: {
        fontSize: 36,
        fontWeight: '700',
        padding: 5
    },
    addressText: {
        fontSize: 24,
        padding: 5
    },
    localityText: {
        fontSize: 20,
        padding: 5
    }
});