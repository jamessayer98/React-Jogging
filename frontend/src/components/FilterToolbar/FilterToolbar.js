import React from 'react';
import { connect } from 'react-redux';
import {
  Toolbar,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PlanActions } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    paddingRight: theme.spacing(10),
  },
  title: {
    width: '150px',
    marginRight: theme.spacing(10),
  },
}));

export const FilterToolbar = (props) => {
  const classes = useStyles();
  const { params, setParams } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setParams({
      ...params,
      [name]: value,
    });
  };

  return (
    <>
      <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6">
          Filtered by:
        </Typography>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              label="Destination"
              name="destination"
              size="small"
              value={params.destination}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              type="date"
              label="From date"
              name="fromDate"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={params.fromDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              type="date"
              label="To date"
              name="toDate"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={params.toDate}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  params: state.getIn(['plan', 'filterParams']).toJS(),
});

const mapDispatchToProps = {
  setParams: PlanActions.setFilterParams,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterToolbar);
