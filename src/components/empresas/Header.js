import { blue, lightBlue } from '@material-ui/core/colors';
import React from 'react';

export class header extends React.Component{
    render () {
        return (
            //nose como poder cambiar el color de fondo, o por que no lo hace
            <div className = 'container'>
                    <nav className = 'navbar navbar-light bg-light fixed-top' style ={{backgroundColor : 300}}>
                         <a href="#" class="navbar-brand">Bienvenido Empresa1</a>
                         <img src="https://iconape.com/wp-content/files/ko/182549/png/182549.png" width="80" height="80" alt="" style ={{position: 'absolute', right: '15px', top: '-22px'}}></img>
                    </nav>
            </div>
        );
    }
}
export default header