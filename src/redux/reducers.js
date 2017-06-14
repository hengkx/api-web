import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { nprogress } from 'redux-nprogress';
import account from './account';
import project from './project';
import email from './email';
import urlGroup from './urlGroup';
import env from './env';

export default combineReducers({
  routing: routerReducer,
  nprogress,
  account,
  project,
  email,
  urlGroup,
  env
});
