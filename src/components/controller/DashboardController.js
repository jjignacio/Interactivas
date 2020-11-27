import urlWebServices from '../controller/WebServices.js';


export const GetRelease = async () => {
    //url webservices
    let URL_API = urlWebServices.getRelease;

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
                return ({rdo:1, mensaje:"No se pudo recuperar la lista de lanzamientos."});
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

export const GetAllSurveys = async () => {
    //url webservices
    let URL_API = urlWebServices.getAllSurveys;

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

export const GetAllCompanies = async () => {
    //url webservices
    let URL_API = urlWebServices.getAllCompanies;

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

export const AddCompanies = async (lanzamiento_id, empresas_array, encuesta_modelo_id, fecha_vencimiento) => {
    //url webservices
    let URL_API = urlWebServices.addCompanies;

    let req = JSON.stringify({
        "_id": lanzamiento_id,
        "empresas": empresas_array,
        "encuesta_modelo_id": encuesta_modelo_id,
        "fecha_vencimiento": fecha_vencimiento
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

        //const data = await response.json();
        let rdo = response.status;

        console.log("Respuesta",rdo)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                return ({rdo:1, mensaje:"No se puede agrear empresas al lanzamiento."});
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