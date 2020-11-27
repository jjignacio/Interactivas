import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import Footer from '../Footer'
import DynamicForm from './DynamicForm'

// Importo llamada a endpoint
import {SubmitSurvey as SubmitSurveyAPI} from "../controller/CompanyUserController";

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encuesta: this.props.location.state.encuesta,
            title: this.props.location.state.title,
            questions: this.props.location.state.questions,
            cant_preguntas: this.props.location.state.questions.length,
            encuestaCompleta: true,
            active_view: 'survey',
            data: [{}],
            current: [{}]
        };
    }

    // Verifica si la encuenta esta completa antes de enviarla
    onSubmit = model => {
        let encuesta_completa = true
        
        // Cantidad total de preguntas
        //var cant_preguntas = this.state.cant_preguntas

        // Cantidad total de respuestas
        //var cant_respuestas = Object.values(model).length

        var values = Object.values(model);
        //console.log(values)
        values.forEach(answer => {
            if(answer === "" || answer.length === 0) { // Verifico que las respuestas no sean vacias o arreglos varcios.
                encuesta_completa = false
            }
        })

        //console.log(encuesta_completa)

        if(encuesta_completa) {
            let data = [];

            /*
            if (model.id) {
                data = this.state.data.filter(d => {
                    return d.id !== model.id;
                });
            } else {
                model.id = + new Date();
                data = this.state.data.slice();
            }*/
            
            var current2 = []
            current2 = current2.concat(model)
            console.log(current2)

            this.setState({
                data: [model, ...data],
                current: current2, // todo
                active_view: 'confirmation',
            });
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            var lanzamiento = this.state.encuesta
            const keys = Object.keys(model)
            values = Object.values(model);
            console.log(values)
            keys.forEach(key => {
                for(var i = 0; i < lanzamiento.encuesta.questions.length; i++) {
                    var question = lanzamiento.encuesta.questions[i];
                    if(question.question === key) {
                        lanzamiento.encuesta.questions[i].answer = values[i]
                    }
                }
            })
            
            this.setState({
                encuesta: lanzamiento,
            });
        } else {
            this.setState({
                encuestaCompleta: false
            });
        }

    };

    // Enviar encuesta completa
    sendQuestions = async () => {

        var lanzamiento = this.state.encuesta

        this.setState({active_view: 'loading'});

        let submitSurveyToAPI = await SubmitSurveyAPI(lanzamiento);

        if(submitSurveyToAPI.rdo === 0) {
            this.setState({
                active_view: 'success',
            });
        } else {
            this.setState({active_view: 'error'});
        }

        console.log(lanzamiento)
    }

    // Arma el json con la encuesta parcialmente completa
    onSaveAndLeave = model => {
        let data = [];
        
        /*
        if (model.id) {
            data = this.state.data.filter(d => {
                return d.id !== model.id;
            });
        } else {
            model.id = + new Date();
            data = this.state.data.slice();
        }*/
        
        var current2 = []
        current2 = current2.concat(model)
        console.log(current2)

        this.setState({
            data: [model, ...data],
            current: current2, // todo
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        var lanzamiento = this.state.encuesta
        const keys = Object.keys(model)
        var values = Object.values(model);
        console.log(values)
        keys.forEach(key => {
            for(var i = 0; i < lanzamiento.encuesta.questions.length; i++) {
                var question = lanzamiento.encuesta.questions[i];
                if(question.question === key) {
                    lanzamiento.encuesta.questions[i].answer = values[i]
                }
            }
        })
        
        this.setState({
            encuesta: lanzamiento,
        });

        this.saveAndLeave()

    };

    // Ejecuta el endpoint para guardar la encuesta parcialmente completa
    saveAndLeave = async () => {

        var lanzamiento = this.state.encuesta

        this.setState({active_view: 'loading'});

        let submitSurveyToAPI = await SubmitSurveyAPI(lanzamiento);

        if(submitSurveyToAPI.rdo === 0) {
            this.props.history.push('/empresa');
        } else {
            this.setState({active_view: 'error2'}); // Muestro el error por default
        }

        console.log(lanzamiento)
    }

    volver = () => {
        this.props.history.push('/empresa');
    }

    cancelar = () => {
        this.setState({
            active_view: 'survey'
        });
    }

    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            active_view: name
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

    render() {
        //console.log(this.state.encuesta)
        let arrayList = []
        let optionsSelect = []
        let optionsRadio = []
        let optionsCheckbox = []
        this.state.questions.forEach(question => {

            // Si es un select mapeo todas las opciones.
            if(question.answer_type==="select") {
                question.options.map(option => optionsSelect.push({ key: option, label: option, value: option }))
            }

            // Si es un radio mapeo todas las opciones.
            if(question.answer_type==="radio") {
                question.options.map(option => optionsRadio.push({ key: option, label: option, name: question.question, value: option },))
            }

            // Si es un checkbox mapeo todas las opciones.
            if(question.answer_type==="checkbox") {
                question.options.map(option => optionsCheckbox.push({ key: option, label: option, value: option },))
            }

            question.answer_type==="text" ? 
                (arrayList.push({ key: question.question, label: question.question, props: { required: true }, answer: question.answer}))

            : question.answer_type==="number" ? 
                (arrayList.push({ key: question.question, label: question.question, type: "number", answer: question.answer }))

            : question.answer_type==="select" ? 
                (   
                    arrayList.push({ key: question.question, label: question.question, type: "select", value: "Seleccione", options: optionsSelect, answer: question.answer })
                )
            : question.answer_type==="radio" ? 
                (   
                    arrayList.push({ key: question.question, label: question.question, type: "radio", options: optionsRadio, answer: question.answer })
                )

            : question.answer_type==="checkbox" ? 
            (   
                arrayList.push({ key: question.question, label: question.question, type: "checkbox", options: optionsCheckbox, answer: question.answer})
            )

            : question.answer_type==="textArea" ? 
            (   
                arrayList.push({ key: question.question, label: question.question, type: "textArea", answer: question.answer })
            )

            : arrayList.push({ key: question.question, label: question.question, props: { required: true }, answer: question.answer })
            
            optionsSelect = []
            optionsRadio = []
            optionsCheckbox = []

        })

        const active_view = this.state.active_view
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="min-height"></div>
                            <div className="col col-sm-12 col-md-9 col-lg-8">
                                <div className="card mt-5">
                                    <div className="card-body mt-5 mb-5">
                                        <div className="container text-center">
                                            <div className="spinner-grow spinner-observatorio" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <br/>
                                            <p className="text-muted mt-3">Enviando encuesta...</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )

        case "survey":
            return (
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="min-height"></div>
                            <div className="col col-sm-12 col-md-9 col-lg-8">
                                <div className="card mt-5">
                                    <div className="card-header">
                                        <div className="mt-2">
                                            <h5 className="card-title">{this.state.title}</h5>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <DynamicForm
                                            history={this.props.history}
                                            key={this.state.current.id}
                                            className="form"
                                            title="Registration"
                                            defaultValues={this.state.current}
                                            cant_preguntas={this.state.cant_preguntas}
                                            model={arrayList}
                                            onSubmit={model => {
                                                this.onSubmit(model);
                                            }}
                                            onSaveAndLeave={model => {
                                                this.onSaveAndLeave(model);
                                            }}
                                        />
                                        { !this.state.encuestaCompleta ? 
                                ( 
                                    <div className="card text-white bg-dark mt-3">
                                        <div className="card-body text-center">
                                            Debes completar todas las preguntas antes de enviar esta encuesta.
                                        </div>
                                    </div> 
                                ) : null 
                            }
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "confirmation":
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="min-height"></div>
                            <div className="col col-sm-12 col-md-9 col-lg-8">
                                <div className="card mt-5 border-info">
                                    <div className="card-body">
                                        <div className="mt-4"></div>
                                        <h4>¿Enviar encuesta?</h4>
                                        <small className="text-muted">Una vez enviada no podrá editarla.</small>
                                        <div className="mt-4"></div>
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-fundacion" 
                                            onClick={this.sendQuestions}>Enviar
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-link" 
                                            onClick={this.cancelar}>Cancelar
                                        </button>
                                        <div className="mb-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "success":
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="min-height"></div>
                            <div className="col col-sm-12 col-md-9 col-lg-8">
                                <div className="card mt-5">
                                    <div className="card-body text-center">
                                        <div className="mt-4"></div>
                                        <i className="material-icons ico-no-companies color-observatorio">check_circle</i>
                                        <br/>
                                        <h2>Encuesta enviada.</h2>
                                        <small className="text-muted">
                                            <button 
                                                type="button" 
                                                className="btn btn-link text-reset btn-aca  " 
                                                onClick={this.volver}>Volver al inicio.
                                            </button>
                                        </small>
                                        <div className="mb-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "error":
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="min-height"></div>
                            <div className="col col-sm-12 col-md-9 col-lg-8">
                                <div className="card mt-5">
                                    <div className="card-body text-center">
                                        <div className="mt-4"></div>
                                        <i className="material-icons ico-no-companies">error</i>
                                        <br/>
                                        <h2>Algo salió mal.</h2>
                                        <p>No se pudo enviar la encuesta.</p>
                                        <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                        <br/>
                                        <small className="text-muted">
                                            <button 
                                                type="button" 
                                                className="btn btn-link text-reset btn-aca  " 
                                                onClick={this.volver}>Salir.
                                            </button>
                                        </small>
                                        <div className="mb-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        default:
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="min-height"></div>
                            <div className="col col-sm-12 col-md-9 col-lg-8">
                                <div className="card mt-5">
                                    <div className="card-body text-center">
                                        <div className="mt-4"></div>
                                        <i className="material-icons ico-no-companies">error</i>
                                        <br/>
                                        <h2>Algo salió mal.</h2>
                                        <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                        <br/>
                                        <small className="text-muted">
                                            <button 
                                                type="button" 
                                                className="btn btn-link text-reset btn-aca  " 
                                                onClick={this.volver}>Salir.
                                            </button>
                                        </small>
                                        <div className="mb-5"></div>
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

export default Survey;