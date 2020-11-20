import React, { Component } from 'react';

// Importo llamada a endpoint
import {NewRelease as NewReleaseAPI} from "../../controller/ReleasesController";

function cambiarAFormatoUS(fecha){
    //let fecha = "2020-08-15"
    let fechaSplit = fecha.split("-");
    let dia = new Date(parseInt(fechaSplit[0], 10), //anio
                       parseInt(fechaSplit[1], 10) - 1, //mes
      				   parseInt(fechaSplit[2], 10) // dia
                      );
  
    //let diaFormateado = dia.getDate() + "-" + (dia.getMonth() + 1) + "-" + dia.getFullYear()
    let diaFormateado = (dia.getMonth() + 1) + "/" + dia.getDate() + "/" + dia.getFullYear();
    return diaFormateado;
  }

class ReleaseCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresas: this.props.empresas,
            encuesta: this.props.encuesta,
            expiration_date: '',
            title_release: '',
            empresa_seleccionada: new Map(),
            showConfirmarEnvio: false,
            activeView: 'lanzamiento',
            title_valid: false,
            msj_error: '',
            className: 'form-control'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleActiveView = this.handleActiveView.bind(this);
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        
        let encuesta_id = this.state.encuesta.id
        let empresas_array = [];
        let expiration_date = this.state.expiration_date
        let title_release = this.state.title_release

        if(expiration_date==='') {
            var dbDate = new Date();
            expiration_date = new Intl.DateTimeFormat('en-US').format(dbDate);
        } else {
            expiration_date = cambiarAFormatoUS(expiration_date);
        }
        

        console.log("Id encuenta a enviar: "+encuesta_id)
        console.log("Fecha de vencimiento: "+expiration_date)
        console.log("Titulo de la encuenta: "+title_release)

        
        const empresa_seleccionada = this.state.empresa_seleccionada
        /* Recorro empresas y concateno en el array las Key*/
        empresa_seleccionada.forEach(function(value, key) {
            if(value) {
                empresas_array = empresas_array.concat(value.empresaId)
            }
        })

        console.log("Empresas ID: " + empresas_array)
        //console.log(this.state.empresa_seleccionada.keys())

        this.setState({activeView: 'loading'});

        let newReleaseFromAPI = await NewReleaseAPI(encuesta_id, empresas_array, expiration_date, title_release);

        if(newReleaseFromAPI.rdo === 0) {
            this.setState({activeView: 'enviado'});
        } else {
            this.setState({activeView: 'error'});
        }

    }

    titleValid = () => {
        let title_valid = this.state.title_valid
        let title_release = this.state.title_release
        if(title_release!=='') {
            this.setState({msj_error: ''});
            this.setState({className: "form-control is-valid"});
            title_valid = true
        } else {
            this.setState({msj_error: 'Ingrese nombre del lanzamiento.'});
            this.setState({className: "form-control is-invalid"});
            title_valid = false
        }
        if(title_valid) {
            this.setState({activeView: 'confirmacion'});
        }
    }

    myChangeHandler = (event) => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        const empresaId = event.target.id;
        this.setState(prevState => ({ empresa_seleccionada: prevState.empresa_seleccionada.set(item, {isChecked, empresaId}) }));
    }

    // Maneja los datos ingresados por el usuario.
    myChangeInputHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    clearAllCheckboxes = () => {
        const clearCheckedItems = new Map();
        this.setState({ empresa_seleccionada: clearCheckedItems });
    }

    // Cambia la vista para confirmar el envio de la encuesta y conformacion del envio.
    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            activeView: name
        }));
    }

    render() {
        //console.log(this.state.empresas)
        switch(this.state.activeView) {
        case "loading": 
            return (
                <div className="card mt-4 border-info">
                    <div className="card-body">
                        <div className="container text-center">
                            <div className="spinner-grow spinner-observatorio" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <br/>
                            <p className="text-muted mt-3">Enviando encuenta...</p>
                        </div>    
                    </div>
                </div>
            )
        case "lanzamiento":
            const encuesta = this.state.encuesta;
            const target = '#collapse'+encuesta.id.toString();
            const targetDestination = 'collapse'+encuesta.id.toString();
            return (
                <div>
                    <div className="accordion" id="accordionCompany">
                        <div className="card mt-4 border-info">
                            <div className="card-header" id="headingOne">
                                <h2>
                                    <button 
                                        className="btn btn-block collapsed text-left no-box" 
                                        type="button" 
                                        data-toggle="collapse" 
                                        data-target={target} 
                                        aria-expanded="true" 
                                        aria-controls="collapseOne">
                                        <span className="font-weight-bold">{encuesta.title}</span>
                                    </button>
                                </h2>
                            </div>

                            <div 
                                id={targetDestination} 
                                className="collapse" 
                                aria-labelledby="headingOne" 
                                data-parent="#accordionCompany">
                                <div className="card-body">
                                    <div className="card">
                                        <div className="card-body">
                                            { this.state.empresas.lenght === 0 ? ( <span>No existen empresas disponibles para esta encuesta.</span> ) :  
                                                <form>
                                                    <div className="row ">
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
                                                                        <div key={empresa._id}>
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
                                                    <div className="row justify-content-center ">
                                                        <div className="col-md-6 mb-6 mb-2">
                                                            <div className="form-group">
                                                                <label>Titulo del lanzamiento</label>
                                                                <input 
                                                                    type="text" 
                                                                    className={this.state.className}
                                                                    autoComplete="off" 
                                                                    placeholder="Titulo del lanzamiento" 
                                                                    required
                                                                    name="title_release"
                                                                    value={this.state.title_release}
                                                                    onChange={this.myChangeInputHandler} />
                                                                    { this.state.title_valid !== '' ? ( <small className="text-danger">{this.state.msj_error}</small> ) : null }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-6 mb-2">
                                                            <div className="form-group">
                                                                <label>Fecha de vencimiento</label>
                                                                <input 
                                                                    type="date" 
                                                                    className="form-control" 
                                                                    autoComplete="off" 
                                                                    placeholder="mm/dd/aaaa" 
                                                                    required
                                                                    name="expiration_date"
                                                                    value={this.state.expiration_date}
                                                                    onChange={this.myChangeInputHandler} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <button 
                                                        className="btn btn-outline-fundacion float-right"
                                                        type="button"
                                                        name="confirmacion"
                                                        onClick={this.titleValid}>
                                                        Enviar
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
            )
        case "confirmacion":
            const encuenta_text = this.state.encuesta;
            console.log(encuenta_text)
            const empresa_seleccionada = this.state.empresa_seleccionada
            /* Creo un arreglo vacio para guardar las Key de empresas_seleccionadas, las Key en este caso es el nombre de la empresa*/
            let empresas_array = [];
            /* Recorro empresas y concateno en el array las Key*/
            empresa_seleccionada.forEach(function(value, key) {
                if(value) {
                    empresas_array = empresas_array.concat(key)
                }
            })
            if(empresas_array.length !== 0) {
                console.log(empresas_array)
                return (
                    <div className="card mt-4 text-white bg-info">
                        <div className="card-body">
                            <h4>Enviaremos la encuenta <span className="font-weight-bold">{encuenta_text.title}</span> a </h4>

                            <ul>
                                {empresas_array.map(empresa => <li key={empresa}>{empresa}</li>)}
                            </ul>

                            <small>Podr&aacute;s cancelar este env&iacute;o desde el inicio en cualquier momento.</small>

                            <div className="mb-3"></div>

                            <button 
                                type="submit" 
                                className="btn btn-dark text-center"
                                onClick={(e) => {
                                    this.handleSubmit(e);
                                  }}>
                                Enviar encuesta
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-link text-reset" 
                                name="lanzamiento"
                                onClick={(e) => {
                                    this.clearAllCheckboxes(e);
                                    this.handleActiveView(e);
                                  }}>
                                    Cancelar
                            </button>

                            <div className="mb-3"></div>

                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="card mt-4 border-info">
                        <div className="card-body">
                            <h5>No hay empresas seleccionadas.</h5>

                            <small>Por favor seleccion&aacute; alguna antes de continuar.</small>

                            <div className="mb-3"></div>

                            <button 
                                type="button" 
                                className="btn btn-link"
                                name="lanzamiento"
                                onClick={this.handleActiveView}>
                                    Volver
                            </button>

                        </div>
                    </div>
                )
            }
        case "enviado":
            return (
                <div className="card mt-4 border-success">
                    <div className="card-body">
                        <button 
                            type="button" 
                            className="close" 
                            name="lanzamiento" 
                            onClick={(e) => {
                                this.clearAllCheckboxes(e);
                                this.handleActiveView(e);
                            }}
                            aria-label="Close">
                            &times;
                        </button>
                        <h4>Listo!</h4>

                        <small>Recuerda que puedes visualizar los env&iacute;os desde el inicio.</small>

                    </div>
                </div>
            )
        case "error":
            return (
                <div className="card mt-4 border-danger">
                    <div className="card-body">
                        <button 
                            type="button" 
                            className="close" 
                            name="lanzamiento" 
                            onClick={(e) => {
                                this.clearAllCheckboxes(e);
                                this.handleActiveView(e);
                            }}
                            aria-label="Close">
                            &times;
                        </button>
                        <h4>Algo salió mal.</h4>
                        <p>No se pudo realizar el envio.</p>
                        <small className="text-muted">Por favor salga y vuelva a intentarlo.</small>

                    </div>
                </div>
            )
        default:
            return(
                <div>
                    <div className="card mt-4">
                        <div className="card-body">
                            <h4 className="card-title">P&aacute;gina no encontrada</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Te pedimos disculpas por las molestias ocasionadas.</h6>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ReleaseCompany;