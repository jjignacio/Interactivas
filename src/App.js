import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Home from './components/Home'
import history from './history'
import Login from './components/Login'

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => {
          return <div>
            <Login/>
          </div>
        }}/>
        <Route path="/home" component={Home}/>
      </Router>
    )
  }

}

export default App;
