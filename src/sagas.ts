import { call, put, select, takeEvery } from 'redux-saga/effects';

interface GameServiceResponse {
  isTie: boolean;
  winner: 'X' | 'O' | null;
}

function gameFetch(squares: (number | string)[]): Promise<GameServiceResponse> {
  return fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      gameState: squares,
    }),
  }).then((response) => response.json());
  // {isTie: false, winner: 'X'}
  // eslint-disable-next-line no-console
}

function* workGetGameFetch() {
  const { squares } = yield select();
  try {
    const gameResult: GameServiceResponse = yield call(gameFetch, squares);
    yield put({ type: 'setWinner', payload: gameResult });
  } catch {
    yield put({ type: 'getWinner' });
  }
}

function* mySaga() {
  yield takeEvery('fetchGameResult', workGetGameFetch);
}

export default mySaga;
