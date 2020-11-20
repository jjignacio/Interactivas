import urlWebServices from './WebServices.js';


export const NewRelease = async (encuesta_id, empresas_array, expiration_date, title_release) => {
    //url webservices
    let URL_API = urlWebServices.createRelease;

    let req = JSON.stringify({
        "nombre": title_release,
        "encuesta_modelo_id": "123456789",
        "fecha_vencimiento": expiration_date,
        "empresas": ["5fb74b44d83d62001792ccd1"]
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