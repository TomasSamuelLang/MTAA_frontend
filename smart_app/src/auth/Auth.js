import { AsyncStorage } from "react-native";

const USER_KEY = "MTAA_SMART_PARKING_APP";
const USER_ID = "USER_ID";
const USER_TOKEN = "USER_TOKEN";
const USER_NAME = "USER_NAME";
const USER = "USER";

export const storeUser = (user) => AsyncStorage.setItem(USER, JSON.stringify(user));
export const getUser = () => AsyncStorage.getItem(USER);
export const removeUser = () => AsyncStorage.removeItem(USER);

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

