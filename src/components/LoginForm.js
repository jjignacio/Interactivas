import React, { Component } from 'react';

import users from '../data/users.json';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_pass: '',
            users: users,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let user_name = this.state.user_name;
        let user_pass = this.state.user_pass;

        console.log(user_pass);

        let userName = this.state.users.map(e => e.userName);
        let userRol = this.state.users.map(e => e.userRol);
        let i = 0;
        let usuarioValido = false;
        while(i < userName.length) {
            if(userName[i].localeCompare(user_name) === 0) {
                usuarioValido = true;
                userRol = userRol[i];
                break;
            }
            i++;
        }
        if(usuarioValido === true) {
            if(userRol === "Observatorio_Admin") {
                alert('El usuario: ' + user_name + " con rol "+ userRol +" es valido. ");
                this.props.history.push('/observatorioPyme');
            } else {
                alert('El usuario: ' + user_name + " con rol "+ userRol +" es valido. ");
                this.props.history.push('/empresa');
            }
            
        } else {
            alert('El usuario: ' + user_name + " NO es valido.");
        }

        event.preventDefault();
    }

    async redireccionar(userRol) {
        this.props.history.push({
            pathname: this.props.history.push('/home')      
        });
    }

    myChangeHandler = (event) => {
        console.log(event.target.value);
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        return (
            <div>
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
        )
    }
}

export default LoginForm;