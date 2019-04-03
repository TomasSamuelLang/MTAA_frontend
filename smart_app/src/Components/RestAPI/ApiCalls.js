export async function registerUser(login, password) {
    try {
        let response = await fetch('http://127.0.0.1:8000/registeruser/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login:login,
                    password:password,
                }),
            });
        if (response.status == 201){
            let responseJson = await response.json();
            console.log(responseJson);
        }

    } catch (e) {
        console.error(e);
    }
};

export async function loginUser(login, password) {
    try {
        let response = await fetch('http://127.0.0.1:8000/loginuser/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    password: password,
                }),
            });
        if (response.status == 200){
            console.log(response)
        }
    }
    catch (e){
        console.error(e);
    }
};
