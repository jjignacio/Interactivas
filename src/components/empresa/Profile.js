import React, { Component } from 'react';

// Componentes
import Nav from './Nav'

class Profile extends Component {
    render() {
        return (
            <div>
               <Nav history={this.props.history}/>
               <div className = 'container'>   
                    <nav className = 'navbar navbar-light bg-light fixed-top' style ={{backgroundColor : 300}}>
                         <button class="btn btn-default" style = {{fontSize: '18px'}}>Regresar</button>
                         <t class="navbar-brand"> Perfil </t>
                    </nav>
                    <img class = 'float-left fixed-top img-thumbnail' src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Netflix-new-icon.png/768px-Netflix-new-icon.png" width="420" height="420" alt="" style = {{top: '190px', left: '10px'}}></img>
                    <ul class = 'fixed-top list-group' style = {{top: '120px', left: '440px',right:'5px', fontSize: '30px'}}>
                        <li class = 'list-group-item'>Razon Social: Netflix</li>
                        <li class = 'list-group-item'>Cuit: 4301231232</li>
                        <li class = 'list-group-item'>Domicilio: Chile 1310</li>
                        <li class = 'list-group-item'>Codigo Postal: 1661</li>
                        <li class = 'list-group-item'>Localidad: San Fernando</li>
                        <li class = 'list-group-item'>Provincia: Buenos Aires</li>
                        <li class = 'list-group-item'>Telefono de contacto: 1123456787</li>
                        <li class = 'list-group-item'>Email: netflix@gmail.com</li>
                    </ul>
            </div>
            </div>
        )
    }
}

export default Profile;