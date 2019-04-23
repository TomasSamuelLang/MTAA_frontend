import React, { Component } from 'react';
import {View, FlatList, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SearchBar, Icon } from 'react-native-elements';
import {getUser} from "../../auth/Auth";
import { IP } from "../../../App";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            fetchingData: false,
            data: [],
            value: '',
            token: '',
            id: '',
            liked: [],
            favouriteholder: []

        };
        this.parkingholder = [];
    }

    fetchData = async () => {
        let response = await fetch('http://' + IP + '/parkinglot/',
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
            Alert.alert('Error',"Authentication credentials were not provided.");
        } else if (response_status === 200){
            let responseJson = await JSON.parse(response._bodyInit);
            this.setState({data: responseJson});
            this.parkingholder = responseJson;
            let fav_response = await fetch('http://' + IP + '/favouriteparkinglot/' + this.state.id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                },
            });
            let favejson = await fav_response.json();
            this.setState({favouriteholder: favejson})
        } else Alert.alert('Error',"Request failed");
    };

    async componentDidMount() {
        const user = JSON.parse(await getUser());
        this.setState({token: user.token, id: user.id});
        await this.fetchData();
        this.setState({isLoading: false});
    }

    onParked = async (id, park, capacity) => {
        if(park < capacity) {
            let resp = await fetch('http://' + IP + '/parkinglot/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                },
            });
            let res_status = await resp.status;
            if(res_status === 200) {
                let res_json = await resp.json();

                let response = await fetch('http://' + IP + '/parkinglot/' + id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + this.state.token
                    },
                    body: JSON.stringify({
                        actualparkedcars: res_json.actualparkedcars + 1,
                    }),
                });
                let response_status = await response.status;
                if (response_status === 200) {
                    Alert.alert('Success',"Parked successfully");
                    let pom = res_json.actualparkedcars + 1;
                    this.setState({parked: pom});
                } else if (response_status === 401) {
                    Alert.alert('Error',"Authentication credentials were not provided.");
                } else {
                    Alert.alert('Error',"Request failed");
                }
            }
        }
        else{
            Alert.alert('Info',"Parking lot is full");
        }
    };

    onDelete = async (id) => {
        try {
            let response = await fetch('http://' + IP + '/parkinglot/' + id,{
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                }
            });
            let response_status = await response.status;
            if (response_status === 204){
                Alert.alert('Success',"Successfully deleted");
                await this.fetchData();
            } else if (response_status === 404){
                Alert.alert('Error',"Request failed.");
            } else if (response_status === 401){
                Alert.alert('Error',"Authentication credentials were not provided.");
            }
        } catch (e) {
            Alert.alert('Error',"Request failed.");
        }
    };

    onDislike = async (id) => {
        try {
            let response = await fetch('http://' + IP + '/favouriteparkinglot/' + id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                },
            });
            let response_status = await response.status;
            if (response_status === 204){
                const temp = this.state.favouriteholder.filter(item => {
                    return item.id !== id;
                });
                this.setState({favouriteholder: temp})
            } else Alert.alert('Error',"Request failed.");
        } catch (e) {
            Alert.alert('Error',"Request failed.");
        }
    };

    onLike = async (id) => {
        try {
            let response = await fetch('http://' + IP + '/favouriteparkinglot/' + this.state.id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                },
                body: JSON.stringify({
                    parkinglot: id,
                    user: this.state.id,
                }),
            });
            let response_status = await response.status;
            let responseJson = await response.json();
            if (response_status === 200){
                const temp = this.state.favouriteholder;
                temp.push(responseJson);
                this.setState({favouriteholder: temp});
            } else Alert.alert('Error',"Request failed.");
        }
        catch (e) {
            Alert.alert('Error',"Request failed.");
        }
    };

    _renderThumb(id){
        const result = this.state.favouriteholder.filter(item => {
            return item.parkinglot === id;
        });

        if (result.length > 0){
            return <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                     onPress={() => this.onDislike(result[0].id)}>
                <Icon
                    name='ios-thumbs-down'
                    type='ionicon'
                    color='white'
                />
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                     onPress={() => this.onLike(id)}>
                <Icon
                    name='ios-thumbs-up'
                    type='ionicon'
                    color='white'
                />
            </TouchableOpacity>
        }
    }

    _renderStar(id){
        const result = this.state.favouriteholder.filter(item => {
            return item.parkinglot === id;
        });
        if (result.length > 0){
            return <View style={{justifyContent: 'flex-end', marginRight: 25}}>
            <Icon
                name='ios-star'
                type='ionicon'
                color='black'
            /></View>
        }
    }

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.parkingholder.filter(item => {
            const itemData = `${item.name} ${item.address}`;
            return itemData.indexOf(text) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    _onRefresh(){
        this.setState({fetchingData: true});
        this.fetchData();
        this.setState({fetchingData: false});
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
                refreshing={this.state.fetchingData}
                onRefresh={() => this._onRefresh()}
                data={this.state.data}
                keyExtractor={item => item.id.toString()}
                renderItem={(data, rowMap) => (
                    <View style={styles.rowFront}>
                        <TouchableOpacity style={styles.flexing} onPress={() => navigate('DetailScreen', {id: data.item.id})}>
                            <View style={{justifyContent: 'flex-start', marginLeft: 25}}>
                                <Text style={styles.rowTextMain}>{data.item.name}</Text>
                                <Text style={styles.rowText}>{data.item.address}</Text>
                            </View>
                            {this._renderStar(data.item.id)}
                        </TouchableOpacity>
                    </View>

                )}
                renderHiddenItem={(data) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backRightBtn, styles.yellowCock]}
                                          onPress={() => this.onParked(data.item.id, data.item.actualparkedcars, data.item.capacity)}>
                            <Text style={styles.backTextBlack}>Park</Text>
                        </TouchableOpacity>
                        {this._renderThumb(data.item.id)}
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
                            <Icon
                                reverse
                                name='ios-trash'
                                type='ionicon'
                                color='red'
                            />
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-150}
            />
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9fcdff",
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
    flexing: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowFront: {
        height: 80,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        borderBottomColor: "#6e6c65"
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
        color: "#000000"
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
    yellowCock:{
        backgroundColor: '#ffc107',
        left: 0,
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
