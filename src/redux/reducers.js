import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { nprogress } from 'redux-nprogress';
import account from './account';
import project from './project';
import email from './email';

export default combineReducers({
  routing: routerReducer,
  nprogress,
  account,
  project,
  email
});
