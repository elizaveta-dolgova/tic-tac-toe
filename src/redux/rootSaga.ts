import { all, fork } from 'redux-saga/effects';
import { rootThemeSaga } from './theme/sagas';

export function* rootSaga() {
  yield all([fork(rootThemeSaga)]);
}
