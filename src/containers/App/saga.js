import {takeEvery, takeLatest, put, call, all, fork} from 'redux-saga/effects';

import {INCREMENT, DECREMENT} from './actionTypes';

function* continueIncrementAction() {
  yield console.log('INCREMENT CALLED');
}

export function* incrementSaga() {
  yield takeEvery(INCREMENT, continueIncrementAction);
}

function* continueDecrementAction() {
  yield console.log('DECREMENT CALLED');
}

export function* decrementSaga() {
  yield takeEvery(DECREMENT, continueDecrementAction);
}

export default function* appSagas() {
  yield all([yield fork(incrementSaga), yield fork(decrementSaga)]);
}
