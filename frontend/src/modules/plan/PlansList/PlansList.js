import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Paper,
  TableContainer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PlanActions } from '../../../store/actions';
import { requestPending } from '../../../helpers/request';
import { ActionTypes, RouteURLs } from '../../../constants';
import Loading from '../../../components/Loading';
import TableToolbar from '../../../components/TableToolbar';
import TravelTable from '../../../components/TravelTable';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));

const PlansList = (props) => {
  const classes = useStyles();
  const { planStatus, plans, history, getPlans } = props;

  useEffect(() => {
    getPlans();
  }, []);

  const handleAddPlan = () => {
    history.push(RouteURLs.ADD_PLAN);
  };

  return planStatus !== requestPending(ActionTypes.GET_PLANS) ? (
    <>
      <Container maxWidth="lg">
        <TableContainer className={classes.root} component={Paper}>
          <TableToolbar title="Your travel plans" handleAction={handleAddPlan} withAction />
          <TravelTable plans={plans} />
        </TableContainer>
      </Container>
    </>
  ) : (
    <Loading />
  );
};

const mapStateToProps = (state) => ({
  planStatus: state.getIn(['plan', 'status']),
  plans: state.getIn(['plan', 'plans']),
});

const mapDispatchToProps = {
  getPlans: PlanActions.getPlans,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(PlansList);
