import {INCREMENT, DECREMENT, SET_USER, CLEAR_USER} from './actionTypes';

const initialState = {
  value: 0,
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      };
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};
