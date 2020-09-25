import React, { Component } from 'react';

class TextQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.pregunta.id,
            pregunta: this.props.pregunta.question,
            respuesta: '',
        };
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor="textSurvey">{this.props.pregunta.question}</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="textSurvey"
                    name="respuesta"
                    onChange={this.myChangeHandler} 
                    value={this.state.respuesta}/>
            </div>
        )
    }
}

export default TextQuestion;