import React from 'react';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

const TableToolbar = ({ title }) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h6">
        {title}
      </Typography>
    </Toolbar>
  )
}

export default TableToolbar;