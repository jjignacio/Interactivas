import urlWebServices from '../controller/WebServices.js';


export const GetRelease = async () => {
    //url webservices
    let URL_API = urlWebServices.getRelease;

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