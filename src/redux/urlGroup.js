import ReduxReqs from 'redux-reqs';
// import ReduxReqs from 'C:/Users/happy/Desktop/redux-reqs/lib';
import Api from '../config/api';

const reduxReqs = new ReduxReqs({
  prefix: 'URL_GRPOUP'
});

reduxReqs
  .get('GET_URL_GROUP_BY_PROJECT', Api.ProjectUrlGroup)
  .post('Add', Api.ProjectUrlGroup)
  .put('UPDATE', Api.UrlGroupOper)
  .del('DELETE_URL_GROUP', Api.ProjectUrlGroup)
  .put('UPDATE_URL', Api.EditUrl);

export const { update, updateUrl, add, deleteUrlGroup,
  getUrlGroupByProject } = reduxReqs.getCreateActions();

export default reduxReqs.getReducers();

export const watchSagas = reduxReqs.getWatchSagas();

