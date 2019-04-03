import { Permissions } from 'expo';
import { Linking } from 'react-native';

export default  async function getPermission(permission) {
    let { status } = await Permissions.getAsync(permission);

    if(status !== 'granted') {
        status = await Permissions.askAsync(permission);
        if(status !== 'granted') {
            Linking.openURL('app-settings:');
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }

}
