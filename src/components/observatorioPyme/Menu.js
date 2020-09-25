import React, { Component } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/Launch';
import WorkIcon from '@material-ui/icons/Work';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import Releases from "./Releases";

class MenuObservatorio extends Component {

    handleClick = () => {
        // this.props.history.push('/lanzamientos');
    }

    render () {
        return <div>
                    {/* <Releases history={this.props.history}/> */}
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <LaunchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lanzamientos" onClick={this.handleClick} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Empresas" />
                    </ListItem>
               </div>
    }
}

export default MenuObservatorio;

