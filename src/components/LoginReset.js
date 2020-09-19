import React, { Component } from 'react';

import logo_fund from '../img/logo_fund2.jpg';

import Login from './Login'

class LoginReset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }

    toggleshow = () => {
        this.setState({show: !this.state.show})
    }

    render() {
        if(this.state.show) {
            return(
                <div className="card-body" style={{width: "27rem"}}>
                    <img src={logo_fund} className="img-fluid rounded mx-auto d-block" alt="Fundaci&oacute;n Observatorio Pyme" />
                    <h4 className="text-center p-2">Restablecer contrase&ntilde;a</h4>
                    <small><p className="font-weight-normal card-subtitle mb-2 text-center p-2">Ingres&aacute; tu email y te enviaremos las instrucciones sobre cómo restablecer tu contraseña. (Desarrollo)</p></small>

                    <form onSubmit={this.handleSubmit}>
                        <div className="row justify-content-center p-3">
                            <div className="col-md-10 mb-10">
                                <div className="form-group">
                                    <input 
                                        id="user_name" 
                                        type="text" 
                                        name="user_name" 
                                        className="form-control" 
                                        autoComplete="off" 
                                        autoFocus={true} 
                                        placeholder="Correo electr&oacute;nico" 
                                        required />
                                </div>
                            </div>
                        </div>
                            
                        <div className="row p-3 justify-content-center">
                            <div className="col-md-10 mb-10">
                                <button type="submit" id="submit-btn" className="btn btn-primary btn-block">Enviar un email</button>
                            </div>
                        </div>
                    </form>
                    <div className="text-right">
                        <small>
                            <button
                                type="submit"
                                value="Submit"
                                className="btn btn-link"
                                style={{fontSize: "0.8rem"}}
                                onClick={this.toggleshow}
                                >Mejor iniciar sesi&oacute;n
                            </button>
                        </small>
                    </div>
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