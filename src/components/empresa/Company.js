import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import Survey from './Survey'

class Company extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <div className="container d-flex p-3">
                    <div className="row justify-content-center align-items-center">
                        <div className="col col-sm-12 col-md-9 col-lg-7">
                            <Survey/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Company;