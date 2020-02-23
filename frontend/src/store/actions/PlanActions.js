import { ActionTypes } from '../../constants';

export const getPlans = (params = {}) => {
  return {
    type: ActionTypes.GET_PLANS,
    params,
  };
};

export const getPlan = (id) => {
  return {
    type: ActionTypes.GET_PLAN,
    id,
  };
};

export const getNextPlans = () => {
  return {
    type: ActionTypes.GET_NEXT_PLANS,
  };
};

export const addPlan = (data) => {
  return {
    type: ActionTypes.ADD_PLAN,
    data,
  };
};

export const updatePlan = (id, data) => {
  return {
    type: ActionTypes.UPDATE_PLAN,
    id,
    data,
  };
};

export const deletePlan = (id) => {
  return {
    type: ActionTypes.DELETE_PLAN,
    id,
  };
};

export const setFilterParams = (params) => {
  return {
    type: ActionTypes.SET_FILTER_PARAMS,
    payload: params,
  };
};
