import { ActionTypes } from '../../constants';

export const getPlans = () => {
  return {
    type: ActionTypes.GET_PLANS,
  };
};

export const getPlan = (id) => {
  return {
    type: ActionTypes.GET_PLAN,
    id,
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
