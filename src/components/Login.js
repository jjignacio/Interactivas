import React, { Component } from 'react';

import logo_fund from '../img/logo_fund2.jpg';
import LoginReset from './LoginReset'
import LoginForm from './LoginForm'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    toggleshow = () => {
        this.setState({show: !this.state.show})
    }

    render() {
        if(this.state.show) {
            return (
                <div className="container d-flex justify-content-center align-items-center" style={{paddingTop: "50px"}}>
                    <div className="card shadow-lg">
                        <div className="card-body" style={{width: "27rem"}}>
                            <img src={logo_fund} className="img-fluid rounded mx-auto d-block" alt="Fundaci&oacute;n Observatorio Pyme" />
                            
                            <LoginForm history={this.props.history}/>
                            
                        </div>
                        <div className="card-footer text-muted text-center">
                            <div className="row justify-content-center">
                                <small>
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-link"
                                        style={{fontSize: "0.85rem"}}
                                        onClick={this.toggleshow}
                                        >¿Necesitas ayuda?
                                    </button>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="container d-flex justify-content-center align-items-center" style={{paddingTop: "50px"}}>
                    <div className="card shadow-lg">
                        <div className="card-body" style={{width: "27rem"}}>
                            <img src={logo_fund} className="img-fluid rounded mx-auto d-block" alt="Fundaci&oacute;n Observatorio Pyme" />
                            
                            <LoginReset history={this.props.history}/>
                            
                        </div>
                        <div className="card-footer text-muted text-center">
                            <div className="row justify-content-center">
                                <small>
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-link"
                                        style={{fontSize: "0.85rem"}}
                                        onClick={this.toggleshow}
                                        >Mejor iniciar sesi&oacute;n
                                    </button>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } 
    }
}

export default Login;