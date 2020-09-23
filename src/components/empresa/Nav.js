import React, { Component } from 'react';


class Nav extends Component {
    signOff = () => {
        this.props.history.push('/login');
    }
    profile = () => {
        this.props.history.push('/perfil');
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                    <a className="navbar-brand" href="/empresa">Encuestas Fundacion Pyme</a>
                    <div>
                        <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <button
                                type="button"
                                className="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false">
                                <span>Nombre_Empresa</span>
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