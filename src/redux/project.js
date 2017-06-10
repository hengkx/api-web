import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { beginTask, endTask } from 'redux-nprogress';
import Api from '../config/api';

// beging not modify
const {
  getAllProject, getAllProjectResult,
  addProject, addProjectResult,
  getProjectById, getProjectByIdResult,
  delProject, delProjectResult,
  projectUpdateEnv, projectUpdateEnvResult
} = createActions('GET_ALL_PROJECT', 'GET_ALL_PROJECT_RESULT',
    'ADD_PROJECT', 'ADD_PROJECT_RESULT',
    'GET_PROJECT_BY_ID', 'GET_PROJECT_BY_ID_RESULT',
    'DEL_PROJECT', 'DEL_PROJECT_RESULT',
    'PROJECT_UPDATE_ENV', 'PROJECT_UPDATE_ENV_RESULT');

export { getAllProject, addProject, getProjectById, delProject, projectUpdateEnv };

export default handleActions({
  GET_ALL_PROJECT: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_ALL_PROJECT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getAllProjectResult: action.payload
  }),
  ADD_PROJECT: (state) => ({
    ...state,
    isfetching: true
  }),
  ADD_PROJECT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    addProjectResult: action.payload
  }),
  GET_PROJECT_BY_ID: (state) => ({
    ...state,
    isfetching: true
  }),
  GET_PROJECT_BY_ID_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    getProjectByIdResult: action.payload
  }),
  DEL_PROJECT: (state) => ({
    ...state,
    isfetching: true
  }),
  DEL_PROJECT_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    delProjectResult: action.payload
  }),
  PROJECT_UPDATE_ENV: (state) => ({
    ...state,
    isfetching: true
  }),
  PROJECT_UPDATE_ENV_RESULT: (state, action) => ({
    ...state,
    isfetching: false,
    projectUpdateEnvResult: action.payload
  })
}, {});
// ending not modify

function* getAllProjectSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.get, Api.Project, { params: data.payload });

    yield put(getAllProjectResult(res));
  } catch (error) {
    yield put(getAllProjectResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetAllProjectSaga() {
  yield takeEvery(getAllProject, getAllProjectSaga);
}

function* addProjectSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.post, Api.Project, data.payload);

    yield put(addProjectResult(res));
  } catch (error) {
    yield put(addProjectResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchAddProjectSaga() {
  yield takeEvery(addProject, addProjectSaga);
}


function* getProjectByIdSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.get, `${Api.Project}/${data.payload}`);

    yield put(getProjectByIdResult(res));
  } catch (error) {
    yield put(getProjectByIdResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchGetProjectByIdSaga() {
  yield takeEvery(getProjectById, getProjectByIdSaga);
}


function* delProjectSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.delete, `${Api.Project}/${data.payload}`);

    yield put(delProjectResult(res));
  } catch (error) {
    yield put(delProjectResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchDelProjectSaga() {
  yield takeEvery(delProject, delProjectSaga);
}


function* projectUpdateEnvSaga(data) {
  try {
    yield put(beginTask());

    const res = yield call(axios.put, `${Api.Project}/${data.payload.projectId}/env/${data.payload.id}`, data.payload);

    yield put(projectUpdateEnvResult(res));
  } catch (error) {
    yield put(projectUpdateEnvResult(error));
  } finally {
    yield put(endTask());
  }
}

export function* watchProjectUpdateEnvSaga() {
  yield takeEvery(projectUpdateEnv, projectUpdateEnvSaga);
}
