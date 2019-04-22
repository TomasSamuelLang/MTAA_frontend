import {storeID, storeName, storeToken } from "../../auth/Auth";

export async function registerUser(username, password) {
    try {
        let response = await fetch('http://192.168.0.108:8000/registeruser/',
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
        let response = await fetch('http://192.168.0.108:8000/loginuser/',
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
            alert("Username or password is wrong. Please check your input or sign up first.");
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