import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/Launch';
import WorkIcon from '@material-ui/icons/Work';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class MenuObservatorio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem('nombre'),
            user_rol: localStorage.getItem('rol'),
        };
    }

    summary = () => {
        this.props.history.push('/dashboard');
    }
    releases = () => {
        this.props.history.push('/lanzamientos');
    }
    companies = () => {
        this.props.history.push('/listadoEmpresas');
    }
    users = () => {
        this.props.history.push('/usuariosObservatorio');
    }
    signOff = () => {
        this.props.history.push('/login');
    }
    render () {
        const user_name = this.state.user_name
        return (
            <div className="lateral-menu">
                <div className="text-center mb-3">
                    <AccountCircleIcon className="icon-profile-size"/>
                    <br/>
                    <button
                        type="button"
                        className="btn text-reset">
                        <span>{user_name}</span>
                    </button>
                </div>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon className="color-observatorio" />
                    </ListItemIcon>
                    <ListItemText className="color-observatorio" primary="Inicio" onClick={this.summary}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LaunchIcon className="color-observatorio" />
                    </ListItemIcon>
                    <ListItemText className="color-observatorio" primary="Lanzamientos" onClick={this.releases}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <WorkIcon className="color-observatorio" />
                    </ListItemIcon>
                    <ListItemText className="color-observatorio" primary="Empresas" onClick={this.companies}/>
                </ListItem>

                { this.state.user_rol==='Observatorio_Admin' ? 
                    (
                        <ListItem button>
                            <ListItemIcon>
                                <AccountBoxIcon className="color-observatorio"/>
                            </ListItemIcon>
                            <ListItemText className="color-observatorio" primary="Usuarios" onClick={this.users}/>
                        </ListItem>
                    ) : null 
                }

                <hr/>
                <ListItem button>
                    <ListItemText className="text-center" primary="Cerrar sesi&oacute;n" onClick={this.signOff}/>
                </ListItem>
            </div>
        )
    }
}

export default MenuObservatorio;

