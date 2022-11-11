import type { StoreAction } from '../store';
import type { ChangeSquareAction, ControlGameResultAction } from './actions';
import { CHANGE_SQUARE, GO_BACK, IS_X_TURN, RESET_GAME, SET_GAME_RESULT } from './actions';

export type GameSquares = (number | string)[];

export interface GameState {
  squares: GameSquares;
  actions: GameSquares[];
  xTurn: boolean;
  isTie: boolean;
  winner: string | null;
};

export const INITIAL_GAME_STATE: GameState = {
  squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  actions: [[0, 1, 2, 3, 4, 5, 6, 7, 8]],
  xTurn: true,
  isTie: false,
  winner: null,
};

const changeSquare = (state: GameState, action: ChangeSquareAction): GameState => {
  if (typeof action.payload.index !== 'number') {
    return state;
  }
  const index = action.payload.index;
  const symbol = state.xTurn ? 'X' : 'O';

  const squares = [...state.squares];
  squares[index] = symbol;

  return {
    ...state,
    squares,
    actions: [...state.actions, state.squares],
  };
};

const isXTurn = (state: GameState): GameState => {
  return { ...state, xTurn: !state.xTurn };
};

const controlGameResult = (state: GameState, action: ControlGameResultAction): GameState => {
  const { winner, isTie } = action.payload;
  if (winner) {
    return { ...state, winner };
  }
  if (isTie) {
    return { ...state, isTie: true };
  }
  return state;
};

const goBack = (state: GameState): GameState => {
  return {
    ...state,
    actions: [...state.actions.slice(0, state.actions.length - 1)],
    squares: state.actions[state.actions.length - 1],
    xTurn: !state.xTurn,
  };
};

const reducer = (state: GameState = INITIAL_GAME_STATE, action: StoreAction) => {
  const { type } = action;

  switch (type) {
    case CHANGE_SQUARE:
      return changeSquare(state, action as ChangeSquareAction);
    case IS_X_TURN:
      return isXTurn(state);
    case SET_GAME_RESULT:
      return controlGameResult(state, action as ControlGameResultAction);
    case RESET_GAME:
      return INITIAL_GAME_STATE;
    case GO_BACK:
      return goBack(state);
    default:
      return state;
  }
};

export default reducer;
