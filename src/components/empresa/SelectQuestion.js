import React, { Component } from 'react';

class SelectQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: this.props.pregunta.options,
        };
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor="SelectSurvey">{this.props.pregunta.question}</label>
                <select className="form-control" id="SelectSurvey">
                    <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                    { this.state.option.map(opcion => <option key={opcion}>{opcion}</option>) }
                </select>
            </div>
        )
    }
}

export default SelectQuestion;