import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, FlatList} from 'react-native';
import {getAllParkingLots} from "../RestAPI/ApiCalls";
import ListItem from "react-native/local-cli/templates/HelloNavigation/components/ListItem";

export default class AddParking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            picture: '',
            name: '',
            address: '',
            capacity: '',
            parked: '',
            town: '',
            country: ''
        };
    }

    fetchData = async () => {
        const response = await fetch('http://127.0.0.1:8000/getphoto/2',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        this.setState({picture: json.photo});

        const res = await fetch('http://127.0.0.1:8000/parkinglot/2', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const jjson = await res.json();
        this.setState({name: jjson.name, address: jjson.address, capacity: jjson.capacity,
            parked: jjson.actualparkedcars, town: jjson.town.name, country: jjson.town.country.name});
    };

    componentWillMount() {
        this.fetchData();
    };

    onParked = async () => {
      const response = await fetch('http://127.0.0.1:8000/parkinglot/2',{
         method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              actualparkedcars: this.state.parked + 1,
          }),
      });
      if (response.status == 200){
          alert("Uspesne si zaparkoval");
          let pom = this.state.parked + 1;
          this.setState({parked: pom});
      }
    };

    onDelete = async () => {
      const response = await fetch('http://127.0.0.1:8000/parkinglot/2',{
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      });
      if (response.status ==204){
          alert("Uspesne si vymazal");
      }
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.buttonText1}>Meno: {this.state.name}</Text>
                <Text style={styles.buttonText1}>Adresa: {this.state.address}</Text>
                <Text style={styles.buttonText1}>Kapacita: {this.state.capacity}</Text>
                <Text style={styles.buttonText1}>Aktualne zaparkovane auta: {this.state.parked}</Text>
                <Text style={styles.buttonText1}>Mesto: {this.state.town}</Text>
                <Text style={styles.buttonText1}>Krajina: {this.state.country}</Text>
                <Image style={{width: 300, height: 300}} source={{uri: this.state.picture}}/>
                <TouchableOpacity onPress={() => this.onParked()}
                                  style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>ZAPARKOVAT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onDelete().then(() => navigate('HomeScreen'))}
                                  style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 80,
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
    buttonText1: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 15
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