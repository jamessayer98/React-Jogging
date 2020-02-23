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
import Loading from '../../components/Loading';
import { PlanActions } from '../../store/actions';
import { ActionTypes } from '../../constants';
import { requestPending } from '../../helpers/request';

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
  const { status, nextPlans, getNextPlans } = props;

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
          {status !== requestPending(ActionTypes.GET_NEXT_PLANS) ? (
            <TravelTable plans={nextPlans} />
          ): (
            <Loading />
          )}
        </TableContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  nextPlans: state.getIn(['plan', 'nextPlans']),
  status: state.getIn(['plan', 'status']),
});

const mapDispatchToProps = {
  getNextPlans: PlanActions.getNextPlans,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
