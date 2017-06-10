import { watchSignUpSaga, watchCheckUsernameExistSaga, watchSignInSaga } from './account';
import { watchGetAllProjectSaga, watchAddProjectSaga, watchGetProjectByIdSaga, watchDelProjectSaga, watchProjectUpdateEnvSaga } from './project';
import { watchSendEmailCodeSaga } from './email';
import { watchSagas } from './urlGroup';

export default function* rootSaga() {
  yield [
    watchSignUpSaga(),
    watchCheckUsernameExistSaga(),
    watchSignInSaga(),
    watchGetAllProjectSaga(),
    watchAddProjectSaga(),
    watchGetProjectByIdSaga(),
    watchDelProjectSaga(),
    watchProjectUpdateEnvSaga(),
    watchSendEmailCodeSaga(),
    ...watchSagas
  ];
}
