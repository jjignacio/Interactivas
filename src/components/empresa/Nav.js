import React, { Component } from 'react';


class Nav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                    <a className="navbar-brand" href="#">Encuestas Fundacion Pyme</a>
                    <div>
                        <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>Nombre_Empresa</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="user_header">
                                <a className="dropdown-item">Perfil</a>
                                <a className="dropdown-item">Cerrar sesi&oacute;n</a>
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