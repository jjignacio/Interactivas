import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/Launch';
import WorkIcon from '@material-ui/icons/Work';
import DashboardIcon from '@material-ui/icons/Dashboard';

class MenuObservatorio extends Component {

    summary = () => {
        this.props.history.push('/dashboard');
    }
    releases = () => {
        this.props.history.push('/lanzamientos');
    }
    companies = () => {
        this.props.history.push('/listadoEmpresas');
    }
    signOff = () => {
        this.props.history.push('/login');
    }
    render () {
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" onClick={this.summary}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LaunchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lanzamientos" onClick={this.releases}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Empresas" onClick={this.companies}/>
                </ListItem>
                <hr></hr>
                <ListItem button>
                    <ListItemText className="text-center" primary="Cerrar sesi&oacute;n" onClick={this.signOff}/>
                </ListItem>
            </div>
        )
    }
}

export default MenuObservatorio;

