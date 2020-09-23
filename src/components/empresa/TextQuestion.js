import React, { Component } from 'react';

class TextQuestion extends Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor="textSurvey">{this.props.pregunta}</label>
                <input type="text" className="form-control" id="textSurvey"/>
            </div>
        )
    }
}

export default TextQuestion;