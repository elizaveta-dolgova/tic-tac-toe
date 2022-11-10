export const CHANGE_SQUARE = 'CHANGE_SQUARE';
export const IS_X_TURN = 'IS_X_TURN';
export const FETCH_GAME_RESULT = 'FETCH_GAME_RESULT';
export const SET_GAME_RESULT = 'SET_GAME_RESULT';
export const RESET_GAME = 'RESET_GAME';
export const GO_BACK = 'GO_BACK';

export const changeSquare = (index: number) => ({
  type: CHANGE_SQUARE,
  payload: {
    index,
  },
});

export type ChangeSquareAction = ReturnType<typeof changeSquare>;

export const isXTurn = () => ({
  type: IS_X_TURN,
});

export type IsXTurnAction = ReturnType<typeof isXTurn>;

export type GameResult = {
  winner: 'X' | 'O' | null;
  isTie: boolean;
};

export const setGameResult = (result: GameResult) => ({
  type: SET_GAME_RESULT,
  payload: {
    winner: result.winner,
    isTie: result.isTie,
  },
});

export type ControlGameResultAction = ReturnType<typeof setGameResult>;

export const fetchGameResult = () => ({
  type: FETCH_GAME_RESULT,
});

export type FetchGameResult = ReturnType<typeof fetchGameResult>;

export const resetGame = () => ({
  type: RESET_GAME,
});

export type ResetGameAction = ReturnType<typeof resetGame>;

export const goBack = () => ({
  type: GO_BACK,
});

export type GoBackAction = ReturnType<typeof goBack>;
