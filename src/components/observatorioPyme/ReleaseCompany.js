import React, { Component } from 'react';

class ReleaseCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: this.props.empresa,
            encuestas: this.props.encuestas,
            encuesta_seleccionada: new Map(),
            showConfirmarEnvio: false,
            activeView: 'lanzamiento',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleActiveView = this.handleActiveView.bind(this);
    }
    handleSubmit(event) {
        console.log(this.state.empresa)
        console.log(this.state.encuesta_seleccionada.keys())
        event.preventDefault();
    }
    myChangeHandler = (event) => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        this.setState(prevState => ({ encuesta_seleccionada: prevState.encuesta_seleccionada.set(item, isChecked) }));
    }
    clearAllCheckboxes = () => {
        const clearCheckedItems = new Map();
        this.setState({ encuesta_seleccionada: clearCheckedItems });
    }
    // Cambia la vista para confirmar el envio de la o las encuentas y conformacion del envio.
    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            activeView: name
        }));
    }
    render() {
        switch(this.state.activeView) {
        case "lanzamiento":
            const empresa = this.state.empresa;
            const target = '#collapse'+empresa.id.toString();
            const targetDestination = 'collapse'+empresa.id.toString();
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
                                        <span className="font-weight-bold">{empresa.razon_social}</span> - 
                                        CUIT: {empresa.cuit}
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
                                            { this.state.encuestas.lenght === 0 ? ( <span>No existen encuestas disponibles para esta empresa.</span> ) :  
                                                <form>
                                                    <div className="form-check">
                                                        { this.state.encuestas.map(encuesta =>{
                                                            return( 
                                                                <div key={encuesta.id}><input 
                                                                    className="form-check-input" 
                                                                    type="checkbox" 
                                                                    name={encuesta.title}
                                                                    id={encuesta.id} 
                                                                    value={encuesta.title}
                                                                    checked={this.state.encuesta_seleccionada.get(encuesta.name)}
                                                                    onChange={this.myChangeHandler}/>
                                                                    {encuesta.title}
                                                                </div>
                                                            ) } ) }
                                                    </div>
                                                    <hr/>
                                                    <button 
                                                        className="btn btn-outline-fundacion float-right"
                                                        type="button"
                                                        name="confirmacion"
                                                        onClick={this.handleActiveView}>
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
            const empresa_text = this.state.empresa;
            const encuesta_seleccionada = this.state.encuesta_seleccionada
            /* Creo un arreglo vacio para guardar las Key de encuentas_seleccionadas, las Key en este caso es el nombre de la encuenta*/
            let encuenstas_array = [];
            /* Recorro encuestas y concateno en el array las Key*/
            encuesta_seleccionada.forEach(function(value, key) {
                if(value) {
                    encuenstas_array = encuenstas_array.concat(key)
                }
            })
            if(encuenstas_array.length !== 0) {
                console.log(encuenstas_array)
                return (
                    <div className="card mt-4 text-white bg-info">
                        <div className="card-body">
                            <h4>Enviaremos las siguientes encuentas a <span className="font-weight-bold">{empresa_text.razon_social}</span></h4>

                            <ul>
                                {encuenstas_array.map(encuenta => <li key={encuenta}>{encuenta}</li>)}
                            </ul>

                            <small>Podr&aacute;s cancelar este env&iacute;o desde el inicio en cualquier momento.</small>

                            <div className="mb-3"></div>

                            <button 
                                type="submit" 
                                className="btn btn-dark text-center"
                                name="enviado"
                                onClick={(e) => {
                                    this.handleSubmit(e);
                                    this.handleActiveView(e);
                                  }}>
                                Enviar encuestas
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
                            <h5>No hay encuestas seleccionas ...</h5>

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