import type { RootState } from '../rootReducer';
import type { GameState } from './reducer';

export const getCurrentGameState = (state: RootState): GameState => {
  return state.game;
};
