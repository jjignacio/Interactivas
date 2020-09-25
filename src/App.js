import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './App.css';
import Login from './components/Login'
import Empresa from './components/empresa/Company'
import Encuesta from './components/empresa/Survey'
import Profile from './components/empresa/Profile'
import ObservatorioPyme from './components/observatorioPyme/MainView'
import AltaOPYM from './components/observatorioPyme/AltaOPYM'
import BajaOPYM from './components/observatorioPyme/BajaOPYM'
import Companies from './components/observatorioPyme/Companies'

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/login" component = {Login} />
        <Route path="/empresa" component={Empresa}/>
        <Route path="/encuesta" component={Encuesta}/>
        <Route path="/perfil" component={Profile}/>
        <Route path="/observatorioPyme" component={ObservatorioPyme}/>
        <Route path="/Companies" component={Companies}/>
        <Route path="/AltaOPYM" component={AltaOPYM}/>
        <Route path="/BajaOPYM" component={BajaOPYM}/>
        <Route exact path="/" render={() => <Redirect to="/login"/>} />
      </Router>
    )
  }

}

export default App;
