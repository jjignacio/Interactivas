import urlWebServices from '../controller/WebServices.js';

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

export const CreateCompany = async (razon_social, cuit, domicilio, codigo_postal, telefono, localidad, partido, provincia, email, password) => {
    //url webservices
    let URL_API = urlWebServices.createCompany;

    let req = JSON.stringify({
        "razon_social": razon_social,
        "cuit": cuit,
        "domicilio": domicilio,
        "codigo_postal": codigo_postal,
        "telefono": telefono,
        "localidad": localidad,
        "partido": partido,
        "provincia": provincia,
        "email": email,
        "password": password
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

export const UpdateCompany = async (company_id, razon_social, cuit, domicilio, codigo_postal, telefono, localidad, partido, provincia, email, password) => {
    //url webservices
    let URL_API = urlWebServices.updateCompany;

    let req = JSON.stringify({
        "_id": company_id,
        "razon_social": razon_social,
        "cuit": cuit,
        "domicilio": domicilio,
        "codigo_postal": codigo_postal,
        "telefono": telefono,
        "localidad": localidad,
        "partido": partido,
        "provincia": provincia,
        "email": email,
        "password": password
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

export const DeleteCompany = async (company_id) => {
    //url webservices
    let URL_API = urlWebServices.deleteCompany;

    try {
        const response = await fetch('http://' + URL_API + '/' + company_id, {
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
                return ({rdo:1, mensaje:"No se pudo borrar la empresa."});
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

export const GetCompany = async (company_id) => {
    //url webservices
    let URL_API = urlWebServices.getCompany;

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