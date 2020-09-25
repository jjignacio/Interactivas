import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './App.css';

// Componentes Empresa Encuestada
import Login from './components/Login'
import Empresa from './components/empresa/Company'
import Encuesta from './components/empresa/Survey'
import Profile from './components/empresa/Profile'

// Componentes Observatorio Pyme
import Dashboard from './components/observatorioPyme/Summary'
import Lanzamientos from './components/observatorioPyme/Releases'
import ListadoEmpresas from './components/observatorioPyme/Companies'


class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/login" component = {Login} />
        <Route path="/empresa" component={Empresa}/>
        <Route path="/encuesta" component={Encuesta}/>
        <Route path="/perfil" component={Profile}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/lanzamientos" component={Lanzamientos}/>
        <Route path="/listadoEmpresas" component={ListadoEmpresas}/>
        <Route exact path="/" render={() => <Redirect to="/login"/>} />
      </Router>
    )
  }

}

export default App;
