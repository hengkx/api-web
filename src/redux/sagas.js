// import ReduxReqs from 'D:/GitHub/redux-reqs/lib';
import ReduxReqs from 'redux-reqs';
import { beginTask, endTask } from 'redux-nprogress';
import { watchSignUpSaga, watchCheckUsernameExistSaga, watchSignInSaga } from './account';
import { watchSagas as projectSagas } from './project';
import { watchSendEmailCodeSaga } from './email';
import { watchSagas } from './urlGroup';
import { watchSagas as envSagas } from './env';
// import ReduxReqs from 'redux-reqs';

ReduxReqs.defaults = {
  beforeAction: beginTask(),
  afterAction: endTask(),
};

export default function* rootSaga() {
  yield [
    watchSignUpSaga(),
    watchCheckUsernameExistSaga(),
    watchSignInSaga(),
    ...projectSagas,
    watchSendEmailCodeSaga(),
    ...watchSagas,
    ...envSagas
  ];
}
