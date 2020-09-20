import React, {Component} from "react";
import Menu from "./Menu";
import Summary from "./Summary";

class MainView extends Component {
    render() {
        return <div>
            <Menu/>
            <Summary/>
        </div>
    }
}

export default MainView;

