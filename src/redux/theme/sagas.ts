import { all, put, select, takeEvery } from 'redux-saga/effects';
import { setTheme, TOGGLE_THEME } from './actions';
import { Theme } from './reducer';
import { getCurrentTheme } from './selectors';

function* toggleTheme() {
  const theme: Theme = yield select(getCurrentTheme);

  switch (theme) {
    case Theme.DARK:
      yield put(setTheme(Theme.LIGHT));
      break;
    case Theme.LIGHT:
      yield put(setTheme(Theme.DARK));
      break;
    default:
      yield put(setTheme(Theme.DARK));
      break;
  }
}

export function* rootThemeSaga() {
  yield all([takeEvery(TOGGLE_THEME, toggleTheme)]);
}
