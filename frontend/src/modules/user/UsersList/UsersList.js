import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useConfirm } from 'material-ui-confirm';

import { UserActions } from '../../../store/actions';
import { requestPending } from '../../../helpers/request';
import { getRoleName } from '../../../helpers/role';
import { ActionTypes, RouteURLs } from '../../../constants';
import Loading from '../../../components/Loading';
import TableToolbar from '../../../components/TableToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
  role: {
    textTransform: 'capitalize'
  }
}));

const UsersList = (props) => {
  const classes = useStyles();
  const { users, status, history, getUsers, deleteUser } = props;
  const confirm = useConfirm();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const handleAddUser = () => {
    history.push(RouteURLs.ADD_USER);
  };

  const handleEditUser = (id) => {
    history.push(`/user/${id}`);
  };

  const handleDeleteUser = (id) => {
    confirm({
      description: 'This will be permanently deleted'
    }).then(() => {
      deleteUser(id);
    })
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return  (
    <>
      <Container maxWidth="lg">
        <TableContainer className={classes.root} component={Paper}>
          <TableToolbar title="All users" handleAction={handleAddUser} withAction />
          {status !== requestPending(ActionTypes.GET_USERS) ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) =>{
                      const rawData = user.toJS();
                      return (
                        <TableRow key={rawData.id}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{rawData.username}</TableCell>
                          <TableCell>{rawData.email}</TableCell>
                          <TableCell className={classes.role}>{getRoleName(rawData.profile.role)}</TableCell>
                          <TableCell>
                            <IconButton aria-label="edit plan" onClick={() => handleEditUser(rawData.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete plan" onClick={() => handleDeleteUser(rawData.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.size}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          ): (
            <Loading />
          )}
        </TableContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.getIn(['user', 'users']),
  status: state.getIn(['users', 'status']),
});

const mapDispatchToProps = {
  getUsers: UserActions.getUsers,
  deleteUser: UserActions.deleteUser,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(UsersList);
