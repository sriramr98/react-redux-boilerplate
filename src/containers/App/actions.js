import {INCREMENT, DECREMENT, SET_USER, CLEAR_USER} from './actionTypes';

export const incrementValue = () => ({
  type: INCREMENT,
});

export const decrementValue = () => ({
  type: DECREMENT,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});
