import React, { Component } from "react";

class ObservatoryUserObj extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: this.props.usuario
        };
    }
    userDetail = () => {
        this.props.history.push({
            pathname: '/usuarioDetalle',
            state: {
                usuario: this.state.usuario,
            }
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }
    render() {
        const usuario = this.state.usuario
        return( 
            <div>                
                 <div className="card mt-4 border-info" >
                    <div className="card-header" >
                        <button 
                            onClick={this.userDetail} 
                            className="btn btn-block text-left no-box">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="mb-1">
                                        <span className="font-weight-bold">{usuario.nombre} </span> &nbsp; - &nbsp; {usuario.email} &nbsp; - &nbsp; Rol: {usuario.rol}</div>
                                </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ObservatoryUserObj;