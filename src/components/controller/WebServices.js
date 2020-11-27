const URL_API = "encuestas-app.herokuapp.com";
// const URL_API = "http://localhost:3000/";

const urlWebServices = {
    // Login
    login: `${URL_API}/login`,
    recoverPassword: `${URL_API}/security/recupero_password`,
    // CompanyController
    getAllCompanies: `${URL_API}​/empresa_user`,
    getCompany: `${URL_API}​/empresa_user`,
    createCompany: `${URL_API}​/empresa_user`,
    updateCompany: `${URL_API}​/empresa_user`,
    deleteCompany: `${URL_API}​/empresa_user`,
    // UserObsController
    getAllUsers: `${URL_API}​/obs_user`,
    createObsUser: `${URL_API}​/obs_user`,
    updateObsUser: `${URL_API}​/obs_user`,
    deleteObsUser: `${URL_API}​/obs_user`,
    // CompanyUserController
    getCompanySurveys: `${URL_API}​/encuesta_empresa_user`,
    submitSurvey: `${URL_API}/encuesta_empresa_user`,
    updatePassword: `${URL_API}/security/update_password`,
    // ReleasesController
    createRelease: `${URL_API}​/lanzamiento`,
    deleteRelease: `${URL_API}​/lanzamiento/empresa`,
    // DashboardController
    getRelease: `${URL_API}​/lanzamiento`,
    addCompanies: `${URL_API}/lanzamiento/empresa`,
    // Varios
    getAllSurveys: `${URL_API}​/encuesta_modelo`
}

export default urlWebServices;