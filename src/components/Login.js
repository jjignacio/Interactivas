import React, { Component } from 'react';

import logo_fund from '../img/logo_fund2.jpg';
import users from '../data/sample.json';
import LoginReset from './LoginReset'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            user_name: '',
            user_pass: '',
            users: users,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let user_name = this.state.user_name;
        let user_pass = this.state.user_pass;

        if(this.state.users.map(e => e.userName) == user_name) {
        alert('El usuario: ' + user_name + " es valido.");
        } else {
        alert('El usuario: ' + user_name + " NO es valido.");
        }
        alert('Pass: ' + user_pass);
        event.preventDefault();
    }

    myChangeHandler = (event) => {
        console.log(event.target.value);
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    toggleshow = () => {
        this.setState({show: !this.state.show})
    }

    render() {
        if(this.state.show) {
            return (
                <div className="container d-flex justify-content-center align-items-center" style={{paddingTop: "50px"}}>
                    <div className="card shadow-lg">
                        <div className="card-body" style={{width: "27rem"}}>
                            <img src={logo_fund} className="img-fluid rounded mx-auto d-block" alt="Fundaci&oacute;n Observatorio Pyme" />
                            <h4 className="text-center p-2">Iniciar sesi&oacute;n</h4>
                            <small><p className="font-weight-normal card-subtitle mb-2 text-center p-2">Iniciar sesi&oacute;n en Nombre_Proyecto para continuar hacia la encuesta (Desarrollo)</p></small>

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
                                                required 
                                                onChange={this.myChangeHandler} 
                                                value={this.state.user_name}/>
                                        </div>
                                    </div>
                                    <div className="col-md-10 mb-10">
                                        <div className="form-group">
                                            <input 
                                                id="user_pass" 
                                                type="password" 
                                                name="user_pass" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Contrase&ntilde;a" 
                                                required 
                                                onChange={this.myChangeHandler} 
                                                value={this.state.user_pass }/>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="row p-3 justify-content-center">
                                    <div className="col-md-10 mb-10">
                                        <button 
                                            type="submit" 
                                            value="Submit" 
                                            id="submit-btn" 
                                            className="btn btn-primary btn-block"> Iniciar sesi&oacute;n
                                        </button>
                                    </div>
                                </div>    
                            </form>
                        </div>
                        <div className="card-footer text-muted text-center">
                            <div className="row justify-content-center">
                                <small>
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-link"
                                        style={{fontSize: "0.85rem"}}
                                        onClick={this.toggleshow}
                                        >¿Necesitas ayuda?
                                    </button>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <LoginReset/>
            )
        } 
    }
}

export default Login;