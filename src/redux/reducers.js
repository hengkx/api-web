import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { nprogress } from 'redux-nprogress';
import project from './project';

export default combineReducers({
  routing: routerReducer,
  nprogress,
  project
});
