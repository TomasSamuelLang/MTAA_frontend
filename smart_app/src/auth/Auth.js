import { AsyncStorage } from "react-native";

const USER_KEY = "MTAA_SMART_PARKING_APP";
const USER_ID = "USER_ID";
const USER_TOKEN = "USER_TOKEN";
const USER_NAME = "USER_NAME";

export const storeID = (id) => AsyncStorage.setItem(USER_ID, JSON.stringify(id));
export const getID = () => AsyncStorage.getItem(USER_ID, (value) => {JSON.parse(value)});
export const removeID = () => AsyncStorage.removeItem(USER_ID);

export const storeToken = (token) => AsyncStorage.setItem(USER_TOKEN, token);
export const getToken = () => AsyncStorage.getItem(USER_TOKEN);
export const removeToken = () => AsyncStorage.removeItem(USER_TOKEN);

export const storeName = (name) => AsyncStorage.setItem(USER_NAME, name);
export const getName = () => AsyncStorage.getItem(USER_NAME);
export const removeName = () => AsyncStorage.removeItem(USER_NAME);

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");
export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};

