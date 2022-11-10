import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_GAME_RESULT, setGameResult } from './actions';
import { getCurrentGameState } from './selectors';
import type { GameResult } from './actions';

const fetchGameResult = async (squares: (number | string)[]): Promise<GameResult> => {
  const response = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      gameState: squares,
    }),
  });
  const gameResult = await response.json();
  return gameResult;
};

function* updateGameState() {
  const { squares } = yield select(getCurrentGameState);
  const gameResult: GameResult = yield call(fetchGameResult, squares);
  yield put(setGameResult(gameResult));
}

export function* rootGameSaga() {
  yield all([takeEvery(FETCH_GAME_RESULT, updateGameState)]);
}
