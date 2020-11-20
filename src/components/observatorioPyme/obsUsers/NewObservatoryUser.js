import React, { Component } from 'react';

// Componentes
import Menu from "../Menu";
import Footer from '../../Footer'

// Importo llamada a endpoint
import {CreateUserObs as CreateUserObsAPI} from "../../controller/UserObsController";

class NewCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'form_new_user',

            userName: '',
            userPass: '',
            confirmPass: '',
            userMail: '',
            userRol: '',

            msj_error_email: '',
            msj_error_pass: '',
            className_email: 'form-control',
            className_pass: 'form-control',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) => {
        event.preventDefault();

        let mail_valido = false
        let passwords_validas = false

        console.log(this.state.userName);
        console.log(this.state.userPass);
        console.log(this.state.confirmPass);
        console.log(this.state.userMail);
        console.log(this.state.userRol);

        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test((this.state.userMail))) {
            this.setState({msj_error_email: ''});
            this.setState({className_email: "form-control is-valid"});
            mail_valido = true
        } else {
            this.setState({msj_error_email: 'Ingrese un email valido.'});
            this.setState({className_email: "form-control is-invalid"});
            mail_valido = false
        }

        if(this.state.userPass === this.state.confirmPass) {
            this.setState({msj_error_pass: ''});
            this.setState({className_pass: "form-control is-valid"});
            passwords_validas = true
        } else {
            this.setState({msj_error_pass: "Las contraseñas ingresadas no coinciden"});
            this.setState({className_pass: "form-control is-invalid"});
            passwords_validas = false
        }

        if(mail_valido && passwords_validas) {

            let userName = this.state.userName
            let userPass = this.state.userPass
            let userMail = this.state.userMail
            let userRol = this.state.userRol

            this.setState({active_view: 'loading'});

            let createUserObsFromAPI = await CreateUserObsAPI(userName, userPass, userMail, userRol);

            if(createUserObsFromAPI.rdo === 0) {
                this.setState({active_view: 'success'});
            } else {
                this.setState({active_view: 'error'});
            }
        }
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
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

    users = () => {
        this.props.history.push('/usuariosObservatorio');
    }

    render() {
        const active_view = this.state.active_view
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card mt-5">
                                                <div className="card-body mt-5 mb-5">
                                                    <div className="container text-center">
                                                        <div className="spinner-grow spinner-observatorio" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                        <br/>
                                                        <p className="text-muted mt-3">Creando usuario</p>
                                                    </div>    
                                                </div>
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

        case "form_new_user":
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card mt-5">
                                                <div className="card-body">
                                                    <div className="col-sm-12 col-md-12 col-lg-12 mb-3">
                                                        <h4 className="card-title">Nuevo Usuario</h4>
                                                        <h6 className="card-subtitle mb-2 text-muted">Formulario para dar de alta un nuevo usuario en el sistema de encuestas.</h6>
                                                    </div>
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="row justify-content-center p-3">
                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label>Email</label>
                                                                    <input  
                                                                        type="text" 
                                                                        className={this.state.className_email}
                                                                        autoComplete="off" 
                                                                        placeholder="Email" 
                                                                        autoFocus={true} 
                                                                        required 
                                                                        name="userMail"
                                                                        value={this.state.userMail}
                                                                        onChange={this.myChangeHandler} />
                                                                        { this.state.msj_error_email !== '' ? ( <small className="text-danger">{this.state.msj_error_email}</small> ) : null }
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-6 mb-2"></div>

                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label>Nombre y Apellido</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        autoComplete="off" 
                                                                        placeholder="Nombre y Apellido" 
                                                                        required
                                                                        name="userName"
                                                                        value={this.state.userName}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label>Rol</label>
                                                                    <select 
                                                                        className="form-control"
                                                                        name="userRol"
                                                                        required
                                                                        value={this.state.userRol}
                                                                        onChange={this.myChangeHandler} >
                                                                    <option defaultValue disabled value="">Seleccion&aacute; rol del usuario</option>
                                                                    <option value="Observatorio">Observatorio</option>
                                                                    <option value="Observatorio_Admin">Observatorio Admin</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-6">
                                                                <div className="form-group">
                                                                    <label>Contrase&ntilde;a</label>
                                                                    <input  
                                                                        type="password" 
                                                                        className={this.state.className_pass}
                                                                        autoComplete="off" 
                                                                        placeholder="Contrase&ntilde;a" 
                                                                        required 
                                                                        name="userPass"
                                                                        value={this.state.userPass}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                                { this.state.msj_error_pass !== '' ? ( <small className="text-danger">{this.state.msj_error_pass}</small> ) : null }
                                                            </div>
                                                            <div className="col-md-6 mb-6">
                                                                <div className="form-group">
                                                                    <label>Confirma la contrase&ntilde;a</label>
                                                                    <input  
                                                                        type="password" 
                                                                        className={this.state.className_pass}
                                                                        autoComplete="off" 
                                                                        placeholder="Confirma la contrase&ntilde;a" 
                                                                        required 
                                                                        name="confirmPass"
                                                                        value={this.state.confirmPass}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col col-sm-12 col-md-6 col-lg-6 align-items-left">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-danger"
                                                                        onClick={this.users}>
                                                                        Cancelar
                                                                    </button>
                                                                </div>
                                                                <div className="col col-sm-12 col-md-6 col-lg-6">
                                                                    <button
                                                                        type="submit"
                                                                        value="Submit"
                                                                        className="btn btn-outline-fundacion float-right"
                                                                        onClick={this.handleSubmit}>
                                                                        Dar de alta
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
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
        case "success":
            return(
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card mt-5">
                                                <div className="card-body text-center">
                                                    <div className="mt-4"></div>
                                                    <i className="material-icons ico-no-companies color-observatorio">check_circle</i>
                                                    <br/>
                                                    <h2>Usuario creado.</h2>
                                                    <small className="text-muted">Podes verlo 
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-link text-reset btn-aca  " 
                                                            onClick={this.users}>acá.
                                                        </button>
                                                    </small>
                                                    <div className="mb-5"></div>
                                                </div>
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
        case "error":
            return(
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card mt-5">
                                                <div className="card-body text-center">
                                                    <div className="mt-4"></div>
                                                    <i className="material-icons ico-no-companies">error</i>
                                                    <br/>
                                                    <h2>Algo salió mal.</h2>
                                                    <p>No se pudo crear el usuario.</p>
                                                    <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                                    <div className="mb-5"></div>
                                                </div>
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
        default:
            return(
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card mt-5">
                                                <div className="card-body text-center">
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
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

export default NewCompany;