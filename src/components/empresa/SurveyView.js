import React, { Component } from 'react';


class SurveyView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.encuesta.title,
            questions: this.props.encuesta.questions,
        };
    }
    
    renderView = () => {
        this.props.history.push({
            pathname: '/encuesta',
            state: {
                title: this.state.title, 
                questions: this.state.questions,
            }
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    render() {
        const {encuesta} = this.props;
        const cantPreguntas = this.props.encuesta.questions.length;
        //const dbDate = new Date(encuesta.vencimiento);
        //let vencimiento = new Intl.DateTimeFormat('en-GB').format(dbDate);
        return (
            <div>
                <div className="card border-info mt-3">
                    <div className="card-body">
                        <h5 className="card-title">{encuesta.poll_title} <small className="float-right text-mused">Vencimiento: </small></h5>
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