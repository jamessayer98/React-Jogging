import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PlanActions } from '../../../store/actions';
import { requestPending } from '../../../helpers/request';
import { ActionTypes } from '../../../constants';
import Loading from '../../../components/Loading';
import TableToolbar from '../../../components/TableToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));

const RecordList = (props) => {
  const classes = useStyles();
  const { planStatus, plans, getPlans } = props;

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getPlans();
  }, []);

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
          <TableToolbar title="Your travel plans" />
          <Table aria-label="plan">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Start date</TableCell>
                <TableCell>End date</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((plan, index) => {
                  const rawPlan = plan.toJS();
                  return (
                    <TableRow key={rawPlan.id}>
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell>{rawPlan.destination}</TableCell>
                      <TableCell>{rawPlan.start_date}</TableCell>
                      <TableCell>{rawPlan.end_date}</TableCell>
                      <TableCell>{rawPlan.comment}</TableCell>
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={plans.toJS().length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
