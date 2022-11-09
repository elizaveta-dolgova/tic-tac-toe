import type { Theme } from './reducer';

export const TOGGLE_THEME = '@theme/toggle-theme';
export const SET_THEME = '@theme/set-theme';

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

export type ToggleThemeAction = ReturnType<typeof toggleTheme>;

export const setTheme = (theme: Theme) => ({
  type: SET_THEME,
  payload: {
    theme,
  },
});

export type SetThemeAction = ReturnType<typeof setTheme>;
