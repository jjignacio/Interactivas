import React, { Component } from 'react';

class BooleanQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.pregunta.id,
            pregunta: this.props.pregunta.question,
            respuesta: 'Si',
        };
        this.myChangeHandler = this.myChangeHandler.bind(this);
    }
    
    myChangeHandler = (event) => {
        this.setState({
            respuesta: event.currentTarget.value
        });
    }
    render() {
        console.log(this.state.id);
        console.log(this.state.pregunta);
        console.log(this.state.respuesta);
        return (
            <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1">{this.props.pregunta.question}</label>
                <div className="form-check form-check-inline float-lg-right float-sm-none">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="respuesta"
                        checked={this.state.respuesta === "No"}
                        onChange={this.myChangeHandler}
                        value="No"/>
                    <label className="form-check-label">No</label>
                </div>
                <div className="form-check form-check-inline float-lg-right float-sm-none">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="inlineRadioOptions" 
                        checked={this.state.respuesta === "Si"}
                        onChange={this.myChangeHandler}
                        value="Si"/>
                    <label className="form-check-label" htmlFor="BooleanSurvey">Si</label>
                </div>
            </div>
        )
    }
}

export default BooleanQuestion;