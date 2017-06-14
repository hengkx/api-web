import ReduxReqs from 'redux-reqs';
import Api from '../config/api';

const reduxReqs = new ReduxReqs({
  prefix: 'PROJECT',
  prefixUrl: '/project'
});

reduxReqs
  .get('GET_ALL_PROJECT', Api.Project)
  .get('GET_PROJECT_BY_ID', Api.ProjectOper)
  .get('GET_PROJECT_Url', Api.ProjectUrl)
  .post('ADD_PROJECT', Api.Project)
  .post('PROJECT_ADD_ENV', Api.ProjectEnvOper)
  .put('PROJECT_UPDATE_ENV', Api.ProjectEnvOper)
  .del('DEL_PROJECT', Api.ProjectOper)
  .del('PROJECT_DELETE_ENV', Api.ProjectEnvOper);

export const { getAllProject, addProject, getProjectById,
  delProject, projectDeleteEnv,
  projectAddEnv, projectUpdateEnv, getProjectUrl }
  = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();


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
