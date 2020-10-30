import React, { Component } from "react";

// Componentes
import CompanyObj from './CompanyObj'
import Menu from "./Menu";
import NewCompany from "./NewCompany";
import Footer from '../Footer'

// Datos
import empresas from '../../data/companies.json'

class Companies extends Component {
    // Lista las encuestas disponibles.
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            empresas: empresas,
            text_search: '',
        };
        this.toggleshow = this.toggleshow.bind(this);
    }

    filter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
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
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center mt-4">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Empresas</h4>
                                                <form className="form-inline">
                                                    <div>
                                                        <input 
                                                            className="form-control mr-sm-2" 
                                                            type="search" 
                                                            placeholder="Buscar empresa" 
                                                            aria-label="Search"
                                                            value={this.state.text_search} 
                                                            onChange={(text_search) => this.filter(text_search)} />
                                                        <button 
                                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-8 mt-4 mb-4">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-fundacion float-right"
                                                onClick={this.toggleshow}>
                                                Cargar empresa
                                            </button>
                                        </div>
                                    </div>
                                </div>  
                                <div className="container-fluid">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-8 mb-5">

                                            { this.state.empresas
                                            .filter(empresa => empresa.razon_social.toLowerCase().includes(this.state.text_search.toLowerCase()))
                                            .map(empresa => <CompanyObj empresa = {empresa} key={empresa.id} history={this.props.history}/>) }       

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <NewCompany onClick={this.toggleshow}/>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

export default Companies;