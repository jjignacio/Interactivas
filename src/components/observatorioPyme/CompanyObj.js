import React, { Component } from "react";

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            razon_social: this.props.empresa.razon_social,
            cuit: this.props.empresa.cuit,
            domicilio: this.props.empresa.domicilio,
            codigo_postal: this.props.empresa.codigo_postal,
            localidad: this.props.empresa.localidad,
            partido: this.props.empresa.partido,
            provincia: this.props.empresa.provincia,
            telefono: this.props.empresa.telefono,
            email: this.props.empresa.email,
        };
    }

    render() {
        return( 
            <div>
                            
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{this.state.razon_social}</h5>
                        <small>CUIT: {this.state.cuit}</small>
                        </div>
                        <p className="mb-1">{this.state.domicilio} (CP: {this.state.codigo_postal}) / Tel: {this.state.telefono} / Mail: {this.state.email}</p>
                        <small>{this.state.localidad} / {this.state.provincia}</small>
                    </a>
                </div>        

            </div>
        )
    }
}

export default Companies;