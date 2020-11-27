import urlWebServices from '../controller/WebServices.js';

export const GetAllSurveys = async (company_id) => {
    //url webservices
    let URL_API = urlWebServices.getCompanySurveys;

    try {
        const response = await fetch('http://' + URL_API + '/' + company_id, {
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
                return ({rdo:1, mensaje:"No se pudo recuperar la lista de encuestas."});
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

export const SubmitSurvey = async (lanzamiento) => {
    //url webservices
    let URL_API = urlWebServices.submitSurvey;

    let req = JSON.stringify(lanzamiento)
    //console.log(lanzamiento)

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

        const data = await response.json();
        let rdo = response.status;

        console.log(data)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo recuperar la lista de encuestas."});
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

export const UpdatePassword = async (company_id, new_password) => {
    //url webservices
    let URL_API = urlWebServices.updatePassword;

    let req = JSON.stringify({
        "_id": company_id,
        "new_password": new_password
    })

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

        const data = await response.json();
        let rdo = response.status;

        console.log(data)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo recuperar la lista de encuestas."});
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