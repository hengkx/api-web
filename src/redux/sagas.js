import { watchSignUpSaga, watchCheckUsernameExistSaga, watchSignInSaga } from './account';
import { watchSagas as projectSagas } from './project';
import { watchSendEmailCodeSaga } from './email';
import { watchSagas } from './urlGroup';
import { watchSagas as envSagas } from './env';


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
