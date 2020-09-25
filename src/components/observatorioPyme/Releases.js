import React, { Component } from "react";

// Componentes
import Menu from "./Menu";

class Releases extends Component {

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-sm-12 col-md-3 col-lg-2 bg-light text-secondary vh-100">
                            <div className="mt-5">
                                <Menu history={this.props.history}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="container p-3">
                                <div className="row justify-content-center">
                                    Codigo Pablo.
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Releases;