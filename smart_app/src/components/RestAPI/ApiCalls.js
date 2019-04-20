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
            
        }
        return false;
    }
    catch (e){
        return false;
    }
};

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
};

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