import React, { Component } from 'react';

const Provincias = [
  {
    value: 'BuenosAires',
    label: 'Buenos Aires',
  },
  {
    value: 'CABA',
    label: 'CABA',
  },
  {
    value: 'Catamarca',
    label: 'Catamarca',
  },
  {
    value: 'Chaco',
    label: 'Chaco',
  },
  {
    value: 'Chubut',
    label: 'Chubut',
  },
  {
    value: 'Cordoba',
    label: 'Cordoba',
  },
  {
    value: 'Corrientes',
    label: 'Corrientes',
  },
  {
    value: 'EntreRios',
    label: 'Entre Rios',
  },
  {
    value: 'Formosa',
    label: 'Formosa',
  },
  {
    value: 'Jujuy',
    label: 'Jujuy',
  },
  {
    value: 'LaPampa',
    label: 'La Pampa',
  },
  {
    value: 'LaRioja',
    label: 'LaRioja',
  },
  {
    value: 'Mendoza',
    label: 'Mendoza',
  },
  {
    value: 'Misiones',
    label: 'Misiones',
  },
  {
    value: 'Neuquen',
    label: 'Neuquen',
  },
  {
    value: 'RioNegro',
    label: 'Rio Negro',
  },
  {
    value: 'Salta',
    label: 'Salta',
  },
  {
    value: 'SanJuan',
    label: 'San Juan',
  },
  {
    value: 'SanLuis',
    label: 'San Luis',
  },
  {
    value: 'SantaCruz',
    label: 'Santa Cruz',
  },
  {
    value: 'SantaFe',
    label: 'Santa Fe',
  },
  {
    value: 'SantiagoDelEstero',
    label: 'Santiago Del Estero',
  },
  {
    value: 'TierraDelFuego',
    label: 'Tierra del Fuego, Antártida e Isla del Atlántico Sur',
  },
  {
    value: 'Tucuman',
    label: 'Tucuman',
  },
];

class NewCompany extends Component {

    render() {
        return (
            <div>
                <div className="card mt-5">
                    <div className="card-header">
                        <h5 className="card-title">Nueva Empresa</h5>
                    </div>
                    <div className="card-body">
                        <form >
                            <div className="form-group">
                                <label htmlFor="textSurvey">Razon Social</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="textSurvey"
                                    name="respuesta"
                                />
                                <label htmlFor="textSurvey">Cuit ( sin guiones )</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="textSurvey"
                                    name="respuesta"
                                />
                                <div className="row">
                                    <div className="col-8">
                                        <label htmlFor="textSurvey">Domicilio</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="textSurvey"
                                            name="respuesta"
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="textSurvey">Codigo Postal</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="textSurvey"
                                            name="respuesta"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="textSurvey">Localidad</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="textSurvey"
                                            name="respuesta"
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="textSurvey">Partido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="textSurvey"
                                            name="respuesta"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="textSurvey">Telefono</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="textSurvey"
                                            name="respuesta"
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="textSurvey">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="textSurvey"
                                            name="respuesta"
                                        />
                                    </div>
                                </div>

                            </div>
                        </form>

                    </div>
                    <div className="card-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col col-sm-12 col-md-6 col-lg-6 align-items-left">
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-danger"
                                        onClick={this.props.toggleshow}>
                                        Cancelar
                                    </button>
                                </div>
                                <div className="col col-sm-12 col-md-6 col-lg-6">
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-success float-right"
                                        onClick={this.cancel}>
                                        Dar de alta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewCompany;