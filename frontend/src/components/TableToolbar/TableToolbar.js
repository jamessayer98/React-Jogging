import React from 'react';
import { Toolbar, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TableToolbar = ({ title, handleAction, withAction = false }) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      {withAction && (
        <Button variant="contained" color="primary" onClick={handleAction}>
          <AddIcon fontSize="small" /> Add
        </Button>
      )}
    </Toolbar>
  )
}

export default TableToolbar;