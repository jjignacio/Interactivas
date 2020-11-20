import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import Footer from '../Footer'

import DynamicForm from './DynamicForm'

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.location.state.title,
            questions: this.props.location.state.questions,
            data: [{}],
            current: {}
        };
    }

    onSubmit = model => {
        let data = [];
        if (model.id) {
            data = this.state.data.filter(d => {
                return d.id !== model.id;
            });
        } else {
            model.id = +new Date();
            data = this.state.data.slice();
        }

        this.setState({
            data: [model, ...data],
            current: {} // todo
        });
    };


    render() {
        //console.log(this.state.questions)
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
                (arrayList.push({ key: question.question, label: question.question, props: { required: true } }))

            : question.answer_type==="number" ? 
                (arrayList.push({ key: question.question, label: question.question, type: "number" }))

            : question.answer_type==="select" ? 
                (   
                    arrayList.push({ key: question.question, label: question.question, type: "select", value: "Seleccione", options: optionsSelect})
                )
            : question.answer_type==="radio" ? 
                (   
                    arrayList.push({ key: question.question, label: question.question, type: "radio", options: optionsRadio })
                )

            : question.answer_type==="checkbox" ? 
            (   
                arrayList.push({ key: question.question, label: question.question, type: "checkbox", options: optionsCheckbox })
            )

            : question.answer_type==="textArea" ? 
            (   
                arrayList.push({ key: question.question, label: question.question, type: "textArea" })
            )

            : arrayList.push({ key: question.question, label: question.question, props: { required: true } })
            
            optionsSelect = []
            optionsRadio = []
            optionsCheckbox = []

        })

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

                                        model={arrayList}
                                        onSubmit={model => {
                                            this.onSubmit(model);
                                        }}
                                    />
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Survey;