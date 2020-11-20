import React, { Component } from 'react';


class SurveyView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encuesta: this.props.encuesta,
            title: this.props.encuesta.encuesta.title,
            questions: this.props.encuesta.encuesta.questions,
            vencimiento: this.props.encuesta.encuesta.fecha_vencimiento,
        };
    }
    
    renderView = () => {
        this.props.history.push({
            pathname: '/encuesta',
            state: {
                title: this.state.title, 
                questions: this.state.questions,
                encuesta:this.state.encuesta, 
            }
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    render() {
        const {encuesta} = this.props.encuesta;
        const cantPreguntas = this.props.encuesta.encuesta.questions.length;
        let vencimiento = ""

        if(this.state.vencimiento !== "") {
            const dbDate_vencimiento = new Date();
            vencimiento = new Intl.DateTimeFormat('en-GB').format(dbDate_vencimiento);
        } else {
            const dbDate = new Date(this.state.vencimiento);
            vencimiento = new Intl.DateTimeFormat('en-GB').format(dbDate);
        }
        return (
            <div>
                <div className="card border-info mt-3">
                    <div className="card-body">
                        <h5 className="card-title">{encuesta.title} <small className="float-right text-mused">Vencimiento: {vencimiento}</small></h5>
                        <h6 className="card-subtitle mb-2 text-muted">{cantPreguntas} Pregunta/s</h6>
                        <p className="card-text">{encuesta.description}</p>
                        <button 
                            type="button" 
                            className="btn btn-outline-fundacion"
                            onClick={this.renderView}>
                                Empezar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SurveyView;