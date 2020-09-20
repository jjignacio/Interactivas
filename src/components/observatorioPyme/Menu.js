import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/Launch';
import WorkIcon from '@material-ui/icons/Work';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Companies from "./Companies";

class MenuObservatorio extends Component {

    showItemDetail() {
        return <Companies /> 
    }

    render () {
        return <div>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Summary" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <LaunchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Releases" />
                    </ListItem>
                    <ListItem button onClick= {this.showItemDetail}>
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Companies" />
                    </ListItem>
               </div>
    }
}

export default MenuObservatorio;

