import { ActionTypes } from '../../constants';

export const getPlans = () => {
  return {
    type: ActionTypes.GET_PLANS,
  };
};

export const getPlan = () => {
  return {
    type: ActionTypes.GET_PLAN,
  };
};
