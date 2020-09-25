import React, { Component } from 'react';

class BajaOPYM extends Component {

    render() {
        return (
            <div>
                <div className="container p-3">
                    <div className="row justify-content-center align-items-center">
                        <div className="col col-sm-12 col-md-8 col-lg-10">
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="mt-2">
                                        <h5 className="card-title"></h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form >
                                        <div className="form-group">
                                                <label htmlFor="textSurvey">Para proceder a la baja de la empresa por favor ingrese el Cuit (sin guiones)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="textSurvey"
                                                    name="respuesta"
                                                    />

                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <div className="container">
                                        <div className="row">
                                            <button
                                                type="submit"
                                                value="Submit"
                                                className="btn btn-success float-right">
                                                <span className="ml-2 mr-2"> Dar de Baja</span>

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BajaOPYM;
