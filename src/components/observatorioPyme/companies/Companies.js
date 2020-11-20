import React, { Component } from "react";

// Componentes
import CompanyObj from './CompanyObj'
import Menu from "../Menu";
import Footer from '../../Footer'

// Importo llamada a endpoint
import {GetAllCompanies as GetAllCompaniesAPI} from "../../controller/CompanyController";

class Companies extends Component {
    // Lista las encuestas disponibles.
    constructor(props) {
        super(props);
        this.state = {
            active_view: "listCompanies",
            empresas: [],
            text_search: '',
        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    componentDidMount() {
        this.getCompanies();
    }

    getCompanies = async () => {
        // Ejecuto el endopoint para traer todas las empresas
        
        this.setState({active_view: 'loading'});

        let getAllCompaniesFromAPI = await GetAllCompaniesAPI();

        if(getAllCompaniesFromAPI.rdo === 0) {
            this.setState({
                empresas: getAllCompaniesFromAPI.data.data,
            })
            this.setState({active_view: 'listCompanies'});
        } else {
            this.setState({active_view: 'error'});
        }
    }

    filter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
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

    newCompany = () => {
        this.props.history.push({
            pathname: '/nuevaEmpresa',
        })
    }

    render() {
        const active_view = this.state.active_view
        console.log(this.state.empresas)
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
                                    <div className="row justify-content-center mt-4">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Empresas</h4>
                                                <form className="form-inline">
                                                    <div>
                                                        <input 
                                                            className="form-control mr-sm-2" 
                                                            type="search" 
                                                            placeholder="Buscar empresa" 
                                                            aria-label="Search"
                                                            value={this.state.text_search} 
                                                            onChange={(text_search) => this.filter(text_search)} />
                                                        <button 
                                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5 mt-5">
                                            <div className="card">
                                                <div className="card-body mt-5 mb-5">
                                                    <div className="container text-center">
                                                        <div className="spinner-grow spinner-observatorio" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                        <br/>
                                                        <p className="text-muted mt-3">Cargando empresas</p>
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

            case "listCompanies":
            return( 
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary border-right">
                                <div className="mt-4">
                                    <Menu history={this.props.history}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row justify-content-center mt-4">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Empresas</h4>
                                                <form className="form-inline">
                                                    <div>
                                                        <input 
                                                            className="form-control mr-sm-2" 
                                                            type="search" 
                                                            placeholder="Buscar empresa" 
                                                            aria-label="Search"
                                                            value={this.state.text_search} 
                                                            onChange={(text_search) => this.filter(text_search)} />
                                                        <button 
                                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-8 mt-4 mb-4">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-fundacion float-right"
                                                name="newCompany"
                                                onClick={this.newCompany}>
                                                Cargar empresa
                                            </button>
                                        </div>
                                    </div>
                                </div>  
                                <div className="container-fluid">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-8 mb-5">

                                            { this.state.empresas.length > 0 ? ( 

                                                 this.state.empresas
                                                .filter(empresa => empresa.razon_social.toLowerCase().includes(this.state.text_search.toLowerCase()))
                                                .map(empresa => <CompanyObj empresa = {empresa} key={empresa._id} history={this.props.history}/>) 
                                            
                                                ) : (

                                                <div className="text-center mt-5">
                                                    <i className="material-icons ico-no-companies text-secondary">work</i>
                                                    <br/>
                                                    <span className="text-secondary">No existen empresas cargadas, crea una seleccionando el botón "Cargar empresa".</span>
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
                                <div className="row justify-content-center mt-4">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Empresas</h4>
                                                <form className="form-inline">
                                                    <div>
                                                        <input 
                                                            className="form-control mr-sm-2" 
                                                            type="search" 
                                                            placeholder="Buscar empresa" 
                                                            aria-label="Search"
                                                            value={this.state.text_search} 
                                                            onChange={(text_search) => this.filter(text_search)} />
                                                        <button 
                                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <div className="mt-4"></div>
                                                    <i className="material-icons ico-no-companies">error</i>
                                                    <br/>
                                                    <h2>Algo salió mal.</h2>
                                                    <p>No se pudo listar las empresas.</p>
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
                                <div className="row justify-content-center mt-4">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Empresas</h4>
                                                <form className="form-inline">
                                                    <div>
                                                        <input 
                                                            className="form-control mr-sm-2" 
                                                            type="search" 
                                                            placeholder="Buscar empresa" 
                                                            aria-label="Search"
                                                            value={this.state.text_search} 
                                                            onChange={(text_search) => this.filter(text_search)} />
                                                        <button 
                                                            className="btn my-3 my-sm-0 btn-outline-fundacion" type="button">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center">
                                        <div className="col col-sm-12 col-md-9 col-lg-10 mb-5">
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
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

export default Companies;