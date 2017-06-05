import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  regist, registResult
} = createActions('REGIST', 'REGIST_RESULT');

export { regist };

export default handleActions({
  REGIST: (state) => ({
    ...state,
    isfetching: true
  }),
  REGIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    registResult: action.payload
  })
}, {});
// ending not modify

function* registSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.User, data.payload);

    yield put(registResult(res));
  } catch (error) {
    yield put(registResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchRegistSaga() {
  yield takeEvery(regist, registSaga);
}
