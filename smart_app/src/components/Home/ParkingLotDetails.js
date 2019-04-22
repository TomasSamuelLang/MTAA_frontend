import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native';
import getPermission from "../../utils/permissions";
import {ImagePicker, Permissions} from "expo";

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
            isLoading: true
        };
    }

    fetchData = async (id) => {
        let res = await fetch('http://192.168.0.108:8000/parkinglot/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let response_status = await res.status;
        if (response_status === 404){
            alert("This parking lot does not exist.");
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
                }
            });
            let photo_response_status = await response.status;
            if (photo_response_status === 400){
                this.setState({photo: '', isLoading: false});
            }
            else {
                let photoJson = await response.json();
                this.setState({photo: photoJson.image, isLoading: false});
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

    componentDidMount() {
        this.setState({id: this.props.navigation.state.params.id});
        this.fetchData(this.props.navigation.state.params.id);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{this.state.name}</Text>
                    <Text style={styles.addressText}>{this.state.address}</Text>
                    <Text style={styles.localityText}>{this.state.town}, {this.state.country}</Text>
                    <Text style={styles.parkedText}>{this.state.parked}/{this.state.capacity}</Text>
                </View>
                <View style={styles.bottom}>
                    {this.state.isLoading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator />
                    </View> : <Image style={{width: null, height: 300}} source={{uri: `data:image/png;base64,${this.state.photo}`}}/>}
                    <TouchableOpacity style={styles.buttContainer} onPress={() => this.handleChoosePhoto()}>
                        <Text style={styles.buttText}>
                            Upload new photo
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        paddingVertical: 15,
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
    },
    addressText: {
        fontSize: 24
    },
    localityText: {
        fontSize: 20
    }
});