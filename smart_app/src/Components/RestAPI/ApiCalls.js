export const registerUser = async () => {
    fetch('http://127.0.0.1:8000/registeruser/',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: 'testapp1',
                username: 'testapp1'
            })
        }).then((response) => response.json()).then((responseJson) => {
            alert(responseJson.toString());
    }).catch((error) => {
        console.error(error);
    });
};

export const loginUser = async () => {
    fetch('http://127.0.0.1:8000/loginuser/',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: 'testapp1',
                username: 'testapp1'
            })
        }).then((response) => response.json()).then((responseJson) => {
        alert(responseJson.toString());
    }).catch((error) => {
        console.error(error);
    });
};
