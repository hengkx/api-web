import ReduxReqs from 'redux-reqs';
import Api from '../config/api';

const reduxRequests = ReduxReqs([
  {
    type: 'Add',
    url: Api.ProjectUrlGroup,
    method: 'post'
  },
  {
    type: 'UPDATE',
    url: Api.UrlGroupOper,
    method: 'put'
  },
  {
    type: 'UPDATE_URL',
    url: Api.EditUrl,
    method: 'put'
  }
]);

export const { update, updateUrl, add } = reduxRequests.actionCreators;

export default reduxRequests.handleActions;

export const watchSagas = reduxRequests.watchSagas;

