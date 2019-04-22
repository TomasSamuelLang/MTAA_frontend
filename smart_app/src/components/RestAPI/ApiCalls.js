import {storeID, storeName, storeToken, getID} from "../../auth/Auth";

export async function registerUser(username, password) {
    try {
        let response = await fetch('http://127.0.0.1:8000/registeruser/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
        let response_status = await response.status;
        if (response_status === 201){
            return true;
        }
        if (response_status === 400){
            alert("This username already exists. Please change your username.");
            return false;
        }
        alert("Registration failed.");
        return false;
    } catch (e) {
        alert("Registration failed. Please check your internet connectivity.");
        return false;
    }
}

export async function loginUser(username, password) {
    try {
        let response = await fetch('http://127.0.0.1:8000/loginuser/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
        let response_status = await response.status;
        if (response_status === 200){
            let responseJson = await response.json();
            let user_id = responseJson.id;
            let user_name = responseJson.username;
            let user_token = responseJson.token;
            storeID(user_id);
            storeToken(user_token);
            storeName(user_name);
            return true;
        }
        if (response_status === 404){
            alert("This username does not exist. Please check your input or sign up first.");
            return false;
        }
        alert("Login failed.");
        return false;
    }
    catch (e){
        alert("Login failed. Please check your internet connectivity.");
        return false;
    }
}

export async function addParkingLot(name, address, capacity, townId) {
    let town = -1;

    try {
        let response = await fetch('http://127.0.0.1:8000/gettownid/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: townId,
            }),
        });
        if (response.status == 200){
            let responseJson = await response.json();
            town = responseJson.id;

            response = await fetch('http://127.0.0.1:8000/parkinglot/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    capacity: capacity,
                    actualparkedcars: 0,
                    town: town,
                }),
            });
            if(response.status == 201){
                alert("SEXESFUL");
            }
        } else alert("SKAP");
    } catch (e) {
        console.error(e);
    }
}

export async function getAllParkingLots(){
    try {
        let response = await fetch('http://127.0.0.1:8000/parkinglot/',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        if (response.status == 200){
            //let responseJson = await response.json();
            //return responseJson.result;
            return JSON.parse(response._bodyInit);
        } else return null;
    }
    catch (e){
        return null;
    }
}