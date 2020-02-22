import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  TableContainer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TableToolbar from '../../components/TableToolbar';
import TravelTable from '../../components/TravelTable';
import { PlanActions } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
  root: {
    marginTop: theme.spacing(3),
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const { nextPlans, getNextPlans } = props;

  useEffect(() => {
    getNextPlans();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Typography className={classes.header} variant="h4">
          Welcome to Travel
        </Typography>

        <TableContainer className={classes.root} component={Paper}>
          <TableToolbar title="Next month travel plans" />
          <TravelTable plans={nextPlans} />
        </TableContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  nextPlans: state.getIn(['plan', 'nextPlans']),
});

const mapDispatchToProps = {
  getNextPlans: PlanActions.getNextPlans,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
