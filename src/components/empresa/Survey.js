import React, { Component } from 'react';


class Survey extends Component {
    render() {
        return (
            <div>
                <div className="card mt-2">
                    <div className="card-body">
                        <h5 className="card-title">Encuesta Satisfacción del cliente</h5>
                        <h6 className="card-subtitle mb-2 text-muted">10 Preguntas</h6>
                        <p className="card-text">La satisfacción del cliente es un término que se utiliza con frecuencia en marketing. Es una medida de cómo los productos y servicios suministrados por una empresa cumplen o superan las expectativas del cliente.</p>
                        <button type="button" className="btn btn-outline-primary">Empezar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Survey;