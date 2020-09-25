import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import TextQuestion from './TextQuestion'
import NumberQuestion from './NumberQuestion'
import BooleanQuestion from './BooleanQuestion'
import SelectQuestion from './SelectQuestion'


class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.location.state.title,
            questions: this.props.location.state.questions,
        };
    }

    handleOnSubmit = e => {
        e.preventDefault();
        // pass form data
        // get it from state
        const formData = {};
      };

    renderTextQuestion() {
        // Funcion para crear componentes de preguntas tipo texto.
        return this.state.questions
        .filter(pregunta => pregunta.answer_type.localeCompare("text") === 0)
        .map(pregunta => <TextQuestion pregunta = {pregunta} key={pregunta.id}/>)

    }

    renderNumberQuestion() {
        // Funcion para crear componentes de preguntas tipo numericas.
        return this.state.questions
        .filter(pregunta => pregunta.answer_type.localeCompare("number") === 0)
        .map(pregunta => <NumberQuestion pregunta = {pregunta.question} key={pregunta.id}/>)

    }

    renderBooleanQuestion() {
        // Funcion para crear componentes de preguntas tipo Boolean.
        return this.state.questions
        .filter(pregunta => pregunta.answer_type.localeCompare("boolean") === 0)
        .map(pregunta => <BooleanQuestion pregunta = {pregunta} key={pregunta.id}/>)

    }

    renderSelectQuestion() {
        // Funcion para crear componentes de preguntas tipo multiple choice.
        return this.state.questions
        .filter(pregunta => pregunta.answer_type.localeCompare("multiple_choice") === 0 )
        .map(pregunta => <SelectQuestion pregunta = {pregunta} key={pregunta.id}/>)
    }

    // Botones
    cancel = () => {
        this.props.history.push('/empresa');
    }
        
    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                <div className="container p-3">
                    <div className="row justify-content-center align-items-center">
                        <div className="col col-sm-12 col-md-9 col-lg-8">
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="mt-2">
                                        <h5 className="card-title">{this.state.title}</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        {this.renderTextQuestion()}
                                        {this.renderNumberQuestion()}
                                        {this.renderBooleanQuestion()}
                                        {this.renderSelectQuestion()}
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col col-sm-12 col-md-4 col-lg-4 align-items-left">
                                                <button
                                                    type="submit"
                                                    value="Submit"
                                                    className="btn btn-danger"
                                                    onClick={this.cancel}>
                                                    Cancelar
                                                </button>
                                            </div>
                                            <div className="col col-sm-12 col-md-4 col-lg-6">
                                                <button
                                                    type="submit"
                                                    value="Submit"
                                                    className="btn btn-primary float-right"
                                                    onClick={this.cancel}>
                                                    Guardar y Salir
                                                </button>
                                            </div>
                                            <div className="col col-sm-12 col-md-4 col-lg-2">
                                                <button
                                                    type="submit"
                                                    value="Submit"
                                                    className="btn btn-success float-right">
                                                    <span className="ml-1 mr-1"> Enviar</span>
                                                </button>
                                            </div>
                                        </div>
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

export default Survey;