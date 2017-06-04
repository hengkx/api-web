import { watchGetAllProjectSaga, watchAddProjectSaga, watchGetProjectByIdSaga } from './project';

export default function* rootSaga() {
  yield [
    watchGetAllProjectSaga(),
    watchAddProjectSaga(),
    watchGetProjectByIdSaga()
  ];
}
