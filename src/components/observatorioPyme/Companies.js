import React, { Component } from "react";

// Componentes
import CompanyObj from './CompanyObj'
import Menu from "./Menu";
import NewCompany from "./NewCompany";

// Datos
import empresas from '../../data/companies.json'

class Companies extends Component {
    // Lista las encuestas disponibles.
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            empresas: empresas,
        };
        this.toggleshow = this.toggleshow.bind(this);
    }

    toggleshow(event) {
        this.setState({show: !this.state.show});
    }

    render() {
        if(this.state.show) {
            return( 
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary vh-100">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container p-3">
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-8">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary float-right"
                                                onClick={this.toggleshow}>
                                                Nuevo
                                            </button>
                                        </div>
                                    </div>
                                </div>  
                                <div className="container p-3">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-8">

                                            { this.state.empresas.map(empresa => <CompanyObj empresa = {empresa} key={empresa.id} history={this.props.history}/>) }       

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary vh-100">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10">
                                            <NewCompany clickHandler={this.toggleshow}/>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Companies;