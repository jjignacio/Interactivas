import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import Footer from '../Footer'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        };

    goBack(){
         this.props.history.goBack();
    }

    render() {
        return (
            <div>
               <Nav history={this.props.history}/>
               <div>
                    <div className="container-fluid">
                        <div className="row align-items-center justify-content-center mb-5">
                            <div className="col-sm-12 col-md-7 col-lg-7 align-self-center"> 
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
                                                <div className="col-sm-10 col-md-10 col-lg-10">
                                                    <h5 className="card-title">Grupo INSUD</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">Cuit: 4301231232</h6>
                                                    <h6>grupoinsud@gmail.com</h6>
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
                                                            <span className="font-weight-light"> Chile 1310 </span> 
                                                        </li>
                                                        <li className="mt-3">
                                                            Localidad: 
                                                            <span className="font-weight-light"> San Fernando </span>
                                                        </li>
                                                        <li className="mt-3">
                                                            Partido:
                                                            <span className="font-weight-light"> Tigre </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <ul>
                                                        <li>
                                                            Provincia:
                                                            <span className="font-weight-light"> Buenos Aires </span>
                                                        </li>
                                                        <li className="mt-3">
                                                            Codigo Postal: 
                                                            <span className="font-weight-light"> 1661 </span> 
                                                        </li>
                                                        <li className="mt-3">
                                                            Telefono de contacto: 
                                                            <span className="font-weight-light"> 1123456787 </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card text-white bg-dark mt-5">
                                    <div className="card-body">
                                        Lo cambios en el perfil de usuario deber&aacute;n ser solicitados al administrador del Sistema.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Profile;