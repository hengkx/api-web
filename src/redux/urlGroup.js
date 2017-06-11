import ReduxReqs from 'redux-reqs';
import Api from '../config/api';

const reduxRequests = ReduxReqs([
  {
    type: 'getUrlGroupByProject',
    url: Api.ProjectUrlGroup,
    method: 'get'
  },
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
    type: 'DELETE_URL_GROUP',
    url: Api.ProjectUrlGroup,
    method: 'delete'
  },
  {
    type: 'UPDATE_URL',
    url: Api.EditUrl,
    method: 'put'
  }
]);

export const { update, updateUrl, add, deleteUrlGroup, getUrlGroupByProject } = reduxRequests.actionCreators;

export default reduxRequests.handleActions;

export const watchSagas = reduxRequests.watchSagas;

