import { all, fork } from 'redux-saga/effects';
import { rootGameSaga } from './game/sagas';

export function* rootSaga() {
  yield all([fork(rootGameSaga)]);
}
