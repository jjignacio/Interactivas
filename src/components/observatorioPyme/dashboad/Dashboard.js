import React, { Component } from "react";

// Componentes
import Menu from "../Menu";
import Survey from "./Survey";
import Footer from "../../Footer";

// Imagenes
import logo_fund from '../../../img/logo_fund.png';

// Importo llamada a endpoint
import {GetAllCompanies as GetAllCompaniesAPI} from "../../controller/CompanyController";

// Importo llamada a endpoint
import {GetRelease as GetReleaseAPI} from "../../controller/DashboardController";

// Datos
import encuestas from '../../../data/encuestasModelo.json'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cant_empresas: '',
            cant_encuestas: '',
            cant_lanzamientos: '',
            active_view: "listUsers",
            encuestas: encuestas,
            lanzamientos: []

        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        // Ejecuto el endopoint para traer todas las empresas
        
        this.setState({active_view: 'loading'});

        let getAllCompaniesFromAPI = await GetAllCompaniesAPI();
        let getReleaseFromAPI = await GetReleaseAPI();

        if(getAllCompaniesFromAPI.rdo === 0) {
            this.setState({
                cant_empresas: getAllCompaniesFromAPI.data.data.length,
                cant_encuestas: this.state.encuestas.length
            })
            this.setState({active_view: 'listUsers'});
        } else {
            this.setState({active_view: 'error'});
        }

        if(getReleaseFromAPI.rdo === 0) {
            this.setState({
                lanzamientos: getReleaseFromAPI.data.data,
                cant_lanzamientos: getReleaseFromAPI.data.data.length,
            })
            this.setState({active_view: 'listUsers'});
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

    render() {
        const active_view = this.state.active_view
        console.log(this.state.lanzamientos)
        switch(active_view) {
        case "loading": 
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center mt-2">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Inicio</h4>
                                                <img src={logo_fund} width="110px" alt="Fundaci&oacute;n Observatorio Pyme" />
                                            </nav>
                                        </div>
                                    </div>

                                    <hr className="mb-4"/>

                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5 mt-5">
                                            <div className="card">
                                                <div className="card-body mt-5 mb-5">
                                                    <div className="container text-center">
                                                        <div className="spinner-grow spinner-observatorio" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                        <br/>
                                                        <p className="text-muted mt-3">Cargando...</p>
                                                    </div>    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <Footer/>
                </div>
            )

        case "listUsers":
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-4">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container">
                                    
                                    <div className="row justify-content-center mt-2">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Inicio</h4>
                                                <img src={logo_fund} width="110px" alt="Fundaci&oacute;n Observatorio Pyme" />
                                            </nav>
                                        </div>
                                    </div>
                                    
                                    <hr className="mb-4"/>

                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-10 col-lg-10">
                                            <div className="mb-4">
                                                <div className="card border-info">
                                                    <div className="card-body">
                                                        <div className="container">
                                                            <div className="row justify-content-center">
                                                                <div className="col-sm-12 col-md-3 col-lg-3 text-center">
                                                                    
                                                                    <h1> {this.state.cant_encuestas} </h1>
                                                                    <span className="font-weight-ligh text-muted">Encuestas cargadas</span>
                                                                        
                                                                </div>

                                                                <div className="col-sm-12 col-md-1 col-lg-1">
                                                                    <div className="vl ml-3"></div>
                                                                </div>
                                                                
                                                                <div className="col-sm-12 col-md-3 col-lg-3 text-center">
                                                                    
                                                                    <h1> {this.state.cant_empresas} </h1>
                                                                    <span className="font-weight-ligh text-muted">Empresas activas</span>
                                                                        
                                                                </div>

                                                                <div className="col-sm-12 col-md-1 col-lg-1">
                                                                    <div className="vl ml-3"></div>
                                                                </div>

                                                                <div className="col-sm-12 col-md-3 col-lg-3 text-center">
                                                                    
                                                                    <h1> {this.state.cant_lanzamientos} </h1>
                                                                    <span className="font-weight-ligh text-muted">Lanzamientos</span>
                                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-10 col-lg-10">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="container">
                                                        <div className="row justify-content-center">
                                                            <div className="col-sm-12 col-md-3 col-lg-3 text-center font-weight-bold text-muted">
                                                                Lanzamiento
                                                            </div>
                                                            <div className="col-sm-12 col-md-1 col-lg-1"></div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 text-center font-weight-bold text-muted">
                                                                Fecha lanzamiento
                                                            </div>
                                                            <div className="col-sm-12 col-md-1 col-lg-1"></div>
                                                            <div className="col-sm-12 col-md-3 col-lg-3 text-center font-weight-bold text-muted">
                                                                Fecha vencimiento
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-10 col-lg-10 mb-5">

                                        {/*Mapeo todos los lanzamientos.*/}
                                        { this.state.lanzamientos.length > 0 ? ( 
                                            this.state.lanzamientos
                                            .map(lanzamiento => <Survey lanzamiento = {lanzamiento} key={lanzamiento._id} history={this.props.history}/>) 
                                            
                                            ) : (

                                                <div className="text-center mt-5">
                                                    <i className="material-icons ico-no-companies text-secondary mb-4">assignment</i>
                                                    <br/>
                                                    <span className="text-secondary">No hay ninguna encuesta enviada, realiza un envío desde la sección "Lanzamientos".</span>
                                                </div>

                                            ) 
                                        }

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "error":
            return(
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center mt-2">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Inicio</h4>
                                                <img src={logo_fund} width="110px" alt="Fundaci&oacute;n Observatorio Pyme" />
                                            </nav>
                                        </div>
                                    </div>
                                    
                                    <hr className="mb-4"/>
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card mt-5">
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
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        default:
            return(
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-5">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center mt-2">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Inicio</h4>
                                                <img src={logo_fund} width="110px" alt="Fundaci&oacute;n Observatorio Pyme" />
                                            </nav>
                                        </div>
                                    </div>
                                    
                                    <hr className="mb-4"/>
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card mt-5">
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
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

export default Dashboard;