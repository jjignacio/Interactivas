const URL_API = "encuestas-app.herokuapp.com";
// const URL_API = "http://localhost:3000/";

const urlWebServices = {
    getAllCompanies: `${URL_API}​/empresa_user`,
    getCompany: `${URL_API}​/empresa_user`,
    createCompany: `${URL_API}​/empresa_user`,
    updateCompany: `${URL_API}​/empresa_user`,
    deleteCompany: `${URL_API}​/empresa_user`,

    getAllUsers: `${URL_API}​/obs_user`,
    createObsUser: `${URL_API}​/obs_user`,
    updateObsUser: `${URL_API}​/obs_user`,
    deleteObsUser: `${URL_API}​/obs_user`,

    getAllSurveys: `${URL_API}​/encuesta_modelo`,

    getRelease: `${URL_API}​/lanzamiento`,
    createRelease: `${URL_API}​/lanzamiento`,
    deleteRelease: `${URL_API}​/lanzamiento`,

    getCompanySurveys: `${URL_API}​/encuesta_empresa_user`,

    login: `${URL_API}/login`,
    recoverPassword: `${URL_API}/empresa_user/recupero_password`,

    submitSurvey: `${URL_API}/encuesta_empresa_user`
}

export default urlWebServices;