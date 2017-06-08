import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  sendEmailCode, sendEmailCodeResult
} = createActions('SEND_EMAIL_CODE', 'SEND_EMAIL_CODE_RESULT');

export { sendEmailCode };

export default handleActions({
  SEND_EMAIL_CODE: (state) => ({
    ...state,
    isfetching: true
  }),
  SEND_EMAIL_CODE_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    sendEmailCodeResult: action.payload
  })
}, {});
// ending not modify

function* sendEmailCodeSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.get, Api.SendEmailCode, { params: data.payload });

    yield put(sendEmailCodeResult(res));
  } catch (error) {
    yield put(sendEmailCodeResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSendEmailCodeSaga() {
  yield takeEvery(sendEmailCode, sendEmailCodeSaga);
}
