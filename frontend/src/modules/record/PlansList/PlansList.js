import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import { PlanActions } from '../../../store/actions';
import { requestPending } from '../../../helpers/request';
import { ActionTypes, RouteURLs } from '../../../constants';
import Loading from '../../../components/Loading';
import TableToolbar from '../../../components/TableToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
  noAvailable: {
    margin: theme.spacing(3, 0, 2, 2),
  },
}));

const PlansList = (props) => {
  const classes = useStyles();
  const { planStatus, plans, history, getPlans } = props;

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getPlans();
  }, []);

  const handleAddPlan = () => {
    history.push(RouteURLs.ADD_PLAN);
  }

  const handleEditPlan = (id) => {
    history.push(`/plan/${id}`);
  };

  const handleDeletePlan = (id) => {
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return planStatus !== requestPending(ActionTypes.GET_PLANS) ? (
    <>
      <Container maxWidth="lg">
        <TableContainer className={classes.root} component={Paper}>
          <TableToolbar title="Your travel plans" handleAction={handleAddPlan} withAction />
          {plans.size > 0 ? (
            <>
              <Table aria-label="plan">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell>Start date</TableCell>
                    <TableCell>End date</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plans
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((plan, index) => {
                      const rawData = plan.toJS();
                      return (
                        <TableRow key={rawData.id}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{rawData.destination}</TableCell>
                          <TableCell>{rawData.start_date}</TableCell>
                          <TableCell>{rawData.end_date}</TableCell>
                          <TableCell>{rawData.comment}</TableCell>
                          <TableCell>
                            <IconButton aria-label="edit plan" onClick={() => handleEditPlan(rawData.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete plan" onClick={() => handleDeletePlan(rawData.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                  })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={plans.size}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          ): (
            <Typography className={classes.noAvailable} variant="h4">
              No travel plans
            </Typography>
          )}
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
