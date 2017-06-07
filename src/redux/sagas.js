import { watchSignUpSaga, watchCheckUsernameExistSaga, watchSignInSaga } from './account';
import { watchGetAllProjectSaga, watchAddProjectSaga, watchGetProjectByIdSaga } from './project';

export default function* rootSaga() {
  yield [
    watchSignUpSaga(),
    watchCheckUsernameExistSaga(),
    watchSignInSaga(),
    watchGetAllProjectSaga(),
    watchAddProjectSaga(),
    watchGetProjectByIdSaga()
  ];
}
