import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './App.css';
import Login from './components/Login'
import Empresa from './components/empresa/Company'
import Encuesta from './components/empresa/Survey'
import Profile from './components/empresa/Profile'
import Lanzamientos from './components/observatorioPyme/Releases'
import ObservatorioPyme from './components/observatorioPyme/MainView'
import Summary from './components/observatorioPyme/Summary'

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/login" component = {Lanzamientos} />
        <Route path="/empresa" component={Empresa}/>
        <Route path="/encuesta" component={Encuesta}/>
        <Route path="/perfil" component={Profile}/>
        <Route path="/lanzamientos" component={Lanzamientos}/>
        <Route path="/observatorioPyme" component={ObservatorioPyme}/>
        <Route path="/summary" component={Summary}/>
        <Route exact path="/" render={() => <Redirect to="/login"/>} />
      </Router>
    )
  }

}

export default App;
