import ReduxReqs from 'redux-reqs';
import Api from '../config/api';

const reduxReqs = new ReduxReqs({
  prefix: 'ENV'
});

reduxReqs
  .get('GET_LIST', Api.ProjectEnvOper)
  .post('ADD', Api.ProjectEnvOper)
  .put('UPDATE', Api.ProjectEnvOper)
  .del('DEL', Api.ProjectEnvOper);

export const { getList, add, update, del }
  = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();
