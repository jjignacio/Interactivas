import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css"; 

// Componentes
import Menu from "./Menu";

export default class Summary extends Component {

    render() {

        const principalColumnsStyle = {
            color: 'rgb(83 86 90)',
            fontWeight: 'bold',
            fontSize: 17,
            };

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-sm-12 col-md-4 col-lg-2 bg-light text-secondary vh-100">
                            <div className="mt-5">
                                <Menu history={this.props.history}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="container p-3">
                                <div className="row justify-content-center">
                                <TableContainer component={Paper}>
                                    <Table aria-label="collapsible table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell />
                                                <TableCell style= {principalColumnsStyle}>Encuesta</TableCell>
                                                <TableCell style= {principalColumnsStyle}>Fecha lanzamiento</TableCell>
                                                <TableCell style= {principalColumnsStyle}>Fecha vencimiento</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <Row key={row.name} row={row} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const rows = [
    createData('Impuestos', '2020/10/13', '2020/12/13'),
    createData('Alcance de negocio', '2020/09/10', '2020/11/10'),
    createData('Remuneración salarial', '2020/07/03', '2020/09/03'),
    createData('Entrevistas laborales', '2020/05/14', '2020/07/14'),
    createData('Conocimientos informaticos', '2020/01/19', '2020/03/19'),
];

function createData(name, releaseDate, expirationDate) {

    function buildStatus(status) {
        return <Progress type="circle" percent={status} width={50} />
    }

    return {
        name,
        releaseDate,
        expirationDate,
        companies: [
        { razonSocial: 'Netflix', cuit: '30-71175853-0', estadoEncuesta: buildStatus(100)},
        { razonSocial: 'Amazon', cuit: '20-12354743-0', estadoEncuesta: buildStatus(20)},
        { razonSocial: 'Mercado Libre', cuit: '30-34636443-0', estadoEncuesta: buildStatus(50)},
        { razonSocial: 'Tesla', cuit: '20-75675766-0', estadoEncuesta: buildStatus(0)},
        { razonSocial: 'Google', cuit: '30-90784533-0', estadoEncuesta: buildStatus(75)},
        ],
    };
}

Row.propTypes = {
    row: PropTypes.shape({
        companies: PropTypes.arrayOf(
        PropTypes.shape({
            estadoEncuesta: PropTypes.string.isRequired,
            cuit: PropTypes.string.isRequired,
            razonSocial: PropTypes.string.isRequired,
        }),
        ).isRequired,
    }).isRequired,
};

function Row(props) {

    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const iconButtonStyle = {
        background: 'hsl(180, 50%, 50%)',
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    };

    const circleIconButtonStyle = {
        background: 'hsl(180, 50%, 50%)',
        border: 0,
        borderRadius: 50,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    };

    const secondaryColumnsStyle = {
        color: 'rgb(83 86 90)',
        fontWeight: 'bold',
        fontSize: 14,
        };

    return (
        <React.Fragment>
        <TableRow>
            <TableCell>
                <IconButton style={iconButtonStyle} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell component="th" scope="row">{row.releaseDate}</TableCell>
            <TableCell component="th" scope="row">{row.expirationDate}</TableCell>
            <TableCell align="right">{row.empresa}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                        Empresas alcanzadas <AddCircleIcon position="right" style={circleIconButtonStyle} />
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell style={secondaryColumnsStyle}>Razón social</TableCell>
                                <TableCell style={secondaryColumnsStyle}>CUIT</TableCell>
                                <TableCell style={secondaryColumnsStyle} align="left">Estado de encuesta</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {row.companies.map((company) => (
                                <TableRow key={company.razonSocial}>
                                    <TableCell component="th" scope="row">{company.razonSocial}</TableCell>
                                    <TableCell>{company.cuit}</TableCell>
                                    <TableCell align="left">{company.estadoEncuesta}</TableCell>
                                    <TableCell align="left"><DeleteIcon /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    );
}
