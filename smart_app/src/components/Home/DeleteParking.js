import React, { Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, FlatList} from 'react-native';
import { getAllParkingLots } from "../RestAPI/ApiCalls";

export default class DeleteParking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        };
    }

    fetchData = async () => {
        const response = await fetch('http://127.0.0.1:8000/parkinglot/',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        this.setState({data: JSON.parse(response._bodyInit)});
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading){
            return(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View>
                <FlatList data = {this.state.data}
                            showsVerticalScrollIndicator = {true}
                            keyExtractor={item => item.name}
                            renderItem={({ item }) => (
                                <ListItem
                                    title={item.name}
                                    subtitle={item.address}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                />
                            )}
            />
            </View>
        );
    }
}