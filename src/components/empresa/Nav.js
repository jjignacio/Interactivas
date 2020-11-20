import React, { Component } from 'react';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem('nombre'),
            user_rol: localStorage.getItem('rol'),
        };
    }
    signOff = () => {
        this.props.history.push('/login');
    }
    profile = () => {
        this.props.history.push('/perfil');
    }
    render() {
        const user_name = this.state.user_name
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark color-fundacion-menu">
                    <div className="container-fluid">
                    <a className="navbar-brand" href="/empresa">Encuestas Fundacion Pyme</a>
                    <div>
                        <ul className="navbar-nav">
                        <i className="material-icons m-2 white">person_pin</i>
                        <li className="nav-item dropdown mr-3">
                            <button
                                type="button"
                                className="btn btn-primary dropdown-toggle color-fundacion-boton"
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false">
                                <span className="mr-3">{user_name}</span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="user_header">
                                <button 
                                    type="button" 
                                    className="dropdown-item btn btn-link"
                                    onClick={this.profile}>
                                    Perfil
                                </button>
                                <button 
                                    type="button" 
                                    className="dropdown-item btn btn-link"
                                    onClick={this.signOff}>
                                    Cerrar sesi&oacute;n
                                </button>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;