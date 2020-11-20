import React, { Component } from "react";

// Componentes
import Menu from "../Menu";
import Footer from '../../Footer'

// Importo llamada a endpoint
import {UpdateUserObs as UpdateUserObsAPI} from "../../controller/UserObsController";
import {DeleteUserObs as DeleteUserObsAPI} from "../../controller/UserObsController";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: 'form_update_user',

            usuario: this.props.location.state.usuario,
            usuarioId: this.props.location.state.usuario._id,
            userName: this.props.location.state.usuario.nombre,
            userMail: this.props.location.state.usuario.email,
            userRol: this.props.location.state.usuario.rol,
            password: '',
            password_confirm: '',

            msj_error_email: '',
            msj_error_pass: '',
            className_email: 'form-control',
            className_pass: 'form-control',
            showConfirmarEliminado: false,
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
        console.log(this.state.userMail);
        console.log(this.state.userRol);
        console.log(this.state.password);
        console.log(this.state.password_confirm);

        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test((this.state.userMail))) {
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

            let userName = this.state.userName
            let userPass = this.state.password
            let userMail = this.state.userMail
            let userRol = this.state.userRol
            let userId = this.state.usuarioId

            this.setState({active_view: 'loading'});

            let updateUserObsFromAPI = await UpdateUserObsAPI(userId, userName, userPass, userMail, userRol);

            if(updateUserObsFromAPI.rdo === 0) {
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

    // Cambia en componente a mostrar a un usuario.
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

    // Borra el usuario y direcciona a la vista de usuarios.
    deleteUser = async (event) => {
        event.preventDefault();

        this.props.history.push({
            pathname: '/usuariosObservatorio',
        })

        let user_id = this.state.usuarioId
        
        this.setState({active_view: 'loading'});

        let deleteUserObsFromAPI = await DeleteUserObsAPI(user_id);

        if(deleteUserObsFromAPI.rdo === 0) {
            this.props.history.push({
                pathname: '/usuariosObservatorio',
            })
        } else {
            this.setState({active_view: 'error'});
        }
    }

    obsUser = () => {
        this.props.history.push({
            pathname: '/usuariosObservatorio',
        })
    }

    render() {
        const active_view = this.state.active_view
        const usuario = this.state.usuario
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
                                                        <p className="text-muted mt-3">Cargando usuario...</p>
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

        case "form_update_user":
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
                                                    <span className="card-title">Eliminar usuario. Recuerde que esta opción no se puede deshacer.</span>
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
                                                        <h4 className="card-title">{usuario.nombre}</h4>
                                                        <h6 className="card-subtitle mb-2 text-muted">En esta secci&oacute;n podr&aacute;s editar los datos de un usuario.</h6>
                                                    </div>
                                                    <form onSubmit={this.handleSubmit}>
                                                    <div className="row justify-content-center p-3">
                                                        <div className="col-md-6 mb-6 mb-2">
                                                            <div className="form-group">
                                                                <label htmlFor="textSurvey">Email</label>
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
                                                                <label htmlFor="textSurvey">Nombre y Apellido</label>
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
                                                                <label htmlFor="textSurvey">Rol</label>
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
                                                                        onClick={this.obsUser}>
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
                                                    <h4>¿Est&aacute;s seguro que quieres borrar este usuario?</h4>
                                                    <small>Ten en cuenta que perder&aacute;s todos los datos asociados.</small>

                                                    <div className="mb-3"></div>

                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-danger pad-left" 
                                                        onClick={this.deleteUser}>Eliminar usuario
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-link" 
                                                        name="form_update_user"
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
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card mt-5">
                                                <div className="card-body text-center">
                                                    <div className="mt-4"></div>
                                                    <i className="material-icons ico-no-companies color-observatorio">check_circle</i>
                                                    <br/>
                                                    <h2>Datos de usuario actualizados.</h2>
                                                    <small className="text-muted">Podes verlo 
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-link text-reset btn-aca  " 
                                                            onClick={this.obsUser}>acá.
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
                                                    <p>No se pudo actualizar el usuario.</p>
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

export default User;