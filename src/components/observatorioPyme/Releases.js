import React, { Component } from "react";

// Componentes
import Menu from "./Menu";
import ReleaseCompany from "./ReleaseCompany"
import Footer from "../Footer";

// Datos
import empresas from '../../data/companies.json'
import encuestas from '../../data/encuestasModelo.json'

class Releases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresas: empresas,
            encuestas: encuestas,
            text_search: '',
        };
    }

    filter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
    }

    render() {
        return (
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
                                            <h4>Lanzamientos</h4>
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
                                <div className="row align-items-center justify-content-center mb-5">
                                    <div className="col-sm-12 col-md-9 col-lg-8 align-self-center">
                                
                                        {/*Mapeo todas las empresas.*/}
                                        { this.state.empresas
                                        .filter(empresa => empresa.razon_social.toLowerCase().includes(this.state.text_search.toLowerCase()))
                                        .map(empresa => <ReleaseCompany empresa = {empresa} encuestas = {encuestas} key={empresa.id} history={this.props.history}/>) }

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

export default Releases;