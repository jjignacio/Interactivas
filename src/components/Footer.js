import React, { Component } from 'react';

// Imagenes
import ReactImg from '../img/react.png'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer-color">
                    <div className="container">
                        <div className="row align-items-center mt-3">
                            <div className="col col-sm-12 col-md-6 col-lg-6 text-center">
                                <span className="text-white">FUNDACI&Oacute;N OBSERVATORIO PYME</span>
                            </div>
                            <div className="col col-sm-12 col-md-6 col-lg-6 justify-content-center">
                            {/*<!-- Social buttons -->*/}
                                <div className="text-center">
                                    <a href="https://www.observatoriopyme.org.ar/" target="_blank" rel="noopener noreferrer"><i className="fas fa-globe-americas text-white ml-4 footer-icon-size"></i></a>
                                    <a href="https://www.facebook.com/fundacionobservatoriopyme" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook text-white ml-4 footer-icon-size"></i></a>
                                    <a href="https://twitter.com/FOPyME" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter text-white ml-4 footer-icon-size"></i></a>
                                    <a href="https://www.instagram.com/observatoriopyme/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram text-white ml-4 footer-icon-size"></i></a>
                                    <a href="https://www.linkedin.com/in/observatoriopyme/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin text-white ml-4 footer-icon-size"></i></a>
                                    <a href="https://www.youtube.com/channel/UClSD4j7pYJ3tmk-IEk9lUOw" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube text-white ml-4 footer-icon-size"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="text-muted text-center py-3">© 2020 Copyright &nbsp;&nbsp;
                        Aplicaciones Interactivas - Grupo 13  &nbsp;&nbsp; Powered by
                        <span className="text-white"></span>
                        <img src={ReactImg} alt="react" className="footer-size-img" />
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;