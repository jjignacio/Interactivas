import React, { Component } from "react";

class Companies extends Component {

    state = {
        visible: false
    }

    render() {
        if(this.state.visible) {
            return <div>
                    Empresas
                   </div>
        }
    }
}

export default Companies;