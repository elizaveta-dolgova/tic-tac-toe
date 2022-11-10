import type { StoreAction } from '../store';
import type { ChangeSquareAction, ControlGameResultAction } from './actions';
import { CHANGE_SQUARE, GO_BACK, IS_X_TURN, RESET_GAME, SET_GAME_RESULT } from './actions';

export type GameState = {
  squares: (number | string)[];
  actions: (number | string)[][];
  xTurn: boolean;
  isTie: boolean;
  winner: string | null;
};

export const initialGameState: GameState = {
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
  return {
    ...state,
    squares: [...state.squares.slice(0, index), symbol, ...state.squares.slice(index + 1)],
    actions: [...state.actions, state.squares],
  };
};

const isXTurn = (state: GameState): GameState => {
  return { ...state, xTurn: !state.xTurn };
};

const controlGameResult = (state: GameState, action: ControlGameResultAction): GameState => {
  if (action.payload.winner) {
    return { ...state, winner: action.payload.winner };
  }
  if (action.payload.isTie) {
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

const reducer = (state: GameState = initialGameState, action: StoreAction) => {
  const { type } = action;

  switch (type) {
    case CHANGE_SQUARE:
      return changeSquare(state, action as ChangeSquareAction);
    case IS_X_TURN:
      return isXTurn(state);
    case SET_GAME_RESULT:
      return controlGameResult(state, action as ControlGameResultAction);
    case RESET_GAME:
      return initialGameState;
    case GO_BACK:
      return goBack(state);
    default:
      return state;
  }
};

export default reducer;
