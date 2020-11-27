import React, { Component } from "react";

// Componentes
import Menu from "../Menu";
import Footer from "../../Footer";

// Importo llamada a endpoint
import {GetAllCompanies as GetAllCompaniesAPI} from "../../controller/DashboardController";

// Importo llamada a endpoint
import {AddCompanies as AddCompaniesAPI} from "../../controller/DashboardController";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_view: "addCompany",
            lanzamiento: this.props.location.state.lanzamiento,
            lanzamiento_id: this.props.location.state.lanzamiento._id,
            empresas_lanzamiento: this.props.location.state.lanzamiento.empresas,
            encuesta_modelo_id: this.props.location.state.lanzamiento.encuesta_modelo_id,
            empresas: [],
            empresa_seleccionada: new Map(),
            title_valid: false,
            msj_error: '',
            className: 'form-control',
            title_release: this.props.location.state.lanzamiento.nombre,
            expiration_date: this.props.location.state.lanzamiento.fecha_vencimiento,
            expiration_date_format: "",

        };
        this.handleActiveView = this.handleActiveView.bind(this);
    }

    componentDidMount() {
        this.getCompanies();
        const dbDate = new Date(this.state.expiration_date);

        // formateo la fecha de vencimiento
        let expiration_date = new Intl.DateTimeFormat('en-GB').format(dbDate);
        this.setState({
            expiration_date_format: expiration_date,
        })
    }

    getCompanies = async () => {
        // Ejecuto el endopoint para traer todas las empresas
        
        this.setState({active_view: 'loading'});

        let getAllCompaniesFromAPI = await GetAllCompaniesAPI();

        if(getAllCompaniesFromAPI.rdo === 0) {
            this.setState({
                empresas: getAllCompaniesFromAPI.data.data,
                active_view: 'addCompany'
            })
            this.removeCompanies()
        } else {
            this.setState({active_view: 'error'});
        }
    }

    // Borro las empresas que ya estan en el lanzamiento
    removeCompanies = () => {
        let empresas_lanzamiento = this.state.empresas_lanzamiento
        let empresas = this.state.empresas

        empresas.map(empresa => { 
            empresas_lanzamiento.map(empresa_lanzamiento => {
                if(empresa_lanzamiento.razon_social === empresa.razon_social) {
                    var indice = empresas.indexOf(empresa); // obtenemos el indice
                    empresas.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
                }
            })
        })

        this.setState({empresas: empresas});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        let lanzamiento_id = this.state.lanzamiento_id
        let encuesta_modelo_id = this.state.encuesta_modelo_id
        let fecha_vencimiento  = this.state.fecha_vencimiento
        let empresas_array = [];

        //console.log("Id lanzamiento: "+lanzamiento_id)

        const empresa_seleccionada = this.state.empresa_seleccionada
        /* Recorro empresas y concateno en el array las Key*/
        empresa_seleccionada.forEach(function(value, key) {
            if(value) {
                empresas_array = empresas_array.concat(value.empresaId)
            }
        })

        //console.log("Empresas ID: " + empresas_array)
        //console.log(this.state.empresa_seleccionada.keys())

        this.setState({activeView: 'loading'});

        let addCompaniesFromAPI = await AddCompaniesAPI(lanzamiento_id, empresas_array, encuesta_modelo_id, fecha_vencimiento);

        if(addCompaniesFromAPI.rdo === 0) {
            this.props.history.push({
                pathname: '/dashboard',
            })
        } else {
            this.setState({activeView: 'error'});
        }
        
    }

    myChangeHandler = (event) => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        const empresaId = event.target.id;
        this.setState(prevState => ({ empresa_seleccionada: prevState.empresa_seleccionada.set(item, {isChecked, empresaId}) }));
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

    cancel = () => {
        this.props.history.push({
            pathname: '/dashboard',
        })
    }

    render() {
        const active_view = this.state.active_view
        console.log(this.state.lanzamiento)

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
                                                <h4>Editar lanzamiento</h4>
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

        case "addCompany":
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
                                    
                                    <div className="row justify-content-center mt-4">
                                        <div className="col">
                                            <nav className="navbar navbar-light w-100">
                                                <h4>Editar lanzamiento</h4>
                                            </nav>
                                        </div>
                                    </div>
                                    
                                    <hr className="mb-4"/>

                                    <div className="row justify-content-center mt-5">
                                        <div className="col col-sm-12 col-md-9 col-lg-9">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="container">
                                                        <div className="row justify-content-center mt-3">
                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label>Titulo del lanzamiento</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className={this.state.className}
                                                                        autoComplete="off" 
                                                                        placeholder="Titulo del lanzamiento" 
                                                                        disabled
                                                                        name="title_release"
                                                                        value={this.state.title_release} />
                                                                        { this.state.title_valid !== '' ? ( <small className="text-danger">{this.state.msj_error}</small> ) : null }
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 mb-6 mb-2">
                                                                <div className="form-group">
                                                                    <label>Fecha de vencimiento</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        autoComplete="off" 
                                                                        placeholder="mm/dd/aaaa" 
                                                                        disabled
                                                                        name="expiration_date"
                                                                        value={this.state.expiration_date_format} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        { this.state.empresas.lenght === 0 ? ( <span>No existen empresas disponibles para esta encuesta.</span> ) :  
                                                            <form>
                                                                <div className="row mb-2">
                                                                    <div className="col-12">
                                                                        <h6>Empresas</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-4">
                                                                    <div className="col-2"></div>
                                                                    <div className="col-md-10 mb-10">
                                                                        <div className="form-check">
                                                                            { this.state.empresas.map(empresa =>{
                                                                                return( 
                                                                                    <div key={empresa._id} className="mr-3">
                                                                                        <input 
                                                                                            className="form-check-input" 
                                                                                            type="checkbox" 
                                                                                            name={empresa.razon_social}
                                                                                            id={empresa._id} 
                                                                                            value={empresa.razon_social}
                                                                                            checked={this.state.empresa_seleccionada.get(empresa.name)}
                                                                                            onChange={this.myChangeHandler}/>
                                                                                            <label className="form-check-label">
                                                                                                {empresa.razon_social}
                                                                                            </label>
                                                                                    </div>
                                                                                ) } ) }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <hr/>
                                                                <button 
                                                                    className="btn btn-outline-fundacion float-right"
                                                                    type="button"
                                                                    name="confirmacion"
                                                                    onClick={this.handleSubmit}>
                                                                    Guardar
                                                                </button>
                                                                <button 
                                                                    className="btn btn-outline-danger"
                                                                    type="button"
                                                                    onClick={this.cancel}>
                                                                    Cancelar
                                                                </button>
                                                            </form>
                                                        }
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
                                                <h4>Editar lanzamiento</h4>
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
                                                <h4>Editar lanzamiento</h4>
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