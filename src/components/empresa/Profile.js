import React, { Component } from 'react';

// Componentes
import Nav from './Nav'

class Profile extends Component {
    render() {
        return (
            <div>
               <Nav history={this.props.history}/>
                Codigo de Santi
            </div>
        )
    }
}

export default Profile;