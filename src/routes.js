import { withRouter } from 'react-router';
import Main from './components/Main';

export default [
  {
    path: '/',
    component: withRouter(Main),
    indexRoute: {
      onEnter: (nextState, replace) => replace('/project')
    },
    childRoutes: [
      {
        path: 'project',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, withRouter(require('./containers/Project')));
          }, 'project');
        }
      },
      {
        path: 'project/:id',
        getComponent: (nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, withRouter(require('./containers/ProjectDetail')));
          }, 'projectDetail');
        }
      }
    ]
  },
  {
    path: 'signin',
    getComponent: (nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, withRouter(require('./containers/SignIn')));
      }, 'signin');
    }
  },
  {
    path: 'signup',
    getComponent: (nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, withRouter(require('./containers/SignUp')));
      }, 'signup');
    }
  }
];
