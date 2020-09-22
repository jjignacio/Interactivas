import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './App.css';
import Login from './components/Login'
import Empresa from './components/empresa/Company'
import ObservatorioPyme from './components/observatorioPyme/MainView'

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/login" component = {Login} />
        <Route path="/empresa" component={Empresa}/>
        <Route path="/observatorioPyme" component={ObservatorioPyme}/>
        <Route exact path="/" render={() => <Redirect to="/login"/>} />
      </Router>
    )
  }

}

export default App;
