import React, { Component} from 'react';
import { isSignedIn } from "./src/auth/Auth";
import { createRootNavigator } from "./src/navigation/AppNavigator";

export const IP = "127.0.0.1:8000";

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            arrayholder: []
        };
        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount(){
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true}))
            .catch(err => alert(err));
    }

    onChanged(){

    }

    render() {
        const { signedIn } = this.state;
        const Layout = createRootNavigator(signedIn);
        return (
            <Layout />
        );
    }
}
