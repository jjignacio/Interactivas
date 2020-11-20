import React, { Component } from "react";

// Componentes
import CompanySurvey from './CompanySurvey'

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lanzamiento: this.props.lanzamiento,
            empresas: this.props.lanzamiento.empresas,
        };
    }
    render() {
        const lanzamiento = this.state.lanzamiento;
        const target = '#collapse'+lanzamiento._id.toString();
        const targetDestination = 'collapse'+lanzamiento._id.toString();

        let fecha_lanzamiento = ""
        let fecha_vencimiento = ""

        if(lanzamiento.fecha_lanzamiento !== "") {
            const dbDate_lanzamiento = new Date(lanzamiento.fecha_lanzamiento);
            fecha_lanzamiento = new Intl.DateTimeFormat('en-GB').format(dbDate_lanzamiento);
        }
        if(lanzamiento.fecha_vencimiento !== "") {
            const dbDate_vencimiento = new Date(lanzamiento.fecha_vencimiento);
            fecha_vencimiento = new Intl.DateTimeFormat('en-GB').format(dbDate_vencimiento);
        }

        return (
            <div>
                <div className="accordion" id="accordionExample">
                    <div className="card mt-1 border-top-0">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button 
                                    className="btn btn-block collapsed text-left" 
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target={target} 
                                    aria-expanded="true" 
                                    aria-controls="collapseOne">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-4 col-lg-4 font-weight-bold text-muted text-center">
                                                    {lanzamiento.nombre}
                                                </div>

                                                <div className="col-sm-12 col-md-3 col-lg-4 text-center font-weight-bold text-muted">
                                                    {fecha_lanzamiento}
                                                </div>
                                                <div className="col-sm-12 col-md-3 col-lg-4 text-center font-weight-bold text-muted">
                                                    {fecha_vencimiento}
                                                </div>
                                            </div>
                                        </div>
                                </button>
                            </h2>
                        </div>

                        <div 
                            id={targetDestination}
                            className="collapse" 
                            aria-labelledby="headingOne" 
                            data-parent="#accordionExample">
                            <div className="card-body">

                            { this.state.empresas.length > 0 ? ( 
                                this.state.empresas
                                .map(empresa => <CompanySurvey lanzamiento_id = {this.state.lanzamiento._id} empresa = {empresa} key={empresa.empresa_user_id} history={this.props.history}/>)) : null 
                            }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Survey;