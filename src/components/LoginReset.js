import React, { Component } from 'react';

import Login from './Login'

// Importo llamada a endpoint
import {RecoverPassword as RecoverPasswordAPI} from "./controller/LoginController";

class LoginReset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            user_name: '',
            className: 'form-control',
            text: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleshow = () => {
        this.setState({show: !this.state.show})
    }

    // Validacion de usuario segun el rol del mismo.
    handleSubmit = async (event) =>{
        event.preventDefault();
        
        // Ejecuto el endopoint para validar login
        let getRecoverPassword = await RecoverPasswordAPI(this.state.user_name);

        if(getRecoverPassword.rdo === 0 ) {
            this.setState({
                className: "form-control is-valid",
                text: true
            });
        } else {
            this.setState({className: "form-control is-invalid"});
        }
    }
    
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        if(this.state.show) {
            return(
                <div>
                    <h4 className="text-center p-3">Restablecer contrase&ntilde;a</h4>
                    <small><p className="font-weight-normal card-subtitle mb-2 text-center p-2 text-muted">Ingres&aacute; tu email y te enviaremos las instrucciones sobre cómo restablecer tu contraseña.</p></small>

                    <form onSubmit={this.handleSubmit}>
                        <div className="row justify-content-center p-3">
                            <div className="col-md-10 mb-10">
                                <div className="form-group">
                                    <input 
                                        id="user_name" 
                                        type="text" 
                                        name="user_name" 
                                        className={this.state.className} 
                                        autoComplete="off" 
                                        autoFocus={true} 
                                        onChange={this.myChangeHandler}
                                        value={this.state.user_name}
                                        placeholder="Correo electr&oacute;nico" 
                                        required />
                                </div>
                            </div>
                            { this.state.text ? ( <small className="text-success">Revisa tu casilla de mails</small> ) : null }
                        </div>
                            
                        <div className="row p-3 justify-content-center">
                            <div className="col-md-10 mb-10">
                                <button 
                                    type="submit" 
                                    id="submit-btn" 
                                    className="btn btn-primary btn-block color-fundacion-boton">
                                    Enviar un email
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        } else {
            return(
                <Login/>
            )
        }
    }
}

export default LoginReset;