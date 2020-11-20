import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css"; 

// Importo llamada a endpoint
import {DeleteCompanyFromReleace as DeleteCompanyFromReleaceAPI} from "../../controller/ReleasesController";

function buildStatus(status) {
    return <Progress type="circle" percent={status} width={50} />
}

class CompanySurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: this.props.empresa,
            empresa_id: this.props.empresa.empresa_user_id,
            releace_id: this.props.lanzamiento_id,
            active_view: 'company'

        };
        this.deleteCompany = this.deleteCompany.bind(this);
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    // Borra la empresa del lanzamiento.
    deleteCompany = async (event) => {
        event.preventDefault();

        let company_id = this.state.empresa_id
        let releace_id = this.state.releace_id

        console.log(company_id)
        
        this.setState({active_view: 'loading'});

        let deleteCompanyFromReleaceFromAPI = await DeleteCompanyFromReleaceAPI(releace_id, company_id);

        if(deleteCompanyFromReleaceFromAPI.rdo === 0) {
            this.setState({active_view: 'success'});
        } else {
            this.setState({active_view: 'error'});
        }
    }

    handleActiveView(e) {
        const { name } = e.target;
        console.log(name)
        this.setState(() => ({
            active_view: name
        }));
    }

    handleConfirmationView = name => () => {
        this.setState(() => ({
            active_view: name
        }));
    }

    render() {
        let active_view = this.state.active_view
        console.log(this.state.empresa)
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div className="container text-center">
                                <div className="spinner-grow spinner-observatorio" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <br/>
                                <p className="text-muted">Cargando...</p>
                            </div>    
                        </div>
                    </div>
                </div>
            )

        case "company":
            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 col-lg-4 font-weight-bold text-muted text-center align-self-center">
                                        {this.state.empresa.razon_social}
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-4 text-center font-weight-bold text-muted">
                                        {buildStatus(this.state.empresa.progreso)}
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-lg-4 text-center font-weight-bold text-muted align-self-center">
                                        <button 
                                            className="btn no-padding align-center" 
                                            type="button"
                                            name="confirmation"
                                            onClick={this.handleConfirmationView("confirmation")}>
                                                <i className="material-icons">delete_outline</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "confirmation":
            return(
                <div> 
                    <div className="card border-info">
                        <div className="card-body">
                            <h5>Seguro que quieres cancelar el envío a nombre_empresa?</h5>
                            <button 
                                className="btn btn-outline-danger" 
                                type="button"
                                onClick={this.deleteCompany}>
                                    Cancelar envio
                            </button>
                            <button 
                                className="btn btn-link"
                                name="company" 
                                type="button"
                                onClick={this.handleActiveView}>
                                    volver
                            </button>
                        </div>
                    </div>
                </div>
            )
        case "success":
            return(
                <div>
                    <div className="card border-success">
                        <div className="card-body">
                            <h5>Empresa removida.</h5>
                        </div>
                    </div>
                </div>
            )
        case "error":
            return(
                <div>
                    <div className="card border-danger">
                        <div className="card-body">
                            <h5>Algo salió mal.</h5>
                            <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                        </div>
                    </div>
                </div>
            )
        default:
            return(
                <div>
                    <div className="card border-danger">
                        <div className="card-body">
                            <h5>Algo salió mal.</h5>
                            <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default CompanySurvey;