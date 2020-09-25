import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DataGrid as DataGrid2 } from '@material-ui/data-grid';

const columnsEmpresas = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombreEmpresa', headerName: 'Nombre Empresa', width: 130 },
];

const rowsEmpresas = [
  { id: 1, nombreEmpresa: 'Empresa1'},
  { id: 2, nombreEmpresa: 'Empresa2' },
  { id: 3, nombreEmpresa: 'Empresa3' },
  { id: 4, nombreEmpresa: 'Empresa4'},
];

const columnsEncuestas = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombreEncuesta', headerName: 'Nombre Encuesta', width: 230 },
  ];
  
  const rowsEncuestas = [
    { id: 1, nombreEncuesta: 'Encuesta1'},
    { id: 2, nombreEncuesta: 'Encuesta2' },
    { id: 3, nombreEncuesta: 'Encuesta3' },
    { id: 4, nombreEncuesta: 'Encuesta4'},
  ];


export default function tablaEmpresasEncuestas() {
  return (
    <div style={{ height: 400, width: '30%', position: 'relative', left: '0%' }}>
      <DataGrid rows={rowsEmpresas} columns={columnsEmpresas}  checkboxSelection />
      <br></br>
      <DataGrid style={ {border: '200px' , border: 'double'} } rows={rowsEncuestas} columns={columnsEncuestas} checkboxSelection />
    </div>
    // <div style={{ height: 400, width: '20%', position: 'relative', left: '50%' }}>
      
    // </div>
  );
}

//################################################                      ################################################//
