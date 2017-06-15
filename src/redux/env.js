// import ReduxReqs from 'D:/GitHub/redux-reqs/lib';
import ReduxReqs from 'redux-reqs';
import Api from '../config/api';

// ReduxReqs.defaults = {
//   beforeAction: beginTask(),
// };

const reduxReqs = new ReduxReqs({
  prefix: 'ENV',
  defaultUrl: Api.ProjectEnvOper
});

reduxReqs
  .get('GET_LIST')
  .post('ADD')
  .put('UPDATE')
  .del('DEL');

export const { getList, add, update, del }
  = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();
