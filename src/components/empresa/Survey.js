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

    renderTextQuestion() {
        // Funcion para crear componentes de preguntas tipo texto.
        return this.state.questions
        .filter(pregunta => pregunta.answer_type.localeCompare("text") === 0)
        .map(pregunta => <TextQuestion pregunta = {pregunta.question} key={pregunta.id}/>)

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
        .map(pregunta => <BooleanQuestion pregunta = {pregunta.question} key={pregunta.id}/>)

    }

    renderSelectQuestion() {
        // Funcion para crear componentes de preguntas tipo multiple choice.
        return this.state.questions
        .filter(pregunta => pregunta.answer_type.localeCompare("multiple_choice") === 0 )
        .map(pregunta => <SelectQuestion pregunta = {pregunta} key={pregunta.id}/>)
    }
        
    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                <div className="container p-3">
                    <div className="row justify-content-center align-items-center">
                        <div className="col col-sm-12 col-md-8 col-lg-10">
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
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-primary float-right">
                                        Enviar
                                    </button>
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