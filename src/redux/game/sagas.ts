import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import { changeSquare, FETCH_GAME_RESULT, isXTurn, MakeMoveAction, MAKE_MOVE, setGameResult, fetchGameResult as fetchGameResultAction } from './actions';
import { getCurrentGameState } from './selectors';
import type { GameResult } from './actions';
import { fetchGameResult } from '../../services/api';


function* updateGameState() {
  const { squares } = yield select(getCurrentGameState);

  const [gameResult, error]: [GameResult | undefined, any | undefined] = yield call(fetchGameResult, squares);
  if (error || !gameResult) {
    console.log(error);
    return;
  }

  yield put(setGameResult(gameResult));
}

function* handleMove(action: MakeMoveAction) {
  const { index } = action.payload;
  yield put(changeSquare(index));
  yield put(isXTurn());
  yield put(fetchGameResultAction());
}

export function* rootGameSaga() {
  yield all([
    takeEvery(FETCH_GAME_RESULT, updateGameState),
    takeEvery(MAKE_MOVE, handleMove),
  ]);
}
