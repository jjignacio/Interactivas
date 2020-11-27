import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

// Componentes Empresa Encuestada
import Login from './components/Login'
import Empresa from './components/empresa/Company'
import Encuesta from './components/empresa/Survey'
import Profile from './components/empresa/Profile'

// Componentes Observatorio Pyme
//import Dashboard from './components/observatorioPyme/Summary'
import Dashboard from './components/observatorioPyme/dashboad/Dashboard'
import AddCompany from './components/observatorioPyme/dashboad/AddCompany'
import Lanzamientos from './components/observatorioPyme/releases/Releases'

import Users from './components/observatorioPyme/obsUsers/ObservatoryUsers'
import UsuarioDetalle from './components/observatorioPyme/obsUsers/UserDetail'
import NuevoUsuario from './components/observatorioPyme/obsUsers/NewObservatoryUser'

import ListadoEmpresas from './components/observatorioPyme/companies/Companies'
import EmpresaDetalle from './components/observatorioPyme/companies/CompaniDetail'
import NuevaEmpresa from './components/observatorioPyme/companies/NewCompany'


class App extends Component {

    render() {
        return (
            <Router>
                <Route exact path="/login" component={Login} />

                <Route path="/empresa" component={Empresa} />
                <Route path="/encuesta" component={Encuesta} />
                <Route path="/perfil" component={Profile} />


                <Route path="/dashboard" component={Dashboard} />
                <Route path="/agregarEmpresa" component={AddCompany} />


                <Route path="/lanzamientos" component={Lanzamientos} />


                <Route path="/usuariosObservatorio" component={Users} />
                <Route path="/usuarioDetalle" component={UsuarioDetalle} />
                <Route path="/nuevoUsuarioObs" component={NuevoUsuario} />

                <Route path="/listadoEmpresas" component={ListadoEmpresas} />
                <Route path="/empresaDetalle" component={EmpresaDetalle} />
                <Route path="/nuevaEmpresa" component={NuevaEmpresa} />

                <Route exact path="/" render={() => <Redirect to="/login" />} />
            </Router>
        )
    }
}

export default App;
