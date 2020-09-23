import React, { Component } from 'react';

class NumberQuestion extends Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor="numberSurvey">{this.props.pregunta}</label>
                <input type="number" className="form-control" id="numberSurvey"/>
            </div>
        )
    }
}

export default NumberQuestion;