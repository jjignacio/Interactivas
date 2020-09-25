import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import SurveyView from './SurveyView'

// Datos
import encuestas from '../../data/encuestasModelo.json'

class Company extends Component {
    // Lista las encuestas disponibles.
    constructor(props) {
        super(props);
        this.state = {
            encuestas: encuestas,
        };
    }

    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                <div className="container p-3">
                    <div className="row justify-content-center align-items-center">
                        <div className="col col-sm-12 col-md-9 col-lg-8">
                            { this.state.encuestas.map(encuesta => <SurveyView encuesta = {encuesta} key={encuesta.id} history={this.props.history}/>) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Company;