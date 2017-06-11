import ReduxReqs from 'redux-reqs';
import Api from '../config/api';

const reduxRequests = ReduxReqs([
  {
    type: 'GET_ALL_PROJECT',
    url: Api.Project,
    method: 'get'
  },
  {
    type: 'ADD_PROJECT',
    url: Api.Project,
    method: 'post'
  },
  {
    type: 'GET_PROJECT_BY_ID',
    url: Api.ProjectOper,
    method: 'get'
  },
  {
    type: 'GET_PROJECT_Url',
    url: Api.ProjectUrl,
    method: 'get'
  },
  {
    type: 'DEL_PROJECT',
    url: Api.ProjectOper,
    method: 'delete'
  },
  {
    type: 'PROJECT_ADD_ENV',
    url: Api.ProjectEnvOper,
    method: 'post'
  },
  {
    type: 'PROJECT_UPDATE_ENV',
    url: Api.ProjectEnvOper,
    method: 'put'
  },
  {
    type: 'PROJECT_DELETE_ENV',
    url: Api.ProjectEnvOper,
    method: 'delete'
  }
]);

export const { getAllProject, addProject, getProjectById,
  delProject, projectDeleteEnv,
  projectAddEnv, projectUpdateEnv, getProjectUrl }
  = reduxRequests.actionCreators;

export default reduxRequests.handleActions;

export const watchSagas = reduxRequests.watchSagas;


// function* getAllProjectSaga(data) {
//   try {
//     yield put(beginTask());

//     const res = yield call(axios.get, Api.Project, { params: data.payload });

//     yield put(getAllProjectResult(res));
//   } catch (error) {
//     yield put(getAllProjectResult(error));
//   } finally {
//     yield put(endTask());
//   }
// }
