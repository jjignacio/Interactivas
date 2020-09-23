import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './App.css';
import Login from './components/Login'
<<<<<<< Updated upstream
import Empresa from './components/Empresa/Company'

=======
import Empresa from './components/empresa/Company'
import Encuesta from './components/empresa/Survey'
import Profile from './components/empresa/Profile'
>>>>>>> Stashed changes
import ObservatorioPyme from './components/observatorioPyme/MainView'

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/login" component = {Login} />
        <Route path="/empresa" component={Empresa}/>
        <Route path="/encuesta" component={Encuesta}/>
        <Route path="/perfil" component={Profile}/>
        <Route path="/observatorioPyme" component={ObservatorioPyme}/>
        <Route exact path="/" render={() => <Redirect to="/login"/>} />
      </Router>
    )
  }

}

export default App;
