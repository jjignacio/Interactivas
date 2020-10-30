import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import SurveyView from './SurveyView'
import Footer from '../Footer'

// Datos
import encuestas from '../../data/encuestasModelo.json'

class Company extends Component {
    // Lista las encuestas disponibles.
    constructor(props) {
        super(props);
        this.state = {
            encuestas: encuestas,
            text: '',
        };
    }

    filter(event){
        var text = event.target.value
        this.setState({
            text: text,
        })
    }

    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                <div className="container-fluid p-3 vh-100">
                    <div className="row">
                        <nav className="navbar navbar-light w-100 justify-content-center">
                            <form className="form-inline">
                                <div>
                                    <input 
                                        className="form-control mr-sm-2" 
                                        type="search" 
                                        placeholder="Buscar encuesta" 
                                        aria-label="Search"
                                        value={this.state.text} 
                                        onChange={(text) => this.filter(text)} />
                                    <button 
                                        className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                           <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </nav>
                    </div>
                    <hr/>
                    <div className="row justify-content-center align-items-center">
                        <div className="col col-sm-12 col-md-7 col-lg-7">
                            {/* this.state.encuestas.map(encuesta => <SurveyView encuesta = {encuesta} key={encuesta.id} history={this.props.history}/>) */}

                            { this.state.encuestas
                            .filter(encuesta => encuesta.title.toLowerCase().includes(this.state.text.toLowerCase()))
                            .map(encuesta => <SurveyView encuesta = {encuesta} key={encuesta.id} history={this.props.history}/>) }
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Company;