import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  signUp, signUpResult,
  checkUsernameExist, checkUsernameExistResult,
  signIn, signInResult
} = createActions('SIGN_UP', 'SIGN_UP_RESULT',
    'CHECK_USERNAME_EXIST', 'CHECK_USERNAME_EXIST_RESULT',
    'SIGN_IN', 'SIGN_IN_RESULT');

export { signUp, checkUsernameExist, signIn };

export default handleActions({
  SIGN_UP: (state) => ({
    ...state,
    isfetching: true
  }),
  SIGN_UP_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    signUpResult: action.payload
  }),
  CHECK_USERNAME_EXIST: (state) => ({
    ...state,
    isfetching: true
  }),
  CHECK_USERNAME_EXIST_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    checkUsernameExistResult: action.payload
  }),
  SIGN_IN: (state) => ({
    ...state,
    isfetching: true
  }),
  SIGN_IN_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    signInResult: action.payload
  })
}, {});
// ending not modify

function* signUpSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.User, data.payload);

    yield put(signUpResult(res));
  } catch (error) {
    yield put(signUpResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSignUpSaga() {
  yield takeEvery(signUp, signUpSaga);
}


function* checkUsernameExistSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.get, Api.CheckUsernameExist, { params: data.payload });

    yield put(checkUsernameExistResult(res));
  } catch (error) {
    yield put(checkUsernameExistResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchCheckUsernameExistSaga() {
  yield takeEvery(checkUsernameExist, checkUsernameExistSaga);
}


function* signInSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.SignIn, data.payload);

    yield put(signInResult(res));
  } catch (error) {
    yield put(signInResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchSignInSaga() {
  yield takeEvery(signIn, signInSaga);
}
