import urlWebServices from './WebServices.js';

export const GetAllSurveys = async () => {
    //url webservices
    let URL_API = urlWebServices.getAllSurveys;

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
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

export const NewRelease = async (encuesta_id, empresas_array, expiration_date, title_release) => {
    //url webservices
    let URL_API = urlWebServices.createRelease;

    let req = JSON.stringify({
        "nombre": title_release,
        "encuesta_modelo_id": encuesta_id,
        "fecha_vencimiento": expiration_date,
        "empresas": empresas_array
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

        //const data = await response.json();
        let rdo = response.status;

        console.log(rdo)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                return ({rdo:1, mensaje:"No se crear el lanzamiento."});
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

export const DeleteCompanyFromReleace = async (releace_id, company_id) => {
    //url webservices
    let URL_API = urlWebServices.deleteRelease;

    let req = JSON.stringify({
        "lanzamiento_id": releace_id,
        "empresa_user_id": company_id
    })

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        //const data = await response.json();
        let rdo = response.status;

        console.log(rdo)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                return ({rdo:1, mensaje:"No se crear el lanzamiento."});
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