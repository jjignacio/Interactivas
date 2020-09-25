import React from 'react';
import ReleasesEmpresas from './ReleasesEmpresas';
import ReleasesEncuestas from './ReleasesEncuestas';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid ReleasesEmpresas xs>
          <ReleasesEmpresas />
        </Grid>
        <Grid item xs>
          <ReleasesEncuestas />
        </Grid>
      </Grid>
      <Button variant="contained">Siguiente</Button>
    </div>
  );

}
