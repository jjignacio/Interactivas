import React, { Component } from 'react';

class BooleanQuestion extends Component {
    render() {
        return (
            <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1">{this.props.pregunta}</label>
                <div className="form-check form-check-inline float-lg-right float-sm-none">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="BooleanSurvey2" value="option2"/>
                    <label className="form-check-label" htmlFor="BooleanSurvey">No</label>
                </div>
                <div className="form-check form-check-inline float-lg-right float-sm-none">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="BooleanSurvey" value="option1"/>
                    <label className="form-check-label" htmlFor="BooleanSurvey">Si</label>
                </div>
            </div>
        )
    }
}

export default BooleanQuestion;