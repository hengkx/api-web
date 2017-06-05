import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { nprogress } from 'redux-nprogress';
import project from './project';
import account from './account';

export default combineReducers({
  routing: routerReducer,
  nprogress,
  project,
  account
});
