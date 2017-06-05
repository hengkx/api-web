import { watchGetAllProjectSaga, watchAddProjectSaga, watchGetProjectByIdSaga } from './project';
import { watchRegistSaga } from './account';

export default function* rootSaga() {
  yield [
    watchGetAllProjectSaga(),
    watchAddProjectSaga(),
    watchGetProjectByIdSaga(),
    watchRegistSaga()
  ];
}
