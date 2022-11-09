import type { RootState } from '../rootReducer';
import type { Theme } from './reducer';

export const getCurrentTheme = (state: RootState): Theme => {
  return state.theme.theme;
};
