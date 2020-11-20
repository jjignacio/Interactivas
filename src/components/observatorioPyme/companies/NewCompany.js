import React, { Component } from 'react';

// Componentes
import Menu from "../Menu";
import Footer from '../../Footer'

// Importo llamada a endpoint
import {CreateCompany as CreateCompanyAPI} from "../../controller/CompanyController";

class NewCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'form_new_company',

            razon_social: '',
            cuit: '',
            domicilio: '',
            codigo_postal: '',
            telefono: '',
            localidad: '',
            partido: '',
            provincia: '',
            email: '',
            password: '',
            password_confirm: '',

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

        console.log(this.state.razon_social);
        console.log(this.state.cuit);
        console.log(this.state.domicilio);
        console.log(this.state.codigo_postal);
        console.log(this.state.telefono);
        console.log(this.state.localidad);
        console.log(this.state.partido);
        console.log(this.state.provincia);
        console.log(this.state.email);
        console.log(this.state.password);
        console.log(this.state.password_confirm);

        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test((this.state.email))) {
            this.setState({msj_error_email: ''});
            this.setState({className_email: "form-control is-valid"});
            mail_valido = true
        } else {
            this.setState({msj_error_email: 'Ingrese un email valido.'});
            this.setState({className_email: "form-control is-invalid"});
            mail_valido = false
        }

        if(this.state.password === this.state.password_confirm) {
            this.setState({msj_error_pass: ''});
            this.setState({className_pass: "form-control is-valid"});
            passwords_validas = true
        } else {
            this.setState({msj_error_pass: "Las contraseñas ingresadas no coinciden"});
            this.setState({className_pass: "form-control is-invalid"});
            passwords_validas = false
        }

        if(mail_valido && passwords_validas) {

            let razon_social = this.state.razon_social
            let cuit = this.state.cuit
            let domicilio = this.state.domicilio
            let codigo_postal = this.state.codigo_postal
            let telefono = this.state.telefono
            let localidad = this.state.localidad
            let partido = this.state.partido
            let provincia = this.state.provincia
            let email = this.state.email
            let password = this.state.password

            this.setState({active_view: 'loading'});

            let createCompanyAPIFromAPI = await CreateCompanyAPI(razon_social, cuit, domicilio, codigo_postal, telefono, localidad, partido, provincia, email, password);

            if(createCompanyAPIFromAPI.rdo === 0) {
                this.setState({active_view: 'success'});
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else {
                this.setState({active_view: 'error'});
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
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

    companies = () => {
        this.props.history.push('/listadoEmpresas');
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
                                                        <p className="text-muted mt-3">Creando empresa</p>
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

        case "form_new_company":
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
                                                        <h4 className="card-title">Nueva Empresa</h4>
                                                        <h6 className="card-subtitle mb-2 text-muted">Formulario para dar de alta una nueva empresa en el sistema de encuestas.</h6>
                                                    </div>
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="row justify-content-center p-3">
                                                            <div className="col-md-12 mb-12 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Raz&oacute;n Social</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        autoComplete="off" 
                                                                        autoFocus={true} 
                                                                        placeholder="Raz&oacute;n Social" 
                                                                        required
                                                                        name="razon_social"
                                                                        value={this.state.razon_social}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 mb-12 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">CUIT</label>
                                                                    <input 
                                                                        type="string" 
                                                                        className="form-control"
                                                                        autoComplete="off"  
                                                                        placeholder="CUIT" 
                                                                        required 
                                                                        name="cuit"
                                                                        value={this.state.cuit}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 mb-12 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Domicilio</label>
                                                                    <input  
                                                                        type="text" 
                                                                        className="form-control"
                                                                        autoComplete="off" 
                                                                        placeholder="Domicilio" 
                                                                        required 
                                                                        name="domicilio"
                                                                        value={this.state.domicilio}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">C&oacute;digo Postal</label>
                                                                    <input  
                                                                        type="number" 
                                                                        className="form-control"
                                                                        autoComplete="off" 
                                                                        placeholder="C&oacute;digo Postal" 
                                                                        required 
                                                                        name="codigo_postal"
                                                                        value={this.state.codigo_postal}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Tel&eacute;fono</label>
                                                                    <input  
                                                                        type="number" 
                                                                        className="form-control"
                                                                        autoComplete="off" 
                                                                        placeholder="Tel&eacute;fono" 
                                                                        required 
                                                                        name="telefono"
                                                                        value={this.state.telefono}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Localidad</label>
                                                                    <input  
                                                                        type="text" 
                                                                        className="form-control"
                                                                        autoComplete="off" 
                                                                        placeholder="Localidad" 
                                                                        required 
                                                                        name="localidad"
                                                                        value={this.state.localidad}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Partido</label>
                                                                    <input  
                                                                        type="text" 
                                                                        className="form-control"
                                                                        autoComplete="off" 
                                                                        placeholder="Partido" 
                                                                        required 
                                                                        name="partido"
                                                                        value={this.state.partido}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Provincia</label>
                                                                    <select 
                                                                        className="form-control"
                                                                        name="provincia"
                                                                        required
                                                                        value={this.state.provincia}
                                                                        onChange={this.myChangeHandler} >
                                                                    <option defaultValue disabled value="">Seleccion&aacute; una provincia ...</option>
                                                                    <option value="Buenos Aires">Buenos Aires</option>
                                                                    <option value="Catamarca">Catamarca</option>
                                                                    <option value="Chaco">Chaco</option>
                                                                    <option value="Chubut">Chubut</option>
                                                                    <option value="C&oacute;rdoba">C&oacute;rdoba</option>
                                                                    <option value="Corrientes">Corrientes</option>
                                                                    <option value="Entre R&iacute;os">Entre R&iacute;os</option>
                                                                    <option value="Formosa">Formosa</option>
                                                                    <option value="Jujuy">Jujuy</option>
                                                                    <option value="La Pampa">La Pampa</option>
                                                                    <option value="La Rioja">La Rioja</option>
                                                                    <option value="Mendoza">Mendoza</option>
                                                                    <option value="Misiones">Misiones</option>
                                                                    <option value="Neuqu&eacute;n">Neuqu&eacute;n</option>
                                                                    <option value="R&iacute;o Negro">R&iacute;o Negro</option>
                                                                    <option value="Salta">Salta</option>
                                                                    <option value="San Juan">San Juan</option>
                                                                    <option value="San Luis">San Luis</option>
                                                                    <option value="Santa Cruz">Santa Cruz</option>
                                                                    <option value="Santa Fe">Santa Fe</option>
                                                                    <option value="Santiago del Estero">Santiago del Estero</option>
                                                                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                                                                    <option value="Tucum&aacute;n">Tucum&aacute;n</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Email</label>
                                                                    <input  
                                                                        type="text" 
                                                                        className={this.state.className_email}
                                                                        autoComplete="off" 
                                                                        placeholder="Email" 
                                                                        required 
                                                                        name="email"
                                                                        value={this.state.email}
                                                                        onChange={this.myChangeHandler} />
                                                                        { this.state.msj_error_email !== '' ? ( <small className="text-danger">{this.state.msj_error_email}</small> ) : null }
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Contrase&ntilde;a</label>
                                                                    <input  
                                                                        type="password" 
                                                                        className={this.state.className_pass}
                                                                        autoComplete="off" 
                                                                        placeholder="Contrase&ntilde;a" 
                                                                        required 
                                                                        name="password"
                                                                        value={this.state.password}
                                                                        onChange={this.myChangeHandler} />
                                                                </div>
                                                                { this.state.msj_error_pass !== '' ? ( <small className="text-danger">{this.state.msj_error_pass}</small> ) : null }
                                                            </div>
                                                            <div className="col-md-6 mb-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="textSurvey">Confirma la contrase&ntilde;a</label>
                                                                    <input  
                                                                        type="password" 
                                                                        className={this.state.className_pass}
                                                                        autoComplete="off" 
                                                                        placeholder="Confirma la contrase&ntilde;a" 
                                                                        required 
                                                                        name="password_confirm"
                                                                        value={this.state.password_confirm}
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
                                                                        onClick={this.companies}>
                                                                        Cancelar
                                                                    </button>
                                                                </div>
                                                                <div className="col col-sm-12 col-md-6 col-lg-6">
                                                                    <button
                                                                        type="submit"
                                                                        value="Submit"
                                                                        className="btn btn-outline-fundacion float-right"
                                                                        onClick={this.cancel}>
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
                                                    <h2>Empresa creada.</h2>
                                                    <small className="text-muted">Podes verla 
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-link text-reset btn-aca  " 
                                                            onClick={this.companies}>acá.
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
                                                    <p>No se pudo crear la empresa.</p>
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