import ReduxReqs from 'redux-reqs';
// import ReduxReqs from 'C:/Users/happy/Desktop/redux-reqs/lib';
import Api from '../config/api';

const reduxReqs = new ReduxReqs({
  prefix: 'URL_GRPOUP',
  defaultUrl: Api.ProjectUrlGroup
});

reduxReqs
  .get('GET_LIST_BY_PROJECT_ID')
  .post('Add')
  .put('UPDATE', Api.UrlGroupOper)
  .del('DEL')
  .put('UPDATE_URL', Api.EditUrl);

export const { update, updateUrl, add, del,
  getListByProjectId } = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();

