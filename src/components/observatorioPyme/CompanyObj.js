import React, { Component } from "react";

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: this.props.empresa
        };
    }

    companyDetail = () => {
        this.props.history.push({
            pathname: '/empresaDetalle',
            state: {
                empresa: this.state.empresa,
            }
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

    render() {
        const empresa = this.state.empresa
        return( 
            <div>                
                <div className="list-group">
                    <button 
                        onClick={this.companyDetail} 
                        className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{empresa.razon_social}</h5>
                            <small>CUIT: {empresa.cuit}</small>
                            </div>
                            <p className="mb-1">{empresa.domicilio} (CP: {empresa.codigo_postal}) / Tel: {empresa.telefono} / Mail: {empresa.email}</p>
                            <small>{empresa.localidad} / {empresa.provincia}</small>
                    </button>
                </div>
            </div>
        )
    }
}

export default Companies;