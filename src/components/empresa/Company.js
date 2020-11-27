import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import SurveyView from './SurveyView'
import Footer from '../Footer'

// Datos
import encuestas from '../../data/encuestasModelo.json'

// Importo llamada a endpoint
import {GetAllSurveys as GetAllSurveysAPI} from "../controller/CompanyUserController";

class Company extends Component {
    // Lista las encuestas disponibles.
    constructor(props) {
        super(props);
        this.state = {
            active_view: "listSurveys",
            encuestas: encuestas,
            empresa_id: localStorage.getItem('_id'),
            text: '',
        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }
    
    componentDidMount() {
        this.getSurveys();
    }

    getSurveys = async () => {
        // Ejecuto el endopoint para traer todas las encuestas
        
        this.setState({active_view: 'loading'});

        let empresa_id = this.state.empresa_id

        let getAllSurveysFromAPI = await GetAllSurveysAPI(empresa_id);

        if(getAllSurveysFromAPI.rdo === 0) {
            this.setState({
                encuestas: getAllSurveysFromAPI.data.data,
            })
            this.setState({active_view: 'listSurveys'});
        } else {
            this.setState({active_view: 'error'});
        }
    }

    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            active_view: name
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

    filter(event){
        var text = event.target.value
        this.setState({
            text: text,
        })
    }

    render() {
        const active_view = this.state.active_view
        //console.log(this.state.empresa_id)
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container-fluid vh-100">
                        <div className="row mt-4">
                            <nav className="navbar navbar-light w-100 justify-content-center">
                                <form className="form-inline">
                                    <div>
                                        <input 
                                            className="form-control mr-sm-2" 
                                            type="search" 
                                            placeholder="Buscar encuesta" 
                                            aria-label="Search"
                                            value={this.state.text} 
                                            onChange={(text) => this.filter(text)} />
                                        <button 
                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </nav>
                        </div>
                        <hr/>
                        <div className="row justify-content-center align-items-center">
                            <div className="col col-sm-12 col-md-7 col-lg-7">
                                <div className="card">
                                    <div className="card-body mt-5 mb-5">
                                        <div className="container text-center">
                                            <div className="spinner-grow spinner-observatorio" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <br/>
                                            <p className="text-muted mt-3">Cargando encuestas...</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Footer/>
                    </div>
                </div>
            )

        case "listSurveys":
            return (
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <nav className="navbar navbar-light w-100 justify-content-center">
                                <form className="form-inline">
                                    <div>
                                        <input 
                                            className="form-control mr-sm-2" 
                                            type="search" 
                                            placeholder="Buscar encuesta" 
                                            aria-label="Search"
                                            value={this.state.text} 
                                            onChange={(text) => this.filter(text)} />
                                        <button 
                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </nav>
                        </div>
                        <hr/>
                        <div className="row justify-content-center mb-5">
                            <div className="min-height"></div>
                            <div className="col col-sm-12 col-md-7 col-lg-7 ">

                                { this.state.encuestas.length > 0 ? ( 

                                    this.state.encuestas
                                    .filter(encuesta => encuesta.encuesta.title.toLowerCase().includes(this.state.text.toLowerCase()))
                                    .filter(encuesta => encuesta.progreso !== 100)
                                    .map(encuesta => <SurveyView encuesta = {encuesta} vencimiento = {encuesta.fecha_vencimiento} key={encuesta._id} history={this.props.history}/>) 

                                    ) : (

                                    <div className="text-center mt-5">
                                        <i className="material-icons ico-no-companies text-secondary mb-4">list_alt</i>
                                        <br/>
                                        <span className="text-secondary">No tienes encuestas cargadas.</span>
                                    </div>

                                    ) 
                                }

                            </div>
                        </div>
                    </div>
                        <Footer/>
    
                </div>
            )
        case "error":
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container-fluid vh-100">
                        <div className="row mt-4">
                            <nav className="navbar navbar-light w-100 justify-content-center">
                                <form className="form-inline">
                                    <div>
                                        <input 
                                            className="form-control mr-sm-2" 
                                            type="search" 
                                            placeholder="Buscar encuesta" 
                                            aria-label="Search"
                                            value={this.state.text} 
                                            onChange={(text) => this.filter(text)} />
                                        <button 
                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </nav>
                        </div>
                        <hr/>
                        <div className="row justify-content-center align-items-center">
                            <div className="col col-sm-12 col-md-7 col-lg-7">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="mt-4"></div>
                                        <i className="material-icons ico-no-companies">error</i>
                                        <br/>
                                        <h2>Algo salió mal.</h2>
                                        <p>No se pudo listar las encuestas.</p>
                                        <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                        <div className="mb-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        default:
            return(
                <div>
                    <Nav history={this.props.history}/>
                    <div className="container-fluid vh-100">
                        <div className="row mt-4">
                            <nav className="navbar navbar-light w-100 justify-content-center">
                                <form className="form-inline">
                                    <div>
                                        <input 
                                            className="form-control mr-sm-2" 
                                            type="search" 
                                            placeholder="Buscar encuesta" 
                                            aria-label="Search"
                                            value={this.state.text} 
                                            onChange={(text) => this.filter(text)} />
                                        <button 
                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </nav>
                        </div>
                        <hr/>
                        <div className="row justify-content-center align-items-center">
                            <div className="col col-sm-12 col-md-7 col-lg-7">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="mt-4"></div>
                                        <i className="material-icons ico-no-companies">error</i>
                                        <br/>
                                        <h2>Algo salió mal.</h2>
                                        <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>
                                        <div className="mb-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <Footer/>
                </div>
            )
        }
    }
}

export default Company;