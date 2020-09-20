import React, {Component} from "react";
import Menu from "./Menu";
import Inicio from "./Summary";

class MainView extends Component {
    render() {
        return <div>
            <Menu/>
            <Inicio/>
        </div>
    }
}

export default MainView;

