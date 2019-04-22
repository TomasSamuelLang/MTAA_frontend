import React, { Component } from 'react';
import {View, FlatList, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SearchBar } from 'react-native-elements';
import { Icon } from "expo";
import {getID, getToken} from "../../auth/Auth"

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            value: '',
            token: ''
        };
        this.arrayholder = [];
    }

    fetchData = async () => {
        let response = await fetch('http://192.168.0.108:8000/parkinglot/',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                },
            });
        let response_status = await response.status;
        if (response_status === 401){
            alert("Authentication credentials were not provided.");
        } else if (response_status === 200){
            let responseJson = await JSON.parse(response._bodyInit);
            this.setState({data: responseJson});
            this.arrayholder = responseJson;
        } else alert("Request failed");
    };

    async componentDidMount() {
        this.setState({token: await getToken()});
        await this.fetchData();
        this.setState({isLoading: false});
    }

    onParked = async (id, park) => {

        const response = await fetch('http://192.168.0.108:8000/parkinglot/' + id,{
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
        if (response_status === 200){
            alert("Parked successfully");
            let pom = park + 1;
            this.setState({parked: pom});
        } else if (response_status === 401){
            alert("Authentication credentials were not provided.");
        }
        else {
            alert("Request failed");
        }
    };

    onDelete = async (id) => {
        try {
            let response = await fetch('http://192.168.0.108:8000/parkinglot/' + id,{
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                }
            });
            let response_status = await response.status;
            if (response_status === 204){
                alert("Successfully deleted");
                await this.fetchData();
            } else if (response_status === 404){
                alert("Request failed.");
            } else if (response_status === 401){
                alert("Authentication credentials were not provided.");
            }
        } catch (e) {
            alert("Request failed.");
        }
    };

    onLike = async (id) => {
        try {
            let user_id = await getID();
            let response = await fetch('http://192.168.0.108:8000/favouriteparkinglot/' + user_id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    parkinglot: id,
                    user: user_id,
                }),
            });
            let response_status = await response.status;
            if (response_status === 200){
                return true;
            }
        }
        catch (e) {
            return false;
        }
    };

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name} ${item.address} ${item.town}`;
            const textData = text;

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

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

        <View style={styles.container}>
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
            <SwipeListView
                useFlatList
                data={this.state.data}
                keyExtractor={item => item.id.toString()}
                renderItem={(data, rowMap) => (
                    <View style={styles.rowFront} >
                        <TouchableOpacity style={{width: 300, paddingVertical: 10}} onPress={() => navigate('DetailScreen', {id: data.item.id})}>
                            <Text style={styles.rowTextMain}>{data.item.name}</Text>
                            <Text style={styles.rowText}>{data.item.address}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                renderHiddenItem={(data) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity onPress={() => this.onParked(data.item.id, data.item.actualparkedcars)}>
                            <View>
                                <Text style={styles.backTextBlack}>Park</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={() => this.onLike(data.item.id)}>
                            <Text style={styles.backTextWhite}>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={() => Alert.alert(
                                'Delete parking lot',
                                'Are you sure you want to delete this parking lot ?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {text: 'OK', onPress: () => this.onDelete(data.item.id)},
                                ],
                                {cancelable: false},
                            )}>
                            <Text style={styles.backTextWhite}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-150}
            />
        </View>

            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9fcdff"
    },
    add: {
        fontSize: 18,
        fontWeight: "600",
        color: "#8395a7"
    },
    addWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    modalHolder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        backgroundColor: "#54a0ff",
        padding: 20,
        width: "80%",
        borderRadius: 5
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    textInput: {
        height: 25,
        marginTop: 20,
        borderBottomWidth: 1
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30
    },
    cancelButton: {
        backgroundColor: "#8395a7",
        width: "45%",
        paddingVertical: 10
    },
    addButton: {
        backgroundColor: "#01a3a4",
        width: "45%",
        paddingVertical: 10
    },
    buttonText: {
        textAlign: "center",
        color: "#c8d6e5"
    },
    rowFront: {
        alignItems: "center",
        backgroundColor: "#ffc107",
        justifyContent: "center",
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: "#feca57"
    },
    rowTextMain: {
        color: "#222f3e",
        fontWeight: "600",
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#c8d6e5",
    },
    rowText: {
        color: "#222f3e",
        fontWeight: "600",
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#c8d6e5",
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextBlack:{
        color: "#222f3e"
    },
    backTextWhite: {
        color: '#FFF',
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: 100,
    },
});
