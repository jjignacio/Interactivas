import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width:1500,
  },
});

function createData(id, nombre, estado) {
  return { id, nombre,estado};
}

const rows = [
  createData('E1', 'Encuesta de satisfaccion', 'Completada'),
  createData('E2', 'Conformidad a suba de impuestos', 'Incompleta'),
  createData('E3', 'Ingreso de mercaderias externas', 'Pendiente'),
  createData('E4', 'Senso de votantes', 'Incompleta'),
  createData('E5', 'Integridad de la organizacion', 'Completada'),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>Id</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Estado&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.nombre}</TableCell>
              <TableCell align="center">{row.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}