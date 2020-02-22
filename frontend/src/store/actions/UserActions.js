import { ActionTypes } from '../../constants';

export const getUsers = () => {
  return {
    type: ActionTypes.GET_USERS,
  };
};

export const getUser = (id) => {
  return {
    type: ActionTypes.GET_USER,
    id,
  };
};

export const addUser = (data) => {
  return {
    type: ActionTypes.ADD_USER,
    data,
  };
};

export const updateUser = (id, data) => {
  return {
    type: ActionTypes.UPDATE_USER,
    id,
    data,
  };
};

export const deleteUser = (id) => {
  return {
    type: ActionTypes.DELETE_USER,
    id,
  };
};
