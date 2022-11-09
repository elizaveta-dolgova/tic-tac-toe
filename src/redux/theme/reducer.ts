import type { StoreAction } from '../store';
import type { SetThemeAction } from './actions';
import { SET_THEME } from './actions';

export enum Theme {
  DARK,
  LIGHT,
}

export interface ThemeState {
  theme: Theme;
}

export const DEFAULT_STATE: ThemeState = {
  theme: Theme.DARK,
};

function setTheme(state: ThemeState, action: SetThemeAction): ThemeState {
  return {
    ...state,
    theme: action.payload.theme,
  };
}

const reducer = (state: ThemeState = DEFAULT_STATE, action: StoreAction) => {
  const { type } = action;

  switch (type) {
    case SET_THEME:
      return setTheme(state, action as SetThemeAction);
    default:
      return state;
  }
};

export default reducer;
