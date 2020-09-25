import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


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
class AltaOPYM extends Component {

  state = {
     Prov: null,
   };

   handleChange = name => event => {
     this.setState({
       [name]: event.target.value,
     });
   };
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
                                                    <label htmlFor="textSurvey">Domicilio</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="textSurvey"
                                                        name="respuesta"
                                                        />
                                                        <label htmlFor="textSurvey">Codigo Postal</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="textSurvey"
                                                            name="respuesta"
                                                            />
                                                            <label htmlFor="textSurvey">Localidad</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="textSurvey"
                                                                name="respuesta"
                                                                />
                                                                <label htmlFor="textSurvey">Partido</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="textSurvey"
                                                                    name="respuesta"
                                                                    />
                                                                        <label htmlFor="textSurvey">Telefono</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="textSurvey"
                                                                            name="respuesta"
                                                                            />
                                                                            <label htmlFor="textSurvey">Email</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="textSurvey"
                                                                                name="respuesta"
                                                                                />
                                                                                <TextField
                                                                                  className="form-control"
                                                                                  id="textSurvey"
                                                                                  select
                                                                                  label="Provincia"
                                                                                  value={this.state.Prov}
                                                                                  onChange={this.handleChange('Prov')}
                                                                                  helperText="Seleccione la Provincia"

                                                                                >
                                                                                  {Provincias.map(option => (
                                                                                    <MenuItem key={option.value} value={option.value}>
                                                                                      {option.label}
                                                                                    </MenuItem>
                                                                                  ))}
                                                                                </TextField>

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
                                                <span className="ml-2 mr-2"> Dar de Alta</span>

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

export default AltaOPYM;
