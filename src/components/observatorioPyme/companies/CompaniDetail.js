import React, { Component } from "react";

// Componentes
import Menu from "../Menu";
import Footer from '../../Footer'

// Importo llamada a endpoint
import {UpdateCompany as UpdateCompanyAPI} from "../../controller/CompanyController";
import {DeleteCompany as DeleteCompanyAPI} from "../../controller/CompanyController";

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'form_update_company',

            empresa: this.props.location.state.empresa,
            empresa_id: this.props.location.state.empresa._id,
            razon_social: this.props.location.state.empresa.razon_social,
            cuit: this.props.location.state.empresa.cuit,
            domicilio: this.props.location.state.empresa.domicilio,
            codigo_postal: this.props.location.state.empresa.codigo_postal,
            telefono: this.props.location.state.empresa.telefono,
            localidad: this.props.location.state.empresa.localidad,
            partido: this.props.location.state.empresa.partido,
            provincia: this.props.location.state.empresa.provincia,
            email: this.props.location.state.empresa.email,
            password: '',
            password_confirm: '',
            msj_error_email: '',
            msj_error_pass: '',
            className_email: 'form-control',
            className_pass: 'form-control',
            showConfirmarEliminado: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    // Validacion de los datos ingresados por el usuario y update de datos.
    handleSubmit = async (event) => {
        event.preventDefault();

        let mail_valido = false
        let passwords_validas = false

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

            let company_id = this.state.empresa_id

            let updateCompanyFromAPI = await UpdateCompanyAPI(company_id, razon_social, cuit, domicilio, codigo_postal, telefono, localidad, partido, provincia, email, password);

            if(updateCompanyFromAPI.rdo === 0) {
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

    // Borra la empresa y direcciona a la vista de emperesas.
    deleteCompany = async (event) => {
        event.preventDefault();

        let company_id = this.state.empresa_id
        
        this.setState({active_view: 'loading'});

        let deleteCompanyFromAPI = await DeleteCompanyAPI(company_id);

        if(deleteCompanyFromAPI.rdo === 0) {
            this.props.history.push({
                pathname: '/listadoEmpresas',
            })
        } else {
            this.setState({active_view: 'error'});
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

    cancel = () => {
        this.props.history.push({
            pathname: '/listadoEmpresas',
        })
    }

    render() {
        const active_view = this.state.active_view
        const empresa = this.state.empresa
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
                                        <div className="col col-sm-12 col-md-9 col-lg-10">
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
                        </div>
                    </div>
                    <Footer/>
                </div>
            )

        case "form_update_company":
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
                                        <div className="col col-sm-12 col-md-9 col-lg-10">
                                            <div className="card text-white bg-danger mb-3 mt-4">
                                                <div className="card-body">
                                                    <span className="card-title">Eliminar empresa. Recuerde que esta opción no se puede deshacer.</span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark float-right"
                                                        name="delete_user"
                                                        onClick={this.handleActiveView}>
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card ">
                                                <div className="card-body">
                                                    <div className="col-sm-12 col-md-12 col-lg-12 mb-3">
                                                        <h4 className="card-title">{empresa.razon_social}</h4>
                                                        <h6 className="card-subtitle mb-2 text-muted">En esta secci&oacute;n podr&aacute;s editar los datos de una empresa.</h6>
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
                                                                        type="text" 
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
                                                                        onClick={this.cancel}>
                                                                        Cancelar
                                                                    </button>
                                                                </div>
                                                                <div className="col col-sm-12 col-md-6 col-lg-6">
                                                                    <button
                                                                        type="submit"
                                                                        value="Submit"
                                                                        className="btn btn-outline-fundacion float-right">
                                                                        Modificar
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
        case "delete_user":
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
                                    <div className="row justify-content-center mt-5">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card border-danger">
                                                <div className="card-body">
                                                    <h4>¿Est&aacute;s seguro que quieres borrar esta empresa?</h4>
                                                    <small>Ten en cuenta que perder&aacute;s todos los datos asociados y sus encuestas activas.</small>

                                                    <div className="mb-3"></div>

                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-danger pad-left" 
                                                        onClick={this.deleteCompany}>Eliminar empresa
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-link" 
                                                        name="form_update_company"
                                                        onClick={this.handleActiveView}>Cancelar
                                                    </button>

                                                    <div className="mb-3"></div>
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
                                        <div className="col col-sm-12 col-md-9 col-lg-10">
                                            <div className="card mt-5">
                                                <div className="card-body text-center">
                                                    <div className="mt-4"></div>
                                                    <i className="material-icons ico-no-companies color-observatorio">check_circle</i>
                                                    <br/>
                                                    <h2>Datos de la empresa actualizados.</h2>
                                                    <small className="text-muted">Podes verla 
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-link text-reset btn-aca  " 
                                                            onClick={this.cancel}>acá.
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
                                        <div className="col col-sm-12 col-md-9 col-lg-10">
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
                                        <div className="col col-sm-12 col-md-9 col-lg-10">
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

export default Companies;