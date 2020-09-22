
import { lightBlue } from '@material-ui/core/colors';
import React from 'react';
import Header from './Header'
import Tabla from './Tabla'

class MainMenu extends React.Component {
    render(){
        return (
            <div className = 'container'>
                <div className='row'>
                    <div className = 'col-xs-10 col-xs-offset-1'>
                        <Header/>
                    </div>
                </div>
                <div className = 'row'>
                <div className = 'col-xs-10 col-xs-offset-1'>
                        <Tabla/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu