import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import Footer from '../Footer'

// Importo llamada a endpoint
import {GetCompany as GetCompanyAPI} from "../controller/CompanyController";

// Importo llamada a endpoint
import {UpdatePassword as UpdatePasswordAPI} from "../controller/CompanyUserController";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_id: localStorage.getItem('_id'),
            empresa: [],

            active_view: 'profile',
            
            current_password: localStorage.getItem('pass'),
            input_current_password: '',
            new_password: '',
            confirm_password: '',

            msj_error_current_pass: '',
            msj_error_new_pass: '',
            className_current_pass: 'form-control',
            className_new_pass: 'form-control',

        };
        this.handleActiveView = this.handleActiveView.bind(this);
        this.goBack = this.goBack.bind(this);
        };

    componentDidMount() {
        this.getCompany();
    }

    getCompany = async () => {
        
        this.setState({active_view: 'loading'});

        let company_id = this.state.company_id

        let getCompanyAPIFromAPI = await GetCompanyAPI(company_id);

        if(getCompanyAPIFromAPI.rdo === 0) {
            this.setState({
                empresa: getCompanyAPIFromAPI.data.data,
            })
            this.setState({active_view: 'profile'});
        } else {
            this.setState({active_view: 'error'});
        }
    }

    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        let new_password = false
        let current_password_valid = false

        if(this.state.current_password === this.state.input_current_password) {
            this.setState({msj_error_current_pass: ''});
            this.setState({className_current_pass: "form-control is-valid"});
            current_password_valid = true
        } else {
            this.setState({msj_error_current_pass: 'La contraseña actual no es valida.'});
            this.setState({className_current_pass: "form-control is-invalid"});
            current_password_valid = false
        }

        if(this.state.new_password === this.state.confirm_password) {
            if(this.state.new_password !== this.state.current_password) {
                this.setState({msj_error_new_pass: ''});
                this.setState({className_new_pass: "form-control is-valid"});
                new_password = true
            } else {
                this.setState({msj_error_new_pass: 'La nueva contraseña debe ser distinta de la anterior.'});
                this.setState({className_new_pass: "form-control is-invalid"});
                new_password = false
            }
        } else {
            this.setState({msj_error_new_pass: 'Las contraseñas ingresadas no son iguales.'});
            this.setState({className_new_pass: "form-control is-invalid"});
            new_password = false
        }

        if(current_password_valid && new_password) {

            let company_id = this.state.company_id
            let new_password = this.state.new_password

            this.setState({active_view: 'loading'});

            let UpdatePassword = await UpdatePasswordAPI(company_id, new_password);

            if(UpdatePassword.rdo === 0 ) {
                this.setState({active_view: "success"});
            } else {
                this.setState({active_view: "error"});
            }
        }
    }

    goBack(){
        this.props.history.goBack();
    }

    goToLogin = () => {
        this.props.history.push('/login');
        //this.setState({active_view: 'profile'});
    }

    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            active_view: name
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        const active_view = this.state.active_view
        const empresa = this.state.empresa
        //console.log(this.state.company_id)
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <Nav history={this.props.history}/>
                    <div>
                        <div className="container-fluid vh-100">
                            <div className="row align-items-center justify-content-center mb-5">
                                <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                    <div className="card mt-5">
                                        <div className="card-body mt-5 mb-5">
                                            <div className="container text-center">
                                                <div className="spinner-grow spinner-observatorio" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                <br/>
                                                <p className="text-muted mt-3">Cargando...</p>
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )

        case "profile":
            return (
                <div>
                    <Nav history={this.props.history}/>
                    <div>
                        <div className="container-fluid">
                            <div className="row justify-content-center mb-5">
                                <div className="min-height"></div>
                                <div className="col-sm-12 col-md-7 col-lg-7 "> 
                                    <button 
                                        type="button" 
                                        className="btn btn-link mt-4"
                                        onClick={this.goBack}>
                                            Volver
                                    </button>
                                    <div className="card border-info mt-4">
                                        <div className="card-body">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-2 col-md-2 col-lg-2">
                                                        <i className="fas fa-user-circle user-icon-size"></i>
                                                    </div>
                                                    <div className="col-sm-10 col-md-7 col-lg-7">
                                                        <h5 className="card-title">{empresa.razon_social}</h5>
                                                        <h6 className="card-subtitle mb-2 text-muted">Cuit: {empresa.cuit}</h6>
                                                        <h6>{empresa.email}</h6>
                                                    </div>
                                                    <div className="col-sm-10 col-md-3 col-lg-3">
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-link"
                                                            name="change_password"
                                                            onClick={this.handleActiveView}>
                                                                Cambiar contraseña
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-4 mb-4">
                                        <div className="card-body">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                                        <ul>
                                                            <li>
                                                                Domicilio:
                                                                <span className="font-weight-light"> {empresa.domicilio} </span> 
                                                            </li>
                                                            <li className="mt-3">
                                                                Localidad: 
                                                                <span className="font-weight-light"> {empresa.localidad} </span>
                                                            </li>
                                                            <li className="mt-3">
                                                                Partido:
                                                                <span className="font-weight-light"> {empresa.partido} </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                                        <ul>
                                                            <li>
                                                                Provincia:
                                                                <span className="font-weight-light"> {empresa.provincia} </span>
                                                            </li>
                                                            <li className="mt-3">
                                                                Codigo Postal: 
                                                                <span className="font-weight-light"> {empresa.codigo_postal} </span> 
                                                            </li>
                                                            <li className="mt-3">
                                                                Telefono de contacto: 
                                                                <span className="font-weight-light"> {empresa.telefono} </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="card text-white bg-dark mt-5">
                                        <div className="card-body text-center">
                                            Lo cambios en el perfil de usuario deber&aacute;n ser solicitados al administrador del Sistema.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "change_password":
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div>
                        <div className="container-fluid">
                            <div className="row justify-content-center mb-5">
                                <div className="min-height"></div>
                                <div className="col-sm-12 col-md-7 col-lg-7"> 
                                    <button 
                                        type="button" 
                                        className="btn btn-link mt-4"
                                        name="profile"
                                        onClick={this.handleActiveView}>
                                            Volver
                                    </button>
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <h4 className="card-title text-center mt-3">Cambiar contraseña</h4>
                                            <small className="form-text text-muted text-center mb-5">Utiliza ocho caracteres como m&iacute;nimo con una combinaci&oacute;n de letras, n&uacute;meros y s&iacute;mbolos</small>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6 mb-6 mb-2">
                                                        <div className="form-group">
                                                            <label>Contraseña actual</label>
                                                            <input 
                                                                type="password" 
                                                                className={this.state.className_current_pass}
                                                                autoComplete="off" 
                                                                autoFocus={true} 
                                                                placeholder="Contraseña actual" 
                                                                required
                                                                name="input_current_password"
                                                                value={this.state.input_current_password}
                                                                onChange={this.myChangeHandler} />
                                                                { this.state.msj_error_current_pass !== '' ? ( <small className="text-danger">{this.state.msj_error_current_pass}</small> ) : null }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-6 mb-2">
                                                        <div className="form-group">
                                                            <label>Nueva contraseña</label>
                                                            <input 
                                                                type="password" 
                                                                className={this.state.className_new_pass}
                                                                autoComplete="off" 
                                                                placeholder="Nueva contraseña" 
                                                                required
                                                                name="new_password"
                                                                value={this.state.new_password}
                                                                onChange={this.myChangeHandler} />
                                                                { this.state.msj_error_new_pass !== '' ? ( <small className="text-danger">{this.state.msj_error_new_pass}</small> ) : null }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-6 mb-2">
                                                        <div className="form-group">
                                                            <label>Repita nueva contraseña</label>
                                                            <input 
                                                                type="password" 
                                                                className={this.state.className_new_pass}
                                                                autoComplete="off" 
                                                                placeholder="Nueva contraseña" 
                                                                required
                                                                name="confirm_password"
                                                                value={this.state.confirm_password}
                                                                onChange={this.myChangeHandler} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-3 mb-3">
                                                    <div className="col-md-12 mb-12">
                                                        <button 
                                                        type="submit" 
                                                        id="submit-btn" 
                                                        className="btn btn-outline-fundacion float-right">
                                                            Actualizar contraseña
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "success":
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div>
                        <div className="container-fluid vh-100">
                            <div className="row align-items-center justify-content-center mb-5">
                                <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                    <div className="card mt-5">
                                        <div className="card-body text-center">
                                            <button 
                                                type="button" 
                                                className="close" 
                                                name="profile" 
                                                onClick={this.goToLogin}
                                                aria-label="Close">
                                                &times;
                                            </button>

                                            <div className="mt-4"></div>

                                            <i className="material-icons ico-no-companies color-observatorio">check_circle</i>
                                            <br/>
                                            <h2>Contraseña actualizada.</h2>
                                            <div className="mb-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "error":
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div>
                        <div className="container-fluid vh-100">
                            <div className="row align-items-center justify-content-center mb-5">
                                <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                    <div className="card mt-5">
                                        <div className="card-body text-center">
                                            <button 
                                                type="button" 
                                                className="close" 
                                                name="profile" 
                                                onClick={(e) => {
                                                    this.handleActiveView(e);
                                                }}
                                                aria-label="Close">
                                                &times;
                                            </button>

                                            <div className="mt-4"></div>

                                            <i className="material-icons ico-no-companies">error</i>
                                            <br/>
                                            <h2>Algo salió mal.</h2>
                                            <p>No se pudo actualizar la contraseña.</p>
                                            <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                            <div className="mb-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        default:
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div>
                        <div className="container-fluid vh-100">
                            <div className="row align-items-center justify-content-center mb-5">
                                <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
                                    <div className="card mt-5">
                                        <div className="card-body text-center">
                                            <button 
                                                type="button" 
                                                className="close" 
                                                name="profile" 
                                                onClick={(e) => {
                                                    this.handleActiveView(e);
                                                }}
                                                aria-label="Close">
                                                &times;
                                            </button>

                                            <div className="mt-4"></div>

                                            <i className="material-icons ico-no-companies">error</i>
                                            <br/>
                                            <h2>Algo salió mal.</h2>
                                            <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                            <div className="mb-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

export default Profile;