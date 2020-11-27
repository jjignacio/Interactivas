import urlWebServices from '../controller/WebServices.js';

export const GetAllUsers = async () => {
    //url webservices
    let URL_API = urlWebServices.getAllUsers;

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        let rdo = response.status;

        console.log(data)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo recuperar la lista de empresas."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const CreateUserObs = async (userName, userPass, userMail, userRol) => {
    //url webservices
    let URL_API = urlWebServices.createObsUser;

    let req = JSON.stringify({
        "nombre": userName,
        "password": userPass,
        "email": userMail,
        "rol": userRol
    })

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;

        console.log(rdo)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo crear la empresa."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const UpdateUserObs = async (userId, userName, userPass, userMail, userRol) => {
    //url webservices
    let URL_API = urlWebServices.updateObsUser;

    let req = JSON.stringify({
        "_id": userId,
        "nombre": userName,
        "password": userPass,
        "email": userMail,
        "rol": userRol
    })

    console.log(req)

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;

        console.log(rdo)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo actualizar el usuario."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const DeleteUserObs = async (user_id) => {
    //url webservices
    let URL_API = urlWebServices.deleteCompany;

    try {
        const response = await fetch('http://' + URL_API + '/' + user_id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        console.log(rdo)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo borrar el usuario."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}