import React, { Component } from "react";

class Releases extends Component {

    state = {
        visible: false
    }

    render() {
        if(this.state.visible) {
            return <div>
                    Lanzamientos
                   </div>
        }
    }
}

export default Releases;