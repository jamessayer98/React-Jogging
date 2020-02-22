import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table,
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
import moment from 'moment';

import { PlanActions } from '../../store/actions';
import { isAdmin } from '../../helpers/role';

const useStyles = makeStyles(theme => ({
  noAvailable: {
    margin: theme.spacing(3, 0, 2, 2),
  },  
}));

const TravelTable = (props) => {
  const classes = useStyles();
  const { role, plans, history, deletePlan } = props;

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleEditPlan = (id) => {
    history.push(`/plan/${id}`);
  };

  const handleDeletePlan = (id) => {
    deletePlan(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderDayDiff = (date) => {
    if (moment(date).isAfter(new Date())) {
      return `${moment(date).fromNow(true)} later`;
    }
    return '';
  } 

  return plans.size > 0 ? (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {isAdmin(role) && (
              <TableCell>User name</TableCell>
            )}
            <TableCell>Destination</TableCell>
            <TableCell>Start date</TableCell>
            <TableCell>End date</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>From now</TableCell>
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
                  {isAdmin(role) && (
                    <TableCell>{rawData.user.username}</TableCell>
                  )}
                  <TableCell>{rawData.destination}</TableCell>
                  <TableCell>{rawData.start_date}</TableCell>
                  <TableCell>{rawData.end_date}</TableCell>
                  <TableCell>{rawData.comment}</TableCell>
                  <TableCell>{renderDayDiff(rawData.start_date)}</TableCell>
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
  ) : (
    <Typography className={classes.noAvailable} variant="h4">
      No travel plans
    </Typography>
  )
};

const mapStateToProps = (state) => ({
  role: state.getIn(['auth', 'me', 'role']),
});

const mapDispatchToProps = {
  deletePlan: PlanActions.deletePlan,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(TravelTable);
