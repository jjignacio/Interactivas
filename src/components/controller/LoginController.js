import urlWebServices from '../controller/WebServices.js';

export const Login = async (userMail, pass) => {
    //url webservices
    let URL_API = urlWebServices.login;

    let req = JSON.stringify({
        "email" : userMail,
        "password": pass
    })

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        const json = await response.json();
        let rdo = response.status;

        console.log(json,rdo)

        switch(rdo) {
            case 200: {
                // Guardo usuario logueado
                let user = json.data;
                localStorage.setItem("token",user.token); // Token.
                localStorage.setItem("_id",user._id);
                localStorage.setItem("nombre",user.nombre);
                localStorage.setItem("rol",user.rol);
                localStorage.setItem("email",user.mail);
                localStorage.setItem("usuarioValido", true);
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"El usuario ingresado no existe en nuestra base."});
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

export const RecoverPassword = async (userMail) => {
    //url webservices
    let URL_API = urlWebServices.recoverPassword;

    let req = JSON.stringify({
        "email" : userMail
    })

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        const json = await response.json();
        let rdo = response.status;

        console.log(json,rdo)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                return ({rdo:1, mensaje:"Error."});
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